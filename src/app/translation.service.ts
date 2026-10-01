import { Injectable, signal, computed } from '@angular/core';
import en from '../assets/i18n/en.json';
import ko from '../assets/i18n/ko.json';

export type Language = 'ko' | 'en';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguageSignal = signal<Language>('ko');

  readonly currentLanguage = computed(() => this.currentLanguageSignal());

  private readonly translationDicts: Record<Language, Record<string, any>> = {
    ko,
    en,
  };

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('ywc_lang') as Language | null;
      if (saved && (saved === 'ko' || saved === 'en')) {
        this.setLanguage(saved);
        return;
      }
    }
    this.setLanguage('ko');
  }

  setLanguage(language: Language): void {
    this.currentLanguageSignal.set(language);
    if (typeof window !== 'undefined') {
      if (window.localStorage) {
        window.localStorage.setItem('ywc_lang', language);
      }
      document.documentElement.lang = language;
    }
  }

  getTranslation(key: string): string {
    const lang = this.currentLanguageSignal();
    const dictionary = this.translationDicts[lang] || this.translationDicts.ko;
    const value = dictionary[key];
    if (value !== undefined) {
      return value;
    }
    const fallback = this.translationDicts.en[key];
    return fallback !== undefined ? fallback : key;
  }

  t(key: string): string {
    return this.getTranslation(key);
  }

  getList(key: string): string[] {
    const lang = this.currentLanguageSignal();
    const dictionary = this.translationDicts[lang] || this.translationDicts.ko;
    const value = dictionary[key];
    if (Array.isArray(value)) {
      return value;
    }
    const fallback = this.translationDicts.en[key];
    return Array.isArray(fallback) ? fallback : [];
  }
}
