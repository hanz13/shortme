export interface ClickDetail {
  timestamp: string;
  userAgent: string;
  referrer: string;
}

export interface ShortenedLink {
  id: string;
  original_url: string;
  short_code: string;
  created_at: string;
  clicks_count: number;
  clicks_history: ClickDetail[];
  expires_at?: string | null;
  creator_id?: string;
}

export interface ShortenRequest {
  url: string;
  customCode?: string;
}

export interface ShortenResponse {
  success: boolean;
  link?: ShortenedLink;
  error?: string;
}

export interface SystemStats {
  totalLinks: number;
  totalClicks: number;
  recentClicks: number;
}

export function getOrCreateCreatorId(): string {
  if (typeof window === "undefined" || !window.localStorage) {
    return "server_mock";
  }
  let creatorId = localStorage.getItem("shortme_creator_id");
  if (!creatorId) {
    creatorId = "creator_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
    localStorage.setItem("shortme_creator_id", creatorId);
  }
  return creatorId;
}

export function addCreatedCode(code: string) {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    const codes = JSON.parse(localStorage.getItem("shortme_my_codes") || "[]");
    if (!codes.includes(code)) {
      codes.push(code);
      localStorage.setItem("shortme_my_codes", JSON.stringify(codes));
    }
  } catch (e) {
    console.error(e);
  }
}

export function isMyCreatedCode(code: string): boolean {
  if (typeof window === "undefined" || !window.localStorage) return false;
  try {
    const codes = JSON.parse(localStorage.getItem("shortme_my_codes") || "[]");
    return codes.includes(code);
  } catch {
    return false;
  }
}
