import { useState } from "react";
import { ShortenedLink, getOrCreateCreatorId, isMyCreatedCode } from "../types";
import { ExternalLink, Trash2, Copy, Calendar, ChevronDown, ChevronUp, Globe, Monitor, MousePointerClick, ShieldAlert, QrCode, Download, X, Check } from "lucide-react";
import QRCode from "qrcode";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "../i18n";

interface LinkCardProps {
  key?: string;
  link: ShortenedLink;
  onDeleted: () => void;
  isDark?: boolean;
}

export default function LinkCard({ link, onDeleted, isDark }: LinkCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [showQr, setShowQr] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const currentCreatorId = getOrCreateCreatorId();
  const canDelete = !link.creator_id || link.creator_id === currentCreatorId || isMyCreatedCode(link.short_code);

  const fullShortUrl = `${window.location.protocol}//${window.location.host}/${link.short_code}`;

  const generateQr = async () => {
    try {
      const url = await QRCode.toDataURL(fullShortUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: "#0F172A", // clean deep slate for high-contrast scan safety
          light: "#FFFFFF",
        },
      });
      setQrUrl(url);
      setShowQr(true);
    } catch (err) {
      console.error("QR Code generation error:", err);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(fullShortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteLink = async () => {
    setDeleting(true);
    try {
      const creatorId = getOrCreateCreatorId();
      const response = await fetch(`/api/links/${link.short_code}?creatorId=${creatorId}`, {
        method: "DELETE",
        headers: {
          "X-Creator-ID": creatorId
        }
      });
      if (response.ok) {
        onDeleted();
      } else {
        const resData = await response.json().catch(() => ({}));
        alert(resData.error || t("deleteFailed"));
      }
    } catch (e) {
      console.error(e);
      alert(t("deleteError"));
    } finally {
      setDeleting(false);
    }
  };

  // Helper to format date
  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  // Parse browser/system from agent string
  const getAgentSummary = (ua: string) => {
    if (!ua) return "Unknown";
    const lower = ua.toLowerCase();
    if (lower.includes("firefox")) return "Firefox";
    if (lower.includes("opr") || lower.includes("opera")) return "Opera";
    if (lower.includes("edg")) return "Edge";
    if (lower.includes("chrome")) return "Chrome";
    if (lower.includes("safari")) return "Safari";
    if (lower.includes("mobile") || lower.includes("android")) return "Mobile Device";
    return "Desktop / Web agent";
  };

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
      isDark 
        ? "bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700/80 shadow-lg" 
        : "bg-white border-slate-200/80 shadow-sm shadow-zinc-100/50 hover:border-indigo-200/80 hover:shadow-md"
    }`}>
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* URL Information */}
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-mono text-xs px-2.5 py-0.5 rounded-md font-bold ${
              isDark 
                ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20" 
                : "text-indigo-600 bg-indigo-50/60 border border-indigo-100/50"
            }`}>
              /{link.short_code}
            </span>
            <span className={`text-xs flex items-center gap-1.5 ${
              isDark ? "text-zinc-500" : "text-slate-400 font-medium"
            }`}>
              <Calendar className="h-3.5 w-3.5 opacity-70" /> {formatDate(link.created_at)}
            </span>
            {link.expires_at && (
              (() => {
                const isExpired = new Date(link.expires_at) < new Date();
                return (
                  <span className={`text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded-md flex items-center ${
                    isExpired 
                      ? "bg-rose-500/10 text-rose-500 border border-rose-500/15" 
                      : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                  }`}>
                    {isExpired ? t("expired") : `${t("expires")}: ${formatDate(link.expires_at)}`}
                  </span>
                );
              })()
            )}
          </div>

          <div className="text-sm font-bold font-mono break-all transition block">
            <a 
              href={fullShortUrl} 
              target="_blank" 
              rel="noreferrer" 
              className={`flex items-center gap-1.5 group font-bold ${
                isDark ? "text-white hover:text-indigo-300" : "text-slate-800 hover:text-indigo-600"
              }`}
            >
              {fullShortUrl} <ExternalLink className={`h-3.5 w-3.5 transition-colors ${
                isDark ? "text-zinc-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-600"
              }`} />
            </a>
          </div>

          <div className={`text-xs truncate max-w-full font-sans ${
            isDark ? "text-zinc-400" : "text-slate-500"
          }`}>
            {t("original")}: <span className={`font-mono break-all ${
              isDark ? "text-zinc-500" : "text-slate-400 font-medium"
            }`}>{link.original_url}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className={`flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 ${
          isDark ? "border-zinc-800" : "border-slate-100"
        }`}>
          {/* Clicks Badge */}
          <div className="text-right sm:mr-4">
            <div className={`text-[10px] font-mono tracking-wider font-bold leading-none ${
              isDark ? "text-zinc-500" : "text-slate-400"
            }`}>{t("clicks").toUpperCase()}</div>
            <div className={`text-xl font-extrabold mt-1.5 leading-none ${
              isDark ? "text-white" : "text-slate-900"
            }`}>{link.clicks_count}</div>
          </div>

          <div className="flex items-center gap-1.5 animate-fade-in">
            <button
              onClick={copyLink}
              title="Copy Short URL"
              className={`p-2.5 rounded-xl border transition shadow-xs cursor-pointer h-10 w-10 flex items-center justify-center shrink-0 ${
                copied
                  ? isDark
                    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    : "text-emerald-600 border-emerald-200 bg-emerald-50"
                  : isDark 
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800 bg-zinc-950/20" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-slate-200 bg-white"
              }`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>

            <button
              onClick={generateQr}
              title="View & Download QR Code"
              className={`p-2.5 rounded-xl border transition shadow-xs cursor-pointer ${
                isDark 
                  ? "text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800 bg-zinc-950/20" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border-slate-200 bg-white"
              }`}
            >
              <QrCode className="h-4 w-4" />
            </button>

            {canDelete ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={deleting}
                title="Delete redirect link"
                className={`p-2.5 rounded-xl border transition shadow-xs cursor-pointer ${
                  isDark 
                    ? "text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 border-zinc-800 bg-zinc-950/20 hover:border-rose-500/20" 
                    : "text-slate-400 hover:text-rose-600 hover:bg-rose-50 border-slate-200 bg-white hover:border-rose-200"
                }`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : (
              <button
                disabled
                title={t("ownerOnlyInfo")}
                className={`p-2.5 rounded-xl border transition shadow-xs cursor-not-allowed opacity-40 ${
                  isDark 
                    ? "text-zinc-600 border-zinc-800 bg-zinc-950/20" 
                    : "text-slate-300 border-slate-150 bg-slate-50"
                }`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}

            <button
              onClick={() => setExpanded(!expanded)}
              title="View Click Analytics"
              className={`p-2.5 rounded-xl border transition shadow-xs cursor-pointer ${
                expanded 
                  ? isDark 
                    ? "text-indigo-450 bg-indigo-500/5 border-indigo-500/25" 
                    : "text-indigo-600 bg-indigo-50/50 border-indigo-200"
                  : isDark
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800 bg-zinc-950/20"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-55 border-slate-200 bg-white"
              }`}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Click Events Analytics Panel */}
      {expanded && (
        <div className={`border-t p-4 sm:p-5 font-sans ${
          isDark ? "bg-zinc-950/40 border-zinc-800" : "bg-slate-50/70 border-slate-150"
        }`}>
          <h4 className={`text-xs font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b pb-2 font-bold ${
            isDark ? "text-zinc-400 border-zinc-800/60" : "text-slate-500 border-slate-200/50"
          }`}>
            <MousePointerClick className="h-3.5 w-3.5 text-indigo-500" /> {t("clickStreamRecord")}
          </h4>

          {link.clicks_history.length === 0 ? (
            <p className={`text-xs text-center py-6 italic ${
              isDark ? "text-zinc-500" : "text-slate-400 font-medium"
            }`}>
              {t("noClickHistory")}
            </p>
          ) : (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {link.clicks_history.slice(0, 10).map((click, cIdx) => (
                <div
                  key={cIdx}
                  className={`p-3 rounded-lg border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${
                    isDark 
                      ? "bg-zinc-900/40 border-zinc-800 text-zinc-300" 
                      : "bg-white border-slate-200/60 text-slate-800 shadow-xs"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <span className={`font-semibold flex items-center gap-1.5 ${
                         isDark ? "text-zinc-350" : "text-slate-700 font-bold"
                       }`}>
                        <Monitor className="h-3 w-3 opacity-60" /> {getAgentSummary(click.userAgent)}
                      </span>
                      <span className={`font-mono text-[10px] truncate max-w-[200px] ${
                        isDark ? "text-zinc-600" : "text-slate-400"
                       }`} title={click.userAgent}>
                        {click.userAgent.slice(0, 35)}...
                      </span>
                    </div>
                    <div className="text-[10px] flex items-center gap-1.5">
                      <Globe className="h-3 w-3 opacity-60" /> {t("referrer")}: <span className={`font-mono ${
                        isDark ? "text-zinc-400" : "text-slate-500 font-semibold"
                      }`}>{click.referrer || t("direct")}</span>
                    </div>
                  </div>
                  <div className={`text-[10px] font-mono shrink-0 self-end sm:self-center ${
                    isDark ? "text-zinc-500" : "text-slate-400 font-semibold"
                  }`}>
                    {formatDate(click.timestamp)}
                  </div>
                </div>
              ))}
              {link.clicks_history.length > 10 && (
                <div className="text-center pt-1.5 text-[10px] font-mono text-zinc-500">
                  + {link.clicks_history.length - 10} additional tracking logs saved in DB
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* QR Code Modal Dialog */}
      <AnimatePresence>
        {showQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQr(false)}
              className="absolute inset-0 bg-zinc-950/85 backdrop-blur-xs"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative w-full max-w-sm rounded-[24px] p-6 border shadow-2xl z-10 text-center ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                  : "bg-white border-slate-200 text-zinc-950"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowQr(false)}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors cursor-pointer ${
                  isDark ? "hover:bg-zinc-800 text-zinc-400 hover:text-white" : "hover:bg-slate-100 text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center mt-3">
                <div className="p-2.5 w-fit rounded-xl bg-indigo-500/10 mb-3 text-indigo-500">
                  <QrCode className="h-6 w-6" />
                </div>
                <h3 className="text-base font-extrabold">{t("qrTitle")}</h3>
                <p className="text-[10px] font-mono text-indigo-500 mt-1.5 leading-none break-all max-w-[280px]">{fullShortUrl}</p>
                
                {/* QR Display frame inside a high-contrast white rounded wrapper to guarantee code scannability regardless of dark/light theme! */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mt-5">
                  {qrUrl ? (
                    <img 
                      src={qrUrl} 
                      alt={`QR Code for ${link.short_code}`} 
                      className="h-44 w-44 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-44 w-44 flex items-center justify-center text-xs text-slate-500 font-medium font-mono">
                      {t("loadingQr")}
                    </div>
                  )}
                </div>

                <p className={`text-[10px] max-w-xs mt-4 leading-normal ${
                  isDark ? "text-zinc-500" : "text-slate-400 font-medium"
                }`}>
                  {t("qrScannerTips")}
                </p>

                {/* Download Actions */}
                <div className="flex items-center gap-3 w-full mt-6">
                  <button
                    onClick={() => setShowQr(false)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition border cursor-pointer ${
                      isDark
                        ? "bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border-zinc-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                    }`}
                  >
                    {t("cancel")}
                  </button>
                  <a
                    href={qrUrl}
                    download={`qrcode-${link.short_code}.png`}
                    className="flex-1 select-none flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md shadow-indigo-600/15 cursor-pointer no-underline"
                  >
                    <Download className="h-3.5 w-3.5" /> {t("downloadPng")}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal Dialog */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute inset-0 bg-zinc-950/85 backdrop-blur-xs"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative w-full max-w-sm rounded-[24px] p-6 border shadow-2xl z-10 text-center ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                  : "bg-white border-slate-200 text-zinc-950"
              }`}
            >
              <div className="flex flex-col items-center mt-3">
                <div className="p-3 w-fit rounded-full bg-rose-500/10 mb-4 text-rose-500 animate-pulse">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="text-base font-extrabold">{t("deleteConfirmTitle")}</h3>
                <p className={`text-xs mt-3 leading-relaxed max-w-[280px] ${
                  isDark ? "text-zinc-400" : "text-slate-500"
                }`}>
                  {t("deleteConfirmMessage")}
                </p>
                <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-rose-500 mt-2">
                  /{link.short_code}
                </p>

                {/* Confirm / Cancel Actions */}
                <div className="flex items-center gap-3 w-full mt-6">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition border cursor-pointer ${
                    isDark
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                    }`}
                  >
                    {t("cancel")}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      deleteLink();
                    }}
                    className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition shadow-md shadow-rose-600/15 cursor-pointer animate-fade-in"
                  >
                    {t("deleteBtn")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
