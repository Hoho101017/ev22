import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AppProvider, useApp } from "@/lib/app-context";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { ReverseCamera } from "@/components/ReverseCamera";
import { GearPanel } from "@/components/GearPanel.tsx";
import { GlobalAudioPlayer } from "@/components/GlobalAudioPlayer";
import { SearchBar } from "@/components/SearchBar";
import { StatusCard } from "@/components/StatusCard";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">{t("notFound.title")}</h2>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">{t("notFound.goHome")}</Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HCI Dashboard" },
      { name: "description", content: "Tablet cockpit interface — navigation, voice, climate and more." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Frame() {
  const { brightness, gear, setGear } = useApp();
  const reversing = gear === "R";

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Gear: Ctrl+Alt+P / R / N / D (avoids plain Ctrl+P etc. clashing with browser shortcuts).
      if (!e.ctrlKey || !e.altKey) return;
      const k = e.key.length === 1 ? e.key.toUpperCase() : "";
      if (k === "P" || k === "R" || k === "N" || k === "D") {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        setGear(k as "P" | "R" | "N" | "D");
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [setGear]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-[16px]" style={{ background: "var(--app-bg)" }}>
      <div
        className="relative z-10 overflow-hidden rounded-[28px] border-2 shadow-2xl transition-[filter] duration-700 ease-out"
        style={{
          width: 960,
          height: 690,
          borderColor: "var(--app-border)",
          background: "var(--background)",
          filter: `brightness(${brightness})`,
        }}
      >
        {reversing ? (
          <>
            {/* Reverse: no left sidebar — full width for camera + right stack (matches mock). */}
            <div className="flex h-full w-full">
              <div className="relative flex h-full min-h-0 w-full flex-col">
                <main className="relative z-0 flex min-h-0 flex-1 overflow-visible px-[16px] pt-[12px] pb-[12px]">
                  <div
                    className="grid min-h-0 h-full w-full items-stretch"
                    style={{
                      gridTemplateColumns: "1fr 268px",
                      gridTemplateRows: "68px 1fr",
                      columnGap: 10,
                      rowGap: 0,
                    }}
                  >
                    <div className="relative col-start-1 row-span-2 min-h-0 min-w-0 overflow-hidden rounded-[24px] bg-black shadow-sm ring-1 ring-black/5">
                      <ReverseCamera embedded className="h-full min-h-0 w-full" />
                    </div>
                    <div className="relative z-[200] col-start-2 row-start-1 flex items-center justify-end overflow-visible">
                      <div className="-translate-y-1.5">
                        <SearchBar />
                      </div>
                    </div>
                    <div className="col-start-2 row-start-2 flex min-h-0 min-w-0 flex-col" style={{ gap: 8 }}>
                      <div className="shrink-0" style={{ height: 470 }}>
                        <GearPanel />
                      </div>
                      <div className="shrink-0" style={{ height: 120 }}>
                        <StatusCard showWeather />
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <GlobalAudioPlayer />
          </>
        ) : (
          <>
            <div className="flex h-full w-full">
              <Sidebar />
              <div className="relative flex h-full min-h-0 flex-1 flex-col">
                <TopBar />
                <main className="relative z-0 flex min-h-0 flex-1 overflow-visible px-[16px] pt-[12px] pb-[12px]">
                  <Outlet />
                </main>
              </div>
            </div>
            <GlobalAudioPlayer />
          </>
        )}
      </div>
    </div>
  );
}

function RootComponent() {
  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <Frame />
      </AppProvider>
    </I18nextProvider>
  );
}

