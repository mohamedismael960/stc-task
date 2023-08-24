import { Component } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth-service.service';
import { User } from '../auth.model';
import { finalize, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loader:boolean = false;

  loginForm:UntypedFormGroup = this._fb.group({
    name:['',[Validators.required]],
    password:['',[Validators.required]]
  });
  constructor(private _fb:FormBuilder,private authService:AuthService,private router:Router){

  }

  login(){
    this.loader = true;
    const user = this.authService.login(this.loginForm.get('name')?.value , this.loginForm.get('password')?.value)
    if(user){
      this.router.navigate(['dashboard']);
    }else{
      // alert enter valid data
    }
    this.loader = false;
  }
}
