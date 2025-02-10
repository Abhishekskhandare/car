import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegService } from '../../registration/reg.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements  OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegService,private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginuserData = this.loginForm.value;
      console.log('Request Payload:', loginuserData);  // Log the request payload for debugging
      this.registrationService.login(loginuserData).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/home']);  
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}