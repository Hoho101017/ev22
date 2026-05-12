const NOW_PLAYING_LABELS: Record<string, string> = {
  en: "Now playing",
  ms: "Sedang dimainkan",
  zh: "正在播放",
  ja: "再生中",
  ko: "재생 중",
  es: "Reproduciendo",
  fr: "En lecture",
  de: "Wird abgespielt",
  it: "In riproduzione",
  pt: "Tocando",
  id: "Sedang diputar",
  th: "กำลังเล่น",
  vi: "Đang phát",
  hi: "अब चल रहा है",
  ar: "يتم التشغيل",
  ru: "Сейчас играет",
  ta: "இப்போது இயக்கப்படுகிறது",
  tr: "Çalıyor",
  nl: "Wordt afgespeeld",
  sv: "Spelas nu",
  pl: "Odtwarzanie",
  uk: "Відтворюється",
  fa: "در حال پخش",
  bn: "চলছে",
  ur: "اب چل رہا ہے",
  fil: "Kasalukuyang pinapatugtog",
};

export function getNowPlayingText(language: string): string {
  const normalized = (language || "en").toLowerCase();
  const direct = NOW_PLAYING_LABELS[normalized];
  if (direct) return direct;
  const primary = normalized.split("-")[0];
  return NOW_PLAYING_LABELS[primary] || NOW_PLAYING_LABELS.en;
}
