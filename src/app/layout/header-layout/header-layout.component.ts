import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth-service.service';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss']
})
export class HeaderLayoutComponent {

  constructor(public authService:AuthService){}

  logout(){
    this.authService.logout();
  }

}
