import { Component } from '@angular/core';
import { TranslationService } from './core/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private translate: TranslationService) {
    this.translate.loadTranslations();
  }
}
