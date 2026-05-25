import { ShortenedLink } from "../types";
import { Link, MousePointerClick, BarChart3, TrendingUp } from "lucide-react";
import { useTranslation } from "../i18n";

interface StatsGridProps {
  links: any[];
  isDark?: boolean;
}

export default function StatsGrid({ links, isDark }: StatsGridProps) {
  const { t } = useTranslation();
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + link.clicks_count, 0);
  const mostActive = links.length > 0 
    ? [...links].sort((a,b) => b.clicks_count - a.clicks_count)[0] 
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {/* Total Links Card */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
        isDark 
          ? "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700/60 shadow-lg" 
          : "bg-white border-zinc-200/80 hover:border-indigo-200 shadow-sm shadow-zinc-100/50 hover:shadow-md"
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${
              isDark ? "text-zinc-500" : "text-zinc-400 font-semibold"
            }`}>{t("urlsShortened")}</span>
            <h3 className={`text-4.5xl font-extrabold mt-1 tracking-tight font-sans ${
              isDark ? "text-white" : "text-zinc-900"
            }`}>{totalLinks}</h3>
          </div>
          <div className={`p-3 rounded-xl border transition-all duration-300 group-hover:scale-105 ${
            isDark 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-emerald-500/10 border-emerald-400/20 text-emerald-600"
          }`}>
            <Link className="h-5 w-5" />
          </div>
        </div>
        <p className={`text-xs mt-4 flex items-center gap-2 ${
          isDark ? "text-zinc-400" : "text-zinc-600 font-medium"
        }`}>
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500 animate-pulse" /> {t("activeRedirects")}
        </p>
      </div>

      {/* Total Clicks Card */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
        isDark 
          ? "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700/60 shadow-lg" 
          : "bg-white border-zinc-200/80 hover:border-indigo-200 shadow-sm shadow-zinc-100/50 hover:shadow-md"
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${
              isDark ? "text-zinc-500" : "text-zinc-400 font-semibold"
            }`}>{t("totalEngagements")}</span>
            <h3 className={`text-4.5xl font-extrabold mt-1 tracking-tight font-sans ${
              isDark ? "text-white" : "text-zinc-900"
            }`}>{totalClicks}</h3>
          </div>
          <div className={`p-3 rounded-xl border transition-all duration-300 group-hover:scale-105 ${
            isDark 
              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" 
              : "bg-cyan-500/10 border-cyan-400/20 text-cyan-600"
          }`}>
            <MousePointerClick className="h-5 w-5" />
          </div>
        </div>
        <p className={`text-xs mt-4 ${
          isDark ? "text-zinc-400" : "text-zinc-600 font-medium"
        }`}>
          {t("avgCtr")} <span className={`font-semibold ${isDark ? "text-zinc-200" : "text-zinc-900"}`}>{totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : "0.0"}</span> {t("clicksPerLink")}
        </p>
      </div>

      {/* Most Active Card */}
      <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
        isDark 
          ? "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700/60 shadow-lg" 
          : "bg-white border-zinc-200/80 hover:border-indigo-200 shadow-sm shadow-zinc-100/50 hover:shadow-md"
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <span className={`text-[10px] font-mono uppercase tracking-widest ${
              isDark ? "text-zinc-500" : "text-zinc-400 font-semibold"
            }`}>{t("topPerformingSlug")}</span>
            <h3 className={`text-lg font-bold mt-2.5 truncate max-w-[185px] font-mono ${
              isDark ? "text-white" : "text-indigo-600"
            }`}>
              {mostActive ? `/${mostActive.short_code}` : t("na")}
            </h3>
          </div>
          <div className={`p-3 rounded-xl border transition-all duration-300 group-hover:scale-105 ${
            isDark 
              ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" 
              : "bg-indigo-500/10 border-indigo-400/20 text-indigo-600"
          }`}>
            <BarChart3 className="h-5 w-5" />
          </div>
        </div>
        <p className={`text-xs mt-4 truncate ${
          isDark ? "text-zinc-400" : "text-zinc-600 font-medium"
        }`}>
          {mostActive 
            ? `${t("leadsWith")} ${mostActive.clicks_count} ${t("clicks")}` 
            : t("shortenToTrack")
          }
        </p>
      </div>
    </div>
  );
}
