import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../core/translation/translation.service';
import { isModile } from '../Helpers/detectMobile';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  mode!: 'over' | 'side' ;

  opened!:boolean;

  constructor(private translationService:TranslationService){
    
  }

  ngOnInit(): void {
    if(isModile()){
      this.mode = 'over';
      this.opened = false;
     }else{
       this.mode = 'side';
       this.opened = true;
     }
  }

  get getLang(){
    return this.translationService.getCurrentLang() == 'ar' ? 'rtl' : 'ltr' ;
  }

  toggleMenu(){
    this.opened = !this.opened;
  }

  closeMenu(){
    if(isModile()){
      this.opened = false;
    }
  }

}
