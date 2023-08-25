import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth-service.service';
import { Authority } from 'src/app/config/authority.constants';

@Injectable({
  providedIn: 'root'
})
export class InitServiceService {
  constructor(private auth:AuthService) { }

  init(){
    if(this.auth.isLogin()){
      const user = JSON.parse(localStorage.getItem("user")!!);
      this.auth.storeUserInfo(user);
      if(user.name == "admin"){
        this.auth.setAuthority(Authority.ADMIN);
      }else if(user.name == "user"){
        this.auth.setAuthority(Authority.USER);
      } 
    }
  }
}
