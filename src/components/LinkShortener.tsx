import React, { useState } from "react";
import { Sparkles, Link as LinkIcon, RefreshCw, Layers, ChevronDown, Check, Copy, AlertTriangle } from "lucide-react";
import { useTranslation } from "../i18n";
import { getOrCreateCreatorId, addCreatedCode } from "../types";

interface LinkShortenerProps {
  onLinkCreated: () => void;
  setErrorMsg: (msg: string | null) => void;
  isDark?: boolean;
}

export default function LinkShortener({ onLinkCreated, setErrorMsg, isDark }: LinkShortenerProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
  
  // Single mode state
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  
  // Bulk mode state
  const [bulkUrls, setBulkUrls] = useState("");
  
  // Common states
  const [expiresIn, setExpiresIn] = useState("never");
  const [loading, setLoading] = useState(false);
  const [successLink, setSuccessLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  
  // Bulk outcomes
  const [bulkSuccesses, setBulkSuccesses] = useState<Array<{ original: string; short: string }> | null>(null);
  const [bulkFailures, setBulkFailures] = useState<Array<{ url: string; error: string }> | null>(null);

  const validateSlug = (slug: string) => {
    if (!slug) return true;
    return /^[a-zA-Z0-9-_]{3,30}$/.test(slug);
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessLink(null);
    setBulkSuccesses(null);
    setBulkFailures(null);

    const targetUrl = url.trim();
    if (!targetUrl) {
      setErrorMsg("Please provide a destination URL to shorten.");
      return;
    }

    if (customCode && !validateSlug(customCode)) {
      setErrorMsg("Custom slug must be 3-30 characters long and contains only alphanumeric (dashes/underscores allowed).");
      return;
    }

    setLoading(true);

    try {
      const creatorId = getOrCreateCreatorId();
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Creator-ID": creatorId
        },
        body: JSON.stringify({
          url: targetUrl,
          customCode: customCode ? customCode.trim() : undefined,
          expiresIn,
          creatorId,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Failed to shorten link.");
      }

      setUrl("");
      setCustomCode("");
      
      addCreatedCode(resData.link.short_code);
      const shortUrl = `${window.location.protocol}//${window.location.host}/${resData.link.short_code}`;
      setSuccessLink(shortUrl);
      onLinkCreated();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to make endpoint request.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessLink(null);
    setBulkSuccesses(null);
    setBulkFailures(null);

    const splitUrls = bulkUrls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (splitUrls.length === 0) {
      setErrorMsg("Please enter at least one URL path in the text area.");
      return;
    }

    if (splitUrls.length > 20) {
      setErrorMsg("Bulk shortening is capped at 20 links per batch execution to prevent server load abuse.");
      return;
    }

    setLoading(true);

    try {
      const creatorId = getOrCreateCreatorId();
      const response = await fetch("/api/shorten-bulk", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Creator-ID": creatorId
        },
        body: JSON.stringify({
          urls: splitUrls,
          expiresIn,
          creatorId,
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Failed to shorten batch.");
      }

      setBulkUrls("");
      
      (resData.links || []).forEach((l: any) => addCreatedCode(l.short_code));
      
      const successList = (resData.links || []).map((l: any) => ({
        original: l.original_url,
        short: `${window.location.protocol}//${window.location.host}/${l.short_code}`,
      }));

      setBulkSuccesses(successList);
      setBulkFailures(resData.failures || []);
      
      if (successList.length > 0) {
        onLinkCreated();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to execute batch request.");
    } finally {
      setLoading(false);
    }
  };

  const copyUrlToClipboard = (linkText: string) => {
    navigator.clipboard.writeText(linkText);
    setCopiedLink(linkText);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const copyAllBulkShortLinks = () => {
    if (!bulkSuccesses) return;
    const allLinksText = bulkSuccesses.map((item) => item.short).join("\n");
    navigator.clipboard.writeText(allLinksText);
    alert("Copied all generated short links to clipboard!");
  };

  return (
    <div className={`border p-6 rounded-2xl relative overflow-hidden backdrop-blur-md mb-8 transition-all duration-300 ${
      isDark 
        ? "bg-zinc-900/40 border-zinc-800/80 shadow-2xl" 
        : "bg-white border-slate-200 shadow-xl shadow-slate-100/60"
    }`}>
      {/* Decorative gradients */}
      {isDark && (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
        </>
      )}

      {/* Mode selectors */}
      <div className={`flex border-b pb-3 mb-6 gap-5 ${
        isDark ? "border-zinc-800" : "border-slate-100"
      }`}>
        <button
          onClick={() => {
            setActiveTab("single");
            setSuccessLink(null);
            setBulkSuccesses(null);
            setBulkFailures(null);
          }}
          className={`flex items-center gap-2 pb-2 text-xs font-mono font-bold uppercase tracking-wider transition border-b-2 -mb-3.5 ${
            activeTab === "single"
              ? isDark 
                ? "border-indigo-500 text-indigo-400 font-bold" 
                : "border-indigo-600 text-indigo-600 font-extrabold"
              : isDark
                ? "border-transparent text-zinc-400 hover:text-white"
                : "border-transparent text-slate-400 hover:text-slate-800"
          }`}
        >
          <LinkIcon className="h-4 w-4" /> {t("singleShortener")}
        </button>
        <button
          onClick={() => {
            setActiveTab("bulk");
            setSuccessLink(null);
            setBulkSuccesses(null);
            setBulkFailures(null);
          }}
          className={`flex items-center gap-2 pb-2 text-xs font-mono font-bold uppercase tracking-wider transition border-b-2 -mb-3.5 ${
            activeTab === "bulk"
              ? isDark 
                ? "border-indigo-500 text-indigo-400 font-bold"
                : "border-indigo-600 text-indigo-600 font-extrabold"
              : isDark
                ? "border-transparent text-zinc-400 hover:text-white"
                : "border-transparent text-slate-400 hover:text-slate-800"
          }`}
        >
          <Layers className="h-4 w-4" /> {t("bulkShortener")}
        </button>
      </div>

      {activeTab === "single" ? (
        <form onSubmit={handleSingleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-bold ${
              isDark ? "text-zinc-500" : "text-slate-500"
            }`} htmlFor="original-url">
              {t("originalUrl")}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ${
                isDark ? "text-zinc-600" : "text-slate-400"
              }`}>
                <LinkIcon className="h-4 w-4" />
              </div>
              <input
                id="original-url"
                type="text"
                required
                placeholder="https://example.com/very-long-path-name-to-shorten"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`block w-full pl-10 pr-4 py-3 border rounded-xl text-sm transition font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                  isDark 
                    ? "bg-zinc-950/80 border-zinc-800 text-white placeholder-zinc-500" 
                    : "bg-slate-50/80 border-slate-200 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Custom Code input */}
            <div className="md:col-span-1">
              <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-bold ${
                isDark ? "text-zinc-500" : "text-slate-500"
              }`} htmlFor="custom-slug">
                {t("customSlug")}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-mono select-none ${
                  isDark ? "text-zinc-600" : "text-slate-400"
                }`}>
                  /
                </div>
                <input
                  id="custom-slug"
                  type="text"
                  maxLength={30}
                  placeholder="portfolio-page"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className={`block w-full pl-7 pr-3 py-3 border rounded-xl text-sm transition font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    isDark 
                      ? "bg-zinc-950/80 border-zinc-800 text-white placeholder-zinc-500" 
                      : "bg-slate-50/80 border-slate-200 text-slate-900 placeholder-slate-450"
                  }`}
                />
              </div>
            </div>

            {/* Choose Expiration Dropdown */}
            <div className="md:col-span-1">
              <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-bold ${
                isDark ? "text-zinc-500" : "text-slate-500"
              }`} htmlFor="expiration-single">
                {t("linkExpiration")}
              </label>
              <div className="relative">
                <select
                  id="expiration-single"
                  value={expiresIn}
                  onChange={(e) => setExpiresIn(e.target.value)}
                  className={`block w-full pl-3.5 pr-10 py-3 border rounded-xl text-sm transition font-sans appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    isDark 
                      ? "bg-zinc-950/80 border-zinc-800 text-white" 
                      : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                >
                  <option value="never">{t("neverExpire")}</option>
                  <option value="5m">{t("mins5")}</option>
                  <option value="1h">{t("hour1")}</option>
                  <option value="1d">{t("day1")}</option>
                  <option value="7d">{t("days7")}</option>
                  <option value="30d">{t("days30")}</option>
                </select>
                <div className={`absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none ${
                  isDark ? "text-zinc-500" : "text-slate-400"
                }`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="md:col-span-1 flex flex-col justify-end">
              <button
                id="submit-shorten"
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 shadow-md ${
                  loading
                    ? isDark
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border-zinc-700"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white active:scale-[0.985] cursor-pointer shadow-indigo-500/10"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> {t("processingBtn")}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> {t("shortenBtn")}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleBulkSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-bold ${
              isDark ? "text-zinc-500" : "text-slate-500"
            }`} htmlFor="bulk-urls-input">
              {t("bulkUrlsLabel")}
            </label>
            <textarea
              id="bulk-urls-input"
              rows={4}
              required
              placeholder="https://github.com&#10;https://medium.com/blog-post&#10;https://dribbble.com/portfolio"
              value={bulkUrls}
              onChange={(e) => setBulkUrls(e.target.value)}
              className={`block w-full p-4 border rounded-xl text-sm transition font-mono leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                isDark 
                  ? "bg-zinc-950/80 border-zinc-800 text-white placeholder-zinc-500" 
                  : "bg-slate-50/80 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Choose Expiration Dropdown */}
            <div>
              <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-bold ${
                isDark ? "text-zinc-500" : "text-slate-500"
              }`} htmlFor="expiration-bulk">
                {t("bulkExpirationLabel")}
              </label>
              <div className="relative">
                <select
                  id="expiration-bulk"
                  value={expiresIn}
                  onChange={(e) => setExpiresIn(e.target.value)}
                  className={`block w-full pl-3.5 pr-10 py-3 border rounded-xl text-sm transition font-sans appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                    isDark 
                      ? "bg-zinc-950/80 border-zinc-800 text-white" 
                      : "bg-slate-50 border-slate-200 text-slate-850"
                  }`}
                >
                  <option value="never">{t("neverExpire")}</option>
                  <option value="5m">{t("mins5")}</option>
                  <option value="1h">{t("hour1")}</option>
                  <option value="1d">{t("day1")}</option>
                  <option value="7d">{t("days7")}</option>
                  <option value="30d">{t("days30")}</option>
                </select>
                <div className={`absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none ${
                  isDark ? "text-zinc-500" : "text-slate-400"
                }`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex flex-col justify-end">
              <button
                id="submit-bulk-shorten"
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 shadow-md ${
                  loading
                    ? isDark
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border-zinc-700"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white active:scale-[0.985] cursor-pointer shadow-indigo-500/10"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> {t("batchProcessingBtn")}
                  </>
                ) : (
                  <>
                    <Layers className="h-4 w-4" /> {t("shortenBatchBtn")}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Success generated link display block (Single Mode) */}
      {successLink && (
        <div className={`mt-6 p-5 border rounded-xl animate-fade-in transition-all ${
          isDark 
            ? "bg-indigo-500/10 border-indigo-500/20" 
            : "bg-indigo-500/5 border-indigo-200/50 shadow-sm"
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full">
              <span className={`text-xs font-mono font-bold block mb-1 ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}>{t("generatedShortLink")}</span>
              <a
                href={successLink}
                target="_blank"
                rel="noreferrer"
                className={`text-sm font-mono underline hover:underline break-all transition ${
                  isDark ? "text-white hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800 font-bold"
                }`}
              >
                {successLink}
              </a>
            </div>
            <button
              id="copy-clipboard"
              onClick={() => copyUrlToClipboard(successLink)}
              className="shrink-0 w-full sm:w-auto px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-xs font-bold rounded-lg text-white font-sans cursor-pointer shadow-sm"
            >
              {copiedLink === successLink ? t("copied") : t("copyUrl")}
            </button>
          </div>
        </div>
      )}

      {/* Bulk outcomes outputs */}
      {bulkSuccesses && bulkSuccesses.length > 0 && (
        <div className="mt-6 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className={`text-xs font-mono uppercase tracking-widest font-bold ${
              isDark ? "text-zinc-400" : "text-slate-600"
            }`}>
              {t("successShortened")} ({bulkSuccesses.length})
            </h4>
            <button
              onClick={copyAllBulkShortLinks}
              className={`text-xs hover:underline inline-flex items-center gap-1 border px-2.5 py-1 rounded-md transition ${
                isDark 
                  ? "bg-indigo-500/5 border-indigo-500/20 text-indigo-400 hover:text-indigo-300" 
                  : "bg-indigo-50/50 border-indigo-100 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
              }`}
            >
              {t("copyAllLinks")}
            </button>
          </div>

          <div className={`space-y-2 max-h-52 overflow-y-auto border p-3.5 rounded-xl ${
            isDark ? "bg-zinc-950/60 border-zinc-800/80" : "bg-slate-50 border-slate-200"
          }`}>
            {bulkSuccesses.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between text-xs font-mono p-2.5 border-b last:border-0 gap-3 ${
                  isDark ? "border-zinc-900" : "border-slate-200/60"
                }`}
              >
                <div className="truncate min-w-0 pr-2">
                  <span className={`block text-[10px] truncate mb-0.5 ${
                    isDark ? "text-zinc-500" : "text-slate-400 font-semibold"
                  }`}>Dest: {item.original}</span>
                  <a
                    href={item.short}
                    target="_blank"
                    rel="noreferrer"
                    className={`underline leading-relaxed ${
                      isDark ? "text-white hover:text-indigo-300" : "text-slate-800 hover:text-indigo-600 font-bold"
                    }`}
                  >
                    {item.short}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => copyUrlToClipboard(item.short)}
                  className={`p-1.5 rounded-lg border transition shrink-0 cursor-pointer ${
                    isDark 
                      ? "hover:bg-zinc-805 border-zinc-800 text-zinc-400 hover:text-white" 
                      : "hover:bg-white border-slate-200 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {copiedLink === item.short ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bulk failures list outputs */}
      {bulkFailures && bulkFailures.length > 0 && (
        <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-2 font-sans">
          <h4 className="text-xs font-mono text-rose-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> {t("failedUrls")} ({bulkFailures.length})
          </h4>
          <div className="text-xs text-rose-300 space-y-1">
            {bulkFailures.map((fail, idx) => (
              <div key={idx} className="flex justify-between border-b border-rose-500/5 pb-1 last:border-0">
                <span className="truncate max-w-[200px] text-zinc-400 font-mono">{fail.url || "(blank)"}</span>
                <span className="font-semibold text-rose-400">{fail.error}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
