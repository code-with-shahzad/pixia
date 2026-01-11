export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  inputBackground: string;
};

export type Theme = {
  colors: ThemeColors;
  spacing: {
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    s: number;
    m: number;
    l: number;
    round: number;
  };
  typography: {
    h1: any;
    h2: any;
    body: any;
    button: any;
    caption: any;
  };
  dark: boolean; // Add a flag to easy check
};

const palette = {
  purple: '#7F5AF0',
  purpleDark: '#6200ee',
  green: '#2CB67D',
  red: '#E53170',
  white: '#fffffe',
  black: '#16161a',
  gray100: '#f2f2f3',
  gray200: '#d1d1e9',
  gray600: '#94a1b2',
  gray800: '#242629',
  darkBg: '#16161a',
  darkSurface: '#242629',
};

const common = {
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 16,
    round: 100,
  },
  typography: {
    // We will apply colors dynamically in the component or have specific styles
    h1: { fontSize: 32, fontWeight: '700' as '700' },
    h2: { fontSize: 24, fontWeight: '600' as '600' },
    body: { fontSize: 16 },
    button: { fontSize: 16, fontWeight: '600' as '600' },
    caption: { fontSize: 12 },
  }
};

export const lightTheme: Theme = {
  ...common,
  dark: false,
  colors: {
    background: palette.white,
    surface: palette.gray100,
    primary: palette.purpleDark,
    secondary: palette.green,
    text: palette.black,
    textSecondary: palette.gray600,
    border: palette.gray200,
    error: palette.red,
    success: palette.green,
    inputBackground: palette.white,
  },
};

export const darkTheme: Theme = {
  ...common,
  dark: true,
  colors: {
    background: palette.darkBg,
    surface: palette.darkSurface,
    primary: palette.purple,
    secondary: palette.green,
    text: palette.white,
    textSecondary: palette.gray600,
    border: palette.gray800,
    error: palette.red,
    success: palette.green,
    inputBackground: palette.darkSurface,
  },
};

// Default export for initial load or static usage (optional, prefer context)
export const theme = lightTheme; 
