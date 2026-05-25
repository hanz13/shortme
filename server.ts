import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dns from "dns";

// Types
interface ClickDetail {
  timestamp: string;
  userAgent: string;
  referrer: string;
}

interface ShortenedLink {
  id: string;
  original_url: string;
  short_code: string;
  created_at: string;
  clicks_count: number;
  clicks_history: ClickDetail[];
  expires_at?: string | null;
  creator_id?: string;
}

const PORT = 3000;
const app = express();

app.use(express.json());

// Simple In-Memory / File-Persisted DB Path
const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

// Ensure data folder exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// In-Memory cache of database
let database: { links: ShortenedLink[] } = { links: [] };

// Rate Limiter storage
const ipCache: { [ip: string]: { timestamp: number; count: number } } = {};
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 shortenings per minute per IP

// Load Database
function loadDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      database = JSON.parse(data);
      if (!Array.isArray(database.links)) {
        database.links = [];
      }
    } else {
      saveDb();
    }
  } catch (error) {
    console.error("Failed to load DB. Initializing empty:", error);
    database = { links: [] };
  }
}

// Atomic Save Database
function saveDb() {
  try {
    const data = JSON.stringify(database, null, 2);
    const tmpFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmpFile, data, "utf-8");
    fs.renameSync(tmpFile, DB_FILE);
  } catch (error) {
    console.error("Failed to save DB atomically:", error);
  }
}

// Initial DB load
loadDb();

// Rate limiter middleware
function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown-ip";
  const now = Date.now();

  const client = ipCache[ip];
  if (!client) {
    ipCache[ip] = { timestamp: now, count: 1 };
    return next();
  }

  if (now - client.timestamp > RATE_LIMIT_WINDOW_MS) {
    client.timestamp = now;
    client.count = 1;
    return next();
  }

  client.count++;
  if (client.count > MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({
      success: false,
      error: "Rate limit exceeded. Please wait a minute before shortening more URLs.",
    });
    return;
  }

  next();
}

// URL validation helper (XSS and sanity checker)
function isValidUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    // Only support HTTP and HTTPS protocol schemes
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }
    // Simple hostname sanity check to avoid recursive shortening
    const host = url.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "shortme.cyou" ||
      host.includes("ais-dev") ||
      host.includes("asia-east1.run.app")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Support configurable expiration intervals
function calculateExpiry(expiresIn?: string): string | null {
  if (!expiresIn || expiresIn === "never") return null;
  const now = Date.now();
  if (expiresIn === "5m") return new Date(now + 5 * 60 * 1000).toISOString();
  if (expiresIn === "1h") return new Date(now + 60 * 60 * 1000).toISOString();
  if (expiresIn === "1d") return new Date(now + 24 * 60 * 60 * 1000).toISOString();
  if (expiresIn === "7d") return new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString();
  if (expiresIn === "30d") return new Date(now + 30 * 24 * 60 * 60 * 1000).toISOString();
  return null;
}

// Express API Routes FIRST

// Get geoip info for user web translation indicator
app.get("/api/geoip", async (req, res) => {
  const ipHeader = req.headers["x-forwarded-for"] as string;
  const ip = ipHeader ? ipHeader.split(",")[0].trim() : (req.socket.remoteAddress || "127.0.0.1");
  const acceptLang = req.headers["accept-language"] || "";
  
  let langName = "English (US)";
  let countryCode = "US";
  
  // High-fidelity Accept-Language matching first (as a standard, fast fallback)
  if (acceptLang.toLowerCase().includes("id")) {
    langName = "Indonesian (ID)";
    countryCode = "ID";
  } else if (acceptLang.toLowerCase().includes("es")) {
    langName = "Spanish (ES)";
    countryCode = "ES";
  } else if (acceptLang.toLowerCase().includes("de")) {
    langName = "German (DE)";
    countryCode = "DE";
  } else if (acceptLang.toLowerCase().includes("fr")) {
    langName = "French (FR)";
    countryCode = "FR";
  } else if (acceptLang.toLowerCase().includes("ja") || acceptLang.toLowerCase().includes("jp")) {
    langName = "Japanese (JP)";
    countryCode = "JP";
  } else if (acceptLang.toLowerCase().includes("bg")) {
    langName = "Bulgarian (BG)";
    countryCode = "BG";
  } else if (acceptLang.toLowerCase().includes("bn")) {
    langName = "Bengali (BN)";
    countryCode = "BD";
  } else if (acceptLang.toLowerCase().includes("he") || acceptLang.toLowerCase().includes("il")) {
    langName = "Hebrew (HE)";
    countryCode = "IL";
  } else if (acceptLang.toLowerCase().includes("hi") || acceptLang.toLowerCase().includes("in")) {
    langName = "Hindi (HI)";
    countryCode = "IN";
  } else if (acceptLang.toLowerCase().includes("it")) {
    langName = "Italian (IT)";
    countryCode = "IT";
  }

  // If the visitor has a public IP (not a private range or local loopback), perform a real-time GeoIP look-up
  const isPrivateIp = 
    ip === "127.0.0.1" || 
    ip === "::1" || 
    ip === "localhost" || 
    ip.startsWith("192.168.") || 
    ip.startsWith("10.") || 
    ip.startsWith("172.");

  if (!isPrivateIp) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 seconds strict timeout limit to avoid slowdowns
      
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        if (geoData && geoData.status === "success" && geoData.countryCode) {
          countryCode = geoData.countryCode.toUpperCase();
          
          // Map country codes to primary language descriptors
          const countryToLangMap: Record<string, string> = {
            BG: "Bulgarian (BG)",
            BD: "Bengali (BN)",
            DE: "German (DE)",
            AT: "German (DE)",
            CH: "German (DE)",
            ES: "Spanish (ES)",
            MX: "Spanish (ES)",
            CO: "Spanish (ES)",
            AR: "Spanish (ES)",
            FR: "French (FR)",
            BE: "French (FR)",
            IL: "Hebrew (HE)",
            IN: "Hindi (HI)",
            ID: "Indonesian (ID)",
            MY: "Indonesian (ID)",
            SG: "Indonesian (ID)",
            IT: "Italian (IT)",
            JP: "Japanese (JP)",
            PT: "Portuguese (PT)",
            BR: "Portuguese (PT)",
            PL: "Polish (PL)",
            RU: "Russian (RU)",
            BY: "Russian (RU)",
            KZ: "Russian (RU)",
            VN: "Vietnamese (VI)",
            TR: "Turkish (TR)",
            KR: "Korean (KO)",
            TW: "Taiwan (ZH_TW)",
            HK: "Taiwan (ZH_TW)",
            MO: "Taiwan (ZH_TW)",
            AE: "Arabic (AR)",
            SA: "Arabic (AR)",
            EG: "Arabic (AR)",
            DZ: "Arabic (AR)",
            MA: "Arabic (AR)",
            IQ: "Arabic (AR)",
            JO: "Arabic (AR)",
            YE: "Arabic (AR)",
            SY: "Arabic (AR)",
            LB: "Arabic (AR)",
            OM: "Arabic (AR)",
            QA: "Arabic (AR)",
            KW: "Arabic (AR)",
            BH: "Arabic (AR)",
          };
          
          if (countryToLangMap[countryCode]) {
            langName = countryToLangMap[countryCode];
          }
        }
      }
    } catch (e) {
      console.warn(`Real-time GeoIP remote look-up for IP ${ip} timed out or failed. Falling back.`, e);
    }
  }
  
  res.json({
    success: true,
    ip: ip === "::1" ? "127.0.0.1" : ip,
    language: langName,
    country: countryCode,
    translatedTo: "English (US)"
  });
});

// Get links history list
app.get("/api/links", (req, res) => {
  res.json({
    success: true,
    links: database.links,
  });
});

// Create a short URL
app.post("/api/shorten", rateLimiter, (req, res) => {
  let { url, customCode, expiresIn } = req.body;
  const creatorId = req.headers["x-creator-id"] || req.body.creatorId;

  if (!url) {
    res.status(400).json({ success: false, error: "original_url is required" });
    return;
  }

  // Ensure trailing whitespace is trimmed
  url = url.trim();

  // If URL doesn't have a protocol, prepend https://
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  // Sanitize and Validate Url
  if (!isValidUrl(url)) {
    res.status(400).json({
      success: false,
      error: "Invalid or unsupported URL. Make sure it uses http/https and is not a loopback address.",
    });
    return;
  }

  // If custom code, clean it and validate
  let code = "";
  if (customCode && typeof customCode === "string") {
    code = customCode.trim().toLowerCase();
    
    // Strict alphanumeric/dash slug validation (protects against Directory Traversal and API router overlaps)
    if (!/^[a-z0-9-_]{3,30}$/.test(code)) {
      res.status(400).json({
        success: false,
        error: "Custom slug must be 3-30 characters and alphanumeric (dashes/underscores allowed).",
      });
      return;
    }

    // Reserved keyword check to avoid overriding important system routes
    const reserved = ["api", "assets", "static", "data", "dist", "favicon.ico", "components"];
    if (reserved.includes(code)) {
      res.status(400).json({
        success: false,
        error: "This custom slug is a reserved system path. Please choose another.",
      });
      return;
    }

    // Uniqueness constraint validation
    const exists = database.links.find((l) => l.short_code === code);
    if (exists) {
      res.status(400).json({
        success: false,
        error: "This custom slug is already taken. Please choose another.",
      });
      return;
    }
  } else {
    // Generate an original unique 6-character short code
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let attempts = 0;
    while (attempts < 100) {
      code = "";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const duplicate = database.links.find((l) => l.short_code === code);
      if (!duplicate) {
        break;
      }
      attempts++;
    }
  }

  const newLink: ShortenedLink = {
    id: "link_" + Math.random().toString(36).substring(2, 11),
    original_url: url,
    short_code: code,
    created_at: new Date().toISOString(),
    clicks_count: 0,
    clicks_history: [],
    expires_at: calculateExpiry(expiresIn),
    creator_id: typeof creatorId === "string" ? creatorId : undefined,
  };

  database.links.unshift(newLink); // Put it at the top of list
  saveDb();

  res.json({
    success: true,
    link: newLink,
  });
});

// Create bulk short URLs
app.post("/api/shorten-bulk", rateLimiter, (req, res) => {
  let { urls, expiresIn } = req.body;
  const creatorId = req.headers["x-creator-id"] || req.body.creatorId;

  if (!urls || !Array.isArray(urls)) {
    res.status(400).json({ success: false, error: "An array of urls is required." });
    return;
  }

  const expires_at_val = calculateExpiry(expiresIn);
  const createdLinks: ShortenedLink[] = [];
  const failures: { url: string; error: string }[] = [];

  for (let rawUrl of urls) {
    if (typeof rawUrl !== "string") {
      failures.push({ url: String(rawUrl), error: "URL path must be a string." });
      continue;
    }

    let url = rawUrl.trim();
    if (!url) {
      failures.push({ url: "", error: "Empty URL entered." });
      continue;
    }

    // Prepend http/https if missing
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    // Sanitize and Validate Url
    if (!isValidUrl(url)) {
      failures.push({
        url,
        error: "Invalid URL. Scheme must be http/https and cannot loop back.",
      });
      continue;
    }

    // Generate unique code
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    let attempts = 0;
    let isUnique = false;

    while (attempts < 100) {
      code = "";
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const duplicate = database.links.find((l) => l.short_code === code) || 
                        createdLinks.find((l) => l.short_code === code);
      if (!duplicate) {
        isUnique = true;
        break;
      }
      attempts++;
    }

    if (!isUnique) {
      failures.push({ url, error: "Failed to generate unique code." });
      continue;
    }

    const newLink: ShortenedLink = {
      id: "link_" + Math.random().toString(36).substring(2, 11),
      original_url: url,
      short_code: code,
      created_at: new Date().toISOString(),
      clicks_count: 0,
      clicks_history: [],
      expires_at: expires_at_val,
      creator_id: typeof creatorId === "string" ? creatorId : undefined,
    };

    createdLinks.push(newLink);
  }

  if (createdLinks.length > 0) {
    database.links.unshift(...createdLinks);
    saveDb();
  }

  res.json({
    success: true,
    links: createdLinks,
    failures,
  });
});

// Delete a link
app.delete("/api/links/:code", (req, res) => {
  const code = req.params.code;
  const link = database.links.find((l) => l.short_code === code);
  
  if (!link) {
    res.status(404).json({ success: false, error: "Short code not found" });
    return;
  }

  const incomingCreatorId = req.headers["x-creator-id"] || req.query.creatorId;
  
  // Strict authorization filter: If link has a creator_id, the deletion request must match it.
  if (link.creator_id && link.creator_id !== incomingCreatorId) {
    res.status(403).json({ success: false, error: "Unauthorized: You do not have permission to delete this link." });
    return;
  }

  database.links = database.links.filter((l) => l.short_code !== code);
  saveDb();
  res.json({ success: true, message: "Link deleted successfully" });
});

// Dynamic Redirect route
app.get("/r/:code", (req, res) => {
  const code = req.params.code.toLowerCase();
  const link = database.links.find((l) => l.short_code === code);

  if (!link) {
    // Return custom clean 404 page for missing shortlink
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Link Not Found - Shortme</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-zinc-950 text-white min-h-screen flex items-center justify-center p-6 font-sans">
          <div class="max-w-md text-center">
            <h1 class="text-6xl font-black text-rose-500 tracking-tight select-none">404</h1>
            <h2 class="text-2xl font-semibold mt-4 text-zinc-100">Short Link Not Found</h2>
            <p class="text-zinc-400 mt-2 text-sm leading-relaxed">
              The link you tried to access may have expired, deleted, or does not exist under the Shortme namespace.
            </p>
            <a href="/" class="inline-flex items-center justify-center gap-2 mt-8 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium rounded-lg text-zinc-100">
              Return to Shortme
            </a>
          </div>
        </body>
      </html>
    `);
    return;
  }

  // Expiration validation check
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    res.status(410).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Link Expired - Shortme</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-zinc-950 text-white min-h-screen flex items-center justify-center p-6 font-sans">
          <div class="max-w-md text-center">
            <h1 class="text-6xl font-black text-amber-500 tracking-tight select-none">410</h1>
            <h2 class="text-2xl font-semibold mt-4 text-zinc-100">Short Link Expired</h2>
            <p class="text-zinc-400 mt-2 text-sm leading-relaxed">
              This short link was configured with a specific expiration threshold by the publisher and has already expired.
            </p>
            <a href="/" class="inline-flex items-center justify-center gap-2 mt-8 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium rounded-lg text-zinc-100">
              Return to Shortme
            </a>
          </div>
        </body>
      </html>
    `);
    return;
  }

  // Track Analytics safely
  const userAgent = req.headers["user-agent"] || "unknown-agent";
  const referrer = req.headers["referer"] || req.headers["referrer"] || "direct";
  const clickRecord: ClickDetail = {
    timestamp: new Date().toISOString(),
    userAgent: typeof userAgent === "string" ? userAgent : "unknown",
    referrer: typeof referrer === "string" ? referrer : "direct",
  };

  link.clicks_count++;
  link.clicks_history.unshift(clickRecord);

  // Keep clicks history bounded to last 100 entries to optimize db file size limit
  if (link.clicks_history.length > 100) {
    link.clicks_history = link.clicks_history.slice(0, 100);
  }

  saveDb();

  // Instant redirect to target original URL
  res.redirect(307, link.original_url);
});

// Redirect from absolute root levels (e.g. standard shortme.cyou/code triggers the redirect)
// If it's not a static folder / asset / file, check if it's a shortlink
app.get("/:code", (req, res, next) => {
  const code = req.params.code;
  
  // Skip if it looks like API / resources or has an extension
  if (
    code.includes(".") || 
    code === "api" || 
    code === "vite" || 
    code === "src" || 
    code === "node_modules"
  ) {
    return next();
  }

  // Redirect to localized redirect page /r/:code to avoid layout disruption during vite SPA queries
  res.redirect(307, `/r/${code}`);
});

// Configure Vite or Static File Delivery
async function initProductionOrDev() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

initProductionOrDev();
