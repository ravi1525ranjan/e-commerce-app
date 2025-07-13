import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  userAuthService = inject(AuthService)
  router = inject(Router)
  registrationForm: any;
  constructor(){
      this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
  }

  ngOnInit(){}
    onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Submitted:', this.registrationForm.value);
      this.userAuthService.registerUser(this.registrationForm.value).subscribe({
        next : (response:any) =>{
          console.log("user respons",response)
          if(response){
            alert('User registered successfuly')
            this.router.navigateByUrl('/login')
          }
        },
        error : (error) =>{
          console.error('Error creating user:', error);
        }
      })
    }
  }
}
