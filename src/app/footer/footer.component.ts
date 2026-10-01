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

  private doScroll(sectionId: string): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
