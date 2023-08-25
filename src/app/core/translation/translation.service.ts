import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) {
    
   }

   loadTranslations(){
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
   }

   getCurrentLang(){
    return this.translate.getDefaultLang();
   }


   switchLang(lang: string) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.textAlign = lang === 'ar' ? 'right' : 'left';
  }

 
}
