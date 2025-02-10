import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegService } from '../../registration/reg.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements  OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private registrationService: RegService, private router:Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      console.log('Request Payload:', userData);  // Log the request payload for debugging
  
      this.registrationService.register(userData).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['']); 
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