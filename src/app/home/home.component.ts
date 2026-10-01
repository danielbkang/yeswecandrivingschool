import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  openFaqIndex = signal<number | null>(0);

  constructor(public translationService: TranslationService) {}

  toggleFaq(index: number): void {
    this.openFaqIndex.update((curr) => (curr === index ? null : index));
  }

  isFaqOpen(index: number): boolean {
    return this.openFaqIndex() === index;
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  getList(key: string): string[] {
    return this.translationService.getList(key);
  }
}
