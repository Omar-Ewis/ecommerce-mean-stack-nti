import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/layout-services/auth/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegister } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './singup.html',
styleUrls: ['./singup.css']  // فيها s
})
export class Singup {
    constructor(private _authService: AuthService, private _router: Router) {}

    registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
    });

    message = '';

  onSubmit() {
      if (this.registerForm.invalid) return;
      const value = this.registerForm.getRawValue() as IRegister;
      this._authService.register(value).subscribe({
        next: () => {
          alert('Submitted! 🎉');
          this._router.navigate(['/login']);

        },
        error: (err) => {
          this.message = err?.error?.message || 'Something went wrong';
        }
      });
    }
}
