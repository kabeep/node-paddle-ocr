export enum Language {
    CN = '简体中文',
    HK = '繁體中文',
    EN = 'English',
    RU = 'Русский',
    JA = '日本語',
    KO = '한국인',
    DE = 'Deutsch',
    FR = 'Français',
}

export type LanguageType = typeof Language | keyof typeof Language | Lowercase<keyof typeof Language>;
