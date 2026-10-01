import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(
    public translationService: TranslationService,
    private router: Router
  ) {}

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToSection(sectionId: string): void {
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
