import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IUser, User } from 'src/app/modules/auth/auth.model';
import { Authority } from 'src/app/config/authority.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfo = new BehaviorSubject<any>(new User());

  private authority = new BehaviorSubject<string>("");

  get getUserInfo(){
    return this.userInfo.getValue();
  }
  get getAuthority(){
    return this.authority.getValue();
  }
  
  constructor(private router:Router) { 
    
  }

  isLogin(){
    return localStorage.getItem("user") ? true : false;
  }

  login(name :string , password:string):IUser | null{
    if(name == "admin" && password == "admin"){
        this.setAuthority(Authority.ADMIN);
    }
    else if(name == "user" && password == "user"){
      this.setAuthority(Authority.USER);
    }else{
      return null;
    }
    const user = new User(name);
    this.setDataToStorage(user);
    this.storeUserInfo(user);
    return new User();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  setDataToStorage(user:IUser){
    localStorage.setItem('user',JSON.stringify(user));
  }

  storeUserInfo(user:IUser){
    this.userInfo.next(user);
  } 

  setAuthority(authority : Authority){
    this.authority.next(authority);
  }

}
