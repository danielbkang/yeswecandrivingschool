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
        }, 200);
      });
    } else {
      this.doScroll(sectionId);
    }
  }

  private doScroll(sectionId: string, retryCount = 0): void {
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        const offsetPosition = elementPosition + currentScroll - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      } else if (retryCount < 5) {
        setTimeout(() => this.doScroll(sectionId, retryCount + 1), 100);
      }
    }
  }
}
