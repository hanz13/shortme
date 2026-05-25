import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, AlertCircle, ShieldCheck, RefreshCw, BarChart2, Star, Github, Sun, Moon, X, FileText, Scale, Landmark, Globe, ChevronDown, Check } from "lucide-react";
import { ShortenedLink } from "./types";
import StatsGrid from "./components/StatsGrid";
import LinkShortener from "./components/LinkShortener";
import LinkCard from "./components/LinkCard";
import FaqSection from "./components/FaqSection";
import { useTranslation, SUPPORTED_LANGUAGES, LanguageCode } from "./i18n";
import { MODAL_TRANSLATIONS } from "./locales/modals";

export default function App() {
  const { language, setLanguage, t } = useTranslation();
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Custom dropdown open state and ref
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Dynamic geolocation state
  const [geoData, setGeoData] = useState<{ ip: string; language: string; country: string } | null>(null);

  // Dynamic state for Footer Modals
  const [activeModal, setActiveModal] = useState<"terms" | "privacy" | "about" | null>(null);

  // Exquisite local-state Dark Mode Toggle with default device detection
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    // Check user preference at the device/system level
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true; // Default fallback to dark mode
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Listen to changes in system/device dark mode settings
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if the user has not explicitly configured a selection before
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
      }
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Fetch created links list
  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/links");
      if (!response.ok) {
        throw new Error("Unable to fetch link history.");
      }
      const data = await response.json();
      if (data.success) {
        setLinks(data.links || []);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to communicate with local tracking server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
    
    // Dynamic IP geo-translation detector
    const fetchGeo = async () => {
      try {
        const response = await fetch("/api/geoip");
        if (response.ok) {
          const data = await response.json();
          if (data && data.success) {
            setGeoData({ ip: data.ip, language: data.language, country: data.country });
          }
        }
      } catch (err) {
        console.warn("GeoIP backend lookup inactive/offline", err);
      }
    };
    fetchGeo();
  }, []);

  // Close lang dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync theme status on the body component as well for seamless frame background styling
  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#09090b";
      document.documentElement.classList.add("dark");
    } else {
      document.body.style.backgroundColor = "#f8fafc";
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16 antialiased transition duration-200 ${
      isDark ? "bg-zinc-950 text-zinc-100" : "bg-zinc-50 text-zinc-900"
    }`}>
      {/* Decorative Blur Ambient Elements */}
      {isDark ? (
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-zinc-950 to-zinc-950 -z-30 pointer-events-none" />
      ) : (
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-100/30 via-zinc-50 to-zinc-50 -z-30 pointer-events-none" />
      )}

      {/* Primary Header/Nav */}
      <header className={`border-b sticky top-0 z-40 backdrop-blur-md transition ${
        isDark ? "border-zinc-900 bg-zinc-950/80" : "border-zinc-200 bg-white/80"
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a 
            href="/" 
            className="flex items-center gap-2.5 hover:opacity-90 active:scale-98 transition group cursor-pointer"
            onClick={(e) => {
              // Simply let it act naturally or reset errors
              setErrorMsg(null);
            }}
          >
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/15 group-hover:bg-indigo-505 transition">
              <Link className="h-5 w-5" />
            </div>
            <div>
              <span className={`font-sans font-extrabold text-sm tracking-tight block ${isDark ? "text-white" : "text-zinc-900"}`}>
                Shortme
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block leading-none">shortme.cyou</span>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Custom Multi-Language Dropdown Selection */}
            <div className="relative inline-block text-left animate-fade-in" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen((prev) => !prev)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500/50 ${
                  isDark 
                    ? "bg-zinc-900 border-zinc-800 text-zinc-100 hover:bg-zinc-800" 
                    : "bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 shadow-xs"
                }`}
                aria-expanded={isLangOpen}
                aria-haspopup="true"
              >
                <Globe className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span className="max-w-[80px] sm:max-w-none truncate">
                  {SUPPORTED_LANGUAGES.find((lang) => lang.code === language)?.nativeName || "English"}
                </span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 shrink-0 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className={`absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto rounded-xl border p-1 shadow-xl z-50 focus:outline-none ${
                      isDark 
                        ? "bg-zinc-900 border-zinc-800 text-zinc-100 shadow-black/80" 
                        : "bg-white border-zinc-200 text-zinc-800"
                    }`}
                  >
                    <div className="py-1">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = lang.code === language;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              setLanguage(lang.code);
                              setIsLangOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer text-left ${
                              isSelected
                                ? isDark
                                  ? "bg-indigo-600/20 text-indigo-350 font-bold"
                                  : "bg-indigo-50 text-indigo-600 font-extrabold"
                                : isDark
                                  ? "hover:bg-zinc-800 text-zinc-300"
                                  : "hover:bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            <span>{lang.nativeName} ({lang.code})</span>
                            {isSelected && <Check className="h-3.5 w-3.5 text-indigo-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition shadow-sm ${
                isDark 
                  ? "border-zinc-800 bg-zinc-900/60 hover:text-white hover:bg-zinc-800 text-zinc-400" 
                  : "border-zinc-200 bg-white hover:text-zinc-900 hover:bg-zinc-100 text-zinc-600"
              }`}
              title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
            >
              {isDark ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-indigo-500" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 sm:pt-12 flex-1">
        
        {/* Dynamic Alert messages */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 border rounded-xl flex items-start gap-3 ${
              isDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-500/5 border-rose-500/15"
            }`}
          >
            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <h5 className={`text-sm font-semibold ${isDark ? "text-rose-200" : "text-rose-800"}`}>{t("systemAlert") || "System alert"}</h5>
              <p className={`text-xs mt-1 ${isDark ? "text-rose-300" : "text-rose-600"}`}>{errorMsg}</p>
            </div>
          </motion.div>
        )}

        {/* Brand Hero & Showcase */}
        <div className="text-center sm:text-left max-w-2xl mb-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border mb-4 ${
            isDark ? "text-zinc-400 bg-zinc-900 border-zinc-800" : "text-zinc-600 bg-zinc-100 border-zinc-200"
          }`}>
            <Star className="h-3.5 w-3.5 text-indigo-500 fill-indigo-500/10" /> {t("secureRedirection")}
          </div>
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-dense block ${
            isDark ? "text-white" : "text-zinc-900 animate-fade-in"
          }`}>
            {t("heroTitle")}
          </h1>
          <p className={`mt-3.5 text-sm sm:text-base leading-relaxed ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}>
            {t("heroSub")}
          </p>
        </div>

        {/* Quick Dashboard Numbers */}
        <StatsGrid links={links} isDark={isDark} />

        {/* URL Shortener Form (With tabs and expiry configurations inside) */}
        <LinkShortener onLinkCreated={fetchLinks} setErrorMsg={setErrorMsg} isDark={isDark} />

        {/* Link List Area */}
        <div className="space-y-4">
          <div className={`flex items-center justify-between border-b pb-3 mb-5 ${
            isDark ? "border-zinc-900" : "border-zinc-200"
          }`}>
            <h3 className={`text-sm font-semibold flex items-center gap-2 ${
              isDark ? "text-zinc-300" : "text-zinc-700"
            }`}>
              <BarChart2 className="h-4.5 w-4.5 text-zinc-500" /> {t("activeHistory")}
            </h3>
            <button
              onClick={fetchLinks}
              className={`text-xs transition flex items-center gap-1 px-2.5 py-1.5 rounded-lg border font-medium ${
                isDark 
                  ? "bg-zinc-900 border-zinc-800 hover:text-white hover:border-zinc-700 text-zinc-400" 
                  : "bg-white border-zinc-200 hover:text-zinc-900 hover:border-zinc-300 text-zinc-600"
              }`}
            >
              <RefreshCw className="h-3 w-3" /> {t("refresh")}
            </button>
          </div>

          {loading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin mx-auto" />
              <p className="text-xs font-mono text-zinc-500 w-full text-center">{t("queryingDb")}</p>
            </div>
          ) : links.length === 0 ? (
            <div className={`border border-dashed rounded-xl py-14 text-center ${
              isDark ? "bg-zinc-900/10 border-zinc-800/50" : "bg-zinc-100/50 border-zinc-300"
            }`}>
              <p className={`text-sm font-semibold ${isDark ? "text-zinc-400" : "text-zinc-700"}`}>{t("noUrlsYet")}</p>
              <p className="text-zinc-500 text-xs mt-1 max-w-md mx-auto px-4">
                {t("noUrlsYetSub")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <LinkCard key={link.id} link={link} onDeleted={fetchLinks} isDark={isDark} />
              ))}
            </div>
          )}
        </div>

        {/* Professional Specs & Guide section */}
        <FaqSection isDark={isDark} />
      </main>

      {/* Footer */}
      <footer className={`mt-20 border-t py-10 text-center text-xs transition ${
        isDark ? "border-zinc-900 bg-zinc-950 text-zinc-500" : "border-zinc-200 bg-zinc-100 text-zinc-600"
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>{t("footerText")}</p>
          
          <div className="flex items-center flex-wrap justify-center gap-5 font-medium">
            <button
              onClick={() => setActiveModal("about")}
              className={`hover:text-indigo-500 transition cursor-pointer ${
                isDark ? "text-zinc-400 hover:text-white" : "text-zinc-700"
              }`}
            >
              {t("aboutUs")}
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => setActiveModal("privacy")}
              className={`hover:text-indigo-500 transition cursor-pointer ${
                isDark ? "text-zinc-400 hover:text-white" : "text-zinc-700"
              }`}
            >
              {t("privacyPolicy")}
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={() => setActiveModal("terms")}
              className={`hover:text-indigo-500 transition cursor-pointer ${
                isDark ? "text-zinc-400 hover:text-white" : "text-zinc-700"
              }`}
            >
              {t("termsConditions")}
            </button>
          </div>
        </div>
      </footer>

      {/* Modern Dialog Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative w-full max-w-lg rounded-2xl p-6 md:p-8 border shadow-2xl z-10 ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                  : "bg-white border-slate-200 text-zinc-900"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors cursor-pointer ${
                  isDark ? "hover:bg-zinc-800 text-zinc-400 hover:text-white" : "hover:bg-slate-100 text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Terms Content */}
              {activeModal === "terms" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 pb-3 border-b" style={{ borderColor: isDark ? "#27272a" : "#e2e8f0" }}>
                    <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                      <Scale className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-none">{MODAL_TRANSLATIONS[language]?.terms.title || MODAL_TRANSLATIONS.EN.terms.title}</h3>
                      <p className="text-[10px] font-mono text-zinc-500 leading-none mt-1.5">{MODAL_TRANSLATIONS[language]?.terms.subtitle || MODAL_TRANSLATIONS.EN.terms.subtitle}</p>
                    </div>
                  </div>

                  <div className={`text-xs space-y-3.5 max-h-80 overflow-y-auto leading-relaxed pr-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-650"
                  }`}>
                    <p>
                      {MODAL_TRANSLATIONS[language]?.terms.intro || MODAL_TRANSLATIONS.EN.terms.intro}
                    </p>
                    <div>
                      <h4 className={`font-bold text-xs ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>{MODAL_TRANSLATIONS[language]?.terms.s1_t || MODAL_TRANSLATIONS.EN.terms.s1_t}</h4>
                      <p className="mt-1">
                        {MODAL_TRANSLATIONS[language]?.terms.s1_c || MODAL_TRANSLATIONS.EN.terms.s1_c}
                      </p>
                    </div>
                    <div>
                      <h4 className={`font-bold text-xs ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>{MODAL_TRANSLATIONS[language]?.terms.s2_t || MODAL_TRANSLATIONS.EN.terms.s2_t}</h4>
                      <p className="mt-1">
                        {MODAL_TRANSLATIONS[language]?.terms.s2_c || MODAL_TRANSLATIONS.EN.terms.s2_c}
                      </p>
                    </div>
                    <div>
                      <h4 className={`font-bold text-xs ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>{MODAL_TRANSLATIONS[language]?.terms.s3_t || MODAL_TRANSLATIONS.EN.terms.s3_t}</h4>
                      <p className="mt-1">
                        {MODAL_TRANSLATIONS[language]?.terms.s3_c || MODAL_TRANSLATIONS.EN.terms.s3_c}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Content */}
              {activeModal === "privacy" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 pb-3 border-b" style={{ borderColor: isDark ? "#27272a" : "#e2e8f0" }}>
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                      <FileText className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-none">{MODAL_TRANSLATIONS[language]?.privacy.title || MODAL_TRANSLATIONS.EN.privacy.title}</h3>
                      <p className="text-[10px] font-mono text-zinc-500 leading-none mt-1.5">{MODAL_TRANSLATIONS[language]?.privacy.subtitle || MODAL_TRANSLATIONS.EN.privacy.subtitle}</p>
                    </div>
                  </div>

                  <div className={`text-xs space-y-3.5 max-h-80 overflow-y-auto leading-relaxed pr-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-650"
                  }`}>
                    <p>
                      {MODAL_TRANSLATIONS[language]?.privacy.intro || MODAL_TRANSLATIONS.EN.privacy.intro}
                    </p>
                    <div>
                      <h4 className={`font-bold text-xs ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>{MODAL_TRANSLATIONS[language]?.privacy.s1_t || MODAL_TRANSLATIONS.EN.privacy.s1_t}</h4>
                      <p className="mt-1">
                        {MODAL_TRANSLATIONS[language]?.privacy.s1_c || MODAL_TRANSLATIONS.EN.privacy.s1_c}
                      </p>
                    </div>
                    <div>
                      <h4 className={`font-bold text-xs ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>{MODAL_TRANSLATIONS[language]?.privacy.s2_t || MODAL_TRANSLATIONS.EN.privacy.s2_t}</h4>
                      <p className="mt-1">
                        {MODAL_TRANSLATIONS[language]?.privacy.s2_c || MODAL_TRANSLATIONS.EN.privacy.s2_c}
                      </p>
                    </div>
                    <div>
                      <h4 className={`font-bold text-xs ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>{MODAL_TRANSLATIONS[language]?.privacy.s3_t || MODAL_TRANSLATIONS.EN.privacy.s3_t}</h4>
                      <p className="mt-1">
                        {MODAL_TRANSLATIONS[language]?.privacy.s3_c || MODAL_TRANSLATIONS.EN.privacy.s3_c}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* About US Content */}
              {activeModal === "about" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 pb-3 border-b" style={{ borderColor: isDark ? "#27272a" : "#e2e8f0" }}>
                    <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                      <Landmark className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-none">{MODAL_TRANSLATIONS[language]?.about.title || MODAL_TRANSLATIONS.EN.about.title}</h3>
                      <p className="text-[10px] font-mono text-zinc-500 leading-none mt-1.5">{MODAL_TRANSLATIONS[language]?.about.subtitle || MODAL_TRANSLATIONS.EN.about.subtitle}</p>
                    </div>
                  </div>

                  <div className={`text-xs space-y-3.5 max-h-80 overflow-y-auto leading-relaxed pr-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-650"
                  }`}>
                    <p>{MODAL_TRANSLATIONS[language]?.about.p1 || MODAL_TRANSLATIONS.EN.about.p1}</p>
                    <p>{MODAL_TRANSLATIONS[language]?.about.p2 || MODAL_TRANSLATIONS.EN.about.p2}</p>
                    <p>{MODAL_TRANSLATIONS[language]?.about.p3 || MODAL_TRANSLATIONS.EN.about.p3}</p>
                  </div>
                </div>
              )}

              {/* Close Button Anchor Footer */}
              <div className="mt-6 pt-4 border-t flex justify-end" style={{ borderColor: isDark ? "#27272a" : "#f1f5f9" }}>
                <button
                  onClick={() => setActiveModal(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                    isDark
                      ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                  }`}
                >
                  {MODAL_TRANSLATIONS[language]?.closeBtn || MODAL_TRANSLATIONS.EN.closeBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
