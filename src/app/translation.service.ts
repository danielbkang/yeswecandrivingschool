import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import en from '../assets/i18n/en.json';
import ko from '../assets/i18n/ko.json';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage: string = 'en';
  private translations: any;

  constructor(private http: HttpClient) {}

  getTranslation(key: string): string {
    this.loadLanguage(this.currentLanguage);

    return this.translations[key] || key;
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
    this.loadLanguage(language);
  }

  private loadLanguage(language: string): void {
    if (language == 'en') {
      this.translations = en;
    } else {
      this.translations = ko;
    }
  }
}
