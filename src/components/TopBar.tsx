import { SearchBar } from "./SearchBar";
import { TopBarMusicCard } from "./TopBarMusicCard";
import { Music } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useApp } from "@/lib/app-context";

export function TopBar() {
  const { i18n } = useTranslation();
  const { location } = useRouterState();
  const { activeRoute } = useApp();
  const path = location.pathname;
  const [topBarMusicVisible, setTopBarMusicVisible] = useState(true);
  const showMusicCard =
    topBarMusicVisible && path === "/map" && activeRoute?.navigationHudShown && activeRoute.routeLine.length > 1;
  const showMusicIcon =
    !topBarMusicVisible && path === "/map" && activeRoute?.navigationHudShown && activeRoute.routeLine.length > 1;
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Map custom language codes to valid Intl language codes
  const intlLocaleMap: Record<string, string> = {
    "iban": "ms", // Iban -> Malay
    "melanau": "ms", // Melanau -> Malay
    "bidayuh": "ms", // Bidayuh -> Malay
    "kelabit": "ms", // Kelabit -> Malay
  };

  const currentLang = i18n.resolvedLanguage || i18n.language || "en";
  const intlLocale = intlLocaleMap[currentLang] || currentLang;
  
  const time = now
    // Keep clock in AM/PM style regardless of selected display language.
    ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(now)
    : "--:-- --";
  const date = now
    ? `${new Intl.DateTimeFormat(intlLocale, { weekday: "short" }).format(now).toUpperCase()} | ${new Intl.DateTimeFormat(intlLocale, { day: "numeric", month: "short" }).format(now).toUpperCase()}`
    : "--- | -- ---";

  return (
    <header className="relative z-[200] flex h-[68px] shrink-0 items-center justify-between gap-4 overflow-visible px-[16px] pt-[12px] pb-[12px]">
      <div className="min-w-0 flex-1 leading-none">
        <span
          className="block overflow-hidden text-ellipsis whitespace-nowrap font-bold tracking-tight"
          style={{ fontSize: "clamp(28px, 3.2vw, 36px)", lineHeight: 1 }}
        >
          {time}
        </span>
        <span
          className="mt-1 block overflow-hidden text-ellipsis whitespace-nowrap font-semibold tracking-[0.15em] text-foreground/70"
          style={{ fontSize: "12px", lineHeight: 1.15 }}
        >
          {date}
        </span>
      </div>
      {showMusicCard ? (
        <TopBarMusicCard onClose={() => setTopBarMusicVisible(false)} />
      ) : showMusicIcon ? (
        <button
          type="button"
          onClick={() => setTopBarMusicVisible(true)}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-[16px] bg-app-panel-soft text-foreground transition hover:bg-[var(--active)]/15"
          aria-label={i18n.t("media.openQuickMusic", "Open music")}
        >
          <Music className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>
      ) : null}
      <SearchBar />
    </header>
  );
}
