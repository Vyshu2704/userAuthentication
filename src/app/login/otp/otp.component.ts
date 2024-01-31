import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit{

  userDetails: any;
  loginData: any;
  loginForm!: FormGroup;
  inCorrectOtp = false;
  accountLocked = false;
  isDisabledButton: boolean = true;
  email: any;
  password: any;
  passwordAttemptsExceeded = false;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]]
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
        user.email === insertFormData.email && user.otp === insertFormData.otp);

        if (filteredUsers.length > 0) {
          alert('Login successful');
          this.router.navigate(['/home']);
        } else {
          this.inCorrectOtp = true;
          let n = 5;
          if (this.inCorrectOtp) {
            for (let i = 1; i <= n; i++) {
              alert(`Invalid email or OTP. You have ${n - i} chances left.`);
            }
            this.passwordAttemptsExceeded = true;
            this.inCorrectOtp = false;
          } else {
            alert('Incorrect email or OTP.');
          }
        }
      } else {
        alert('Please fill in all required fields and correct any validation errors.');
      }
    }

    
}



