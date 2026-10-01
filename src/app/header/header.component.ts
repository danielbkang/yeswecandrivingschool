import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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

  constructor(
    public translationService: TranslationService,
    private router: Router
  ) {}

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

  scrollToSection(sectionId: string): void {
    this.closeMobileMenu();
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl !== '/home' && currentUrl !== '/') {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          this.doScroll(sectionId);
        }, 150);
      });
    } else {
      this.doScroll(sectionId);
    }
  }

  private doScroll(sectionId: string): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
