export enum Themes {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeState {
  user: object | null
  current: Themes
}
