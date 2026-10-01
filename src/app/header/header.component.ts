import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Language, TranslationService } from '../translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobileMenuOpen = signal<boolean>(false);

  readonly currentLang = computed(() => this.translationService.currentLanguage());

  constructor(public translationService: TranslationService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  switchLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
