import { Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILogin } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/layout-services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login  {
  constructor(private _authService:AuthService){}
  loginForm = new FormGroup({
    email: new FormControl<string>('',Validators.required),
    password: new FormControl<string>('',Validators.required),
  })
  message = '';
  onSubmit(){
        const myValue:ILogin= this.loginForm.value as ILogin;
        this._authService.login(myValue).subscribe({
        error:(err: { message: string; })=>this.message= err.message
      }
    )
  }
}
