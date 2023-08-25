import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth-service.service';
import { TranslationService } from 'src/app/core/translation/translation.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit{

  username!:string;
  constructor(public authService:AuthService , private translateService:TranslationService){}

  ngOnInit(): void {    
    this.username = this.authService.getUserInfo.name;
  }

  switchLang(lang:string){
    this.translateService.switchLang(lang);
  }

  logout(){
    this.authService.logout();
  }

}
