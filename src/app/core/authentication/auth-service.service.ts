import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IUser, User } from 'src/app/modules/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfo = new BehaviorSubject<any>(new User());

  get getUserInfo(){
    return this.userInfo.getValue();
  }
  
  constructor(private http:HttpClient,private router:Router) { 
    
  }

  isLogin(){
    return localStorage.getItem("user") ? true : false;
  }

  login(name :string , password:string):IUser | null{
    if(name == "admin" && password == "admin"){
      
    }
    else if(name == "user" && password == "user"){

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

}
