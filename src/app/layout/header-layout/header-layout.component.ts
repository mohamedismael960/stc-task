import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth-service.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent implements OnInit{

  username!:string;
  constructor(public authService:AuthService){}

  ngOnInit(): void {    
    this.username = this.authService.getUserInfo.name;
  }

  logout(){
    this.authService.logout();
  }

}
