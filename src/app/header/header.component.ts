import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatNavList,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.setLanguage('ko');
  }

  switchLanguage(language: string): void {
    this.translationService.setLanguage(language);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
