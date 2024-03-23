import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../header/header.component';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Yes We Can Driving School';

  constructor(private translationService: TranslationService) {}

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
