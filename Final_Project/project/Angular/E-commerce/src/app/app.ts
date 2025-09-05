import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/layout-services/auth/auth-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  constructor(private _authService:AuthService){}
  ngOnInit(): void {
    this._authService.ininitLogin();
  }
  protected readonly title = signal('E-commerce');

}
