const SPEECH_LANG_MAP: Record<string, string> = {
  en: "en-US",
  ms: "ms-MY",
  ta: "ta-IN",
  "zh-hans": "zh-CN",
  "zh-hant": "zh-TW",
  iba: "ms-MY",
  melanau: "ms-MY",
  bidayuh: "ms-MY",
  kelabit: "ms-MY",
  ja: "ja-JP",
  ko: "ko-KR",
  es: "es-ES",
  vi: "vi-VN",
  fil: "fil-PH",
  id: "id-ID",
  th: "th-TH",
  ar: "ar-SA",
  hi: "hi-IN",
  ru: "ru-RU",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  pt: "pt-PT",
  tr: "tr-TR",
  nl: "nl-NL",
  sv: "sv-SE",
  pl: "pl-PL",
  uk: "uk-UA",
  fa: "fa-IR",
  bn: "bn-BD",
  ur: "ur-PK",
};

export function speechLangFor(uiLang: string | null | undefined): string {
  if (!uiLang) return "en-US";
  return SPEECH_LANG_MAP[uiLang.toLowerCase()] ?? uiLang;
}
