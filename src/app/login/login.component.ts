import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userDetails: any;
  loginData: any;
  loginForm!: FormGroup;
  inCorrectPassword = false;
  accountLocked = false;
  isDisabledButton: boolean = true;
  email: any;
  password: any;
  show=false;
  passwordAttemptsCount = 0;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllUserDetails();
  }

  getAllUserDetails() {
    this.adminService.getAllUserDetails().subscribe(response => {
      this.userDetails = response.data;
      console.log(this.userDetails);
    });
  }

  logInfo() {
    if (this.loginForm.valid) {
      const insertFormData = this.loginForm.value;
      const filteredUsers = this.userDetails.filter((user: any) =>
        user.email === insertFormData.email && user.password === insertFormData.password);
  
      if (filteredUsers.length > 0) {
        this.show=false;
        alert('Login successful');
       
      } else {
        this.passwordAttemptsCount++;;
        let remainingAttempts = 5 - this.passwordAttemptsCount;
  
        if (remainingAttempts > 0) {
          alert(`Invalid email or password. You have ${remainingAttempts} chances left.`);
        } else {
          alert('Maximum login attempts exceeded. Your account is locked.');
          // Optionally: Lock the account or navigate to a different page
          this.accountLocked = true;
        }
      }
    } else {
      alert('Please fill in all required fields and correct any validation errors.');
    }
  }
  
}
