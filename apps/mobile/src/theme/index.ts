export const colors = {
  background: "#06070A",
  backgroundElevated: "#10131A",
  backgroundSoft: "#171B24",
  surface: "#10141D",
  surfaceAlt: "#1A2030",
  surfaceGlass: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  text: "#F5F7FB",
  textMuted: "#98A3B7",
  textSoft: "#6B7384",
  accent: "#7CF3C8",
  accentStrong: "#43D6A6",
  accentWarm: "#FFB86C",
  accentRed: "#FF7070",
  accentBlue: "#60AFFF",
  success: "#6BE5A3",
  warning: "#FFB86C",
  error: "#FF7070"
} as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 36
} as const;

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  pill: 999
} as const;

export const typography = {
  hero: 32,
  title: 24,
  heading: 20,
  body: 16,
  small: 13,
  caption: 11
} as const;

export const shadows = {
  glow: {
    shadowColor: colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10
  }
};
