import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
      MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm : any
fb = inject(FormBuilder)
userAuthService = inject(AuthService)
router = inject(Router)

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      this.userAuthService.loginUser(this.loginForm.value).subscribe((response:any)=>{
          if(response){
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            alert('User logged in successfuly')
            this.router.navigateByUrl('/')
          }
      })
    }
  }
}
