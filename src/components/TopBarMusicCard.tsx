import { Minus, Plus, SkipForward, Pause, Play, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useApp } from "@/lib/app-context";
import { getNowPlayingText } from "@/lib/media-now-playing";
import { PLAYLIST } from "@/components/MediaCard";

interface TopBarMusicCardProps {
  onClose: () => void;
}

export function TopBarMusicCard({ onClose }: TopBarMusicCardProps) {
  const { t, i18n } = useTranslation();
  const { volume, setVolume, trackIdx, setTrackIdx, setProgress, playing, setPlaying, audioEl } = useApp();
  const curTrack = PLAYLIST[trackIdx];
  const nextIdx = (trackIdx + 1) % PLAYLIST.length;
  const nowPlayingLabel = i18n.exists("media.nowPlaying", { lng: i18n.resolvedLanguage || i18n.language, fallbackLng: false })
    ? t("media.nowPlaying")
    : getNowPlayingText(i18n.resolvedLanguage || i18n.language);

  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  const changeVolume = (delta: number) => setVolume((prev) => clamp(prev + delta));
  const togglePlay = () => setPlaying(!playing);
  const nextTrack = () => {
    setTrackIdx(nextIdx);
    setProgress(0);
    setPlaying(true);
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.load();
    }
  };

  const titleClass = curTrack.title.length > 26 ? "text-[12px]" : curTrack.title.length > 20 ? "text-[13px]" : "text-[14px]";
  const artistClass = curTrack.artist.length > 26 ? "text-[10px]" : curTrack.artist.length > 20 ? "text-[11px]" : "text-[11px]";

  return (
    <div className="flex h-[52px] max-w-[420px] min-w-[360px] items-center gap-[12px] rounded-[22px] bg-app-panel px-[16px] shadow-sm ring-1 ring-black/5">
      <div className="min-w-0 max-w-[190px]">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{nowPlayingLabel}</div>
        <div className={`truncate font-semibold text-foreground ${titleClass}`} style={{ lineHeight: 1.1 }}>
          {curTrack.title}
        </div>
        <div className={`truncate text-muted-foreground ${artistClass}`} style={{ lineHeight: 1.1 }}>
          {curTrack.artist}
        </div>
      </div>
      <div className="flex items-center gap-[8px]">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-[16px] bg-app-panel-soft text-foreground transition hover:bg-[var(--active)]/15"
          aria-label={playing ? t("media.playPause", "Pause") : t("media.playPause", "Play")}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => changeVolume(-0.1)}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-[16px] bg-app-panel-soft text-foreground transition hover:bg-[var(--active)]/15"
          aria-label={t("media.volumeDown", "Volume down")}
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={nextTrack}
          className="flex h-[40px] min-w-[86px] items-center justify-center rounded-[16px] bg-[var(--active)] px-[12px] text-[14px] font-semibold text-foreground shadow-sm transition hover:brightness-95"
          aria-label={t("media.nextTrack", "Next song")}
        >
          <SkipForward className="mr-2 h-4 w-4" />
          {t("media.next", "Next")}
        </button>
        <button
          type="button"
          onClick={() => changeVolume(0.1)}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-[16px] bg-app-panel-soft text-foreground transition hover:bg-[var(--active)]/15"
          aria-label={t("media.volumeUp", "Volume up")}
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex h-[40px] w-[40px] items-center justify-center rounded-[16px] bg-app-panel-soft text-foreground transition hover:bg-[var(--active)]/15"
          aria-label={t("media.closeQuickMusic", "Close quick music")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
