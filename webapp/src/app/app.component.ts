import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webapp';
   router = inject(Router);
    authService = inject(AuthService)
    userName: any;
    isAdmin:any
  constructor(){
        this.userName = this.authService.getUserData()
    this.isAdmin = this.authService.isAdmin()
  }
}
