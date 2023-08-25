import { Component } from '@angular/core';
import { TranslationService } from '../core/translation/translation.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  constructor(private translationService:TranslationService){

  }

  get getLang(){
    return this.translationService.getCurrentLang() == 'ar' ? 'rtl' : 'ltr' ;
  }
}
