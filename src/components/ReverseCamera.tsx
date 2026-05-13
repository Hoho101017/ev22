import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import reverseCameraImg from "@/assets/reverse-camera.png";
import { cn } from "@/lib/utils";

/** Reverse camera feed — static image (guide lines live in the asset, not duplicated in SVG). */
export function ReverseCamera({
  className = "",
  fullscreen = false,
  /** When true, outer frame (e.g. dashboard card) owns radius/shadow; inner is flush fill. */
  embedded = false,
}: {
  className?: string;
  fullscreen?: boolean;
  embedded?: boolean;
}) {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        fullscreen
          ? "fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none"
          : embedded
            ? "relative isolate h-full min-h-0 w-full min-w-0 overflow-hidden bg-black"
            : "relative isolate min-h-0 overflow-hidden rounded-[24px] bg-black shadow-sm ring-1 ring-black/5",
        className,
      )}
    >
      {/* Absolute fill avoids flex/grid min-height:auto "shrink-to-image" gaps above/below the feed. */}
      <img
        src={reverseCameraImg}
        alt={t("reverse.reverseCam")}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none",
          embedded && "scale-[1.06]",
        )}
        style={embedded ? { transformOrigin: "50% 55%" } : undefined}
        onLoad={() => setLoaded(true)}
      />

      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
        <ImageIcon className="h-3 w-3" />
        {t("reverse.reverseCam")}
      </div>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-3 text-center text-[10px] text-white">
          {t("reverse.reverseCam")}
        </div>
      )}
    </div>
  );
}
