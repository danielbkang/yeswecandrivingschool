import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  constructor(private translationService: TranslationService) {}

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
