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

  userDetails:any;
  // obj:any;
  loginData:any;
  loginForm!: FormGroup;
  inCorrectPassword = false;
  accountLocked = false;
  isDisabledButton:boolean=true;
  email:any;
  password:any
  otp:any

  constructor(private fb: FormBuilder, private adminService: AdminService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      otp:['',[Validators.required]]
    });
  }

  ngOnInit(): void {

    this.getAllUserDetails();

  }

  getAllUserDetails(){
    this.adminService.getAllUserDetails().subscribe(response => {
      this.userDetails = response.data;
      // this.obj = this.obj.data
      // this.dataSource = new MatTableDataSource<any>(this.obj);
      // this.obj=this.userDetails;
      console.log(this.userDetails);
      
      
    })
  }

  logInfo() {

    if (this.loginForm.valid) {
         const insertFormData = this.loginForm.value;
          //  Filter the userDetails array based on entered userName and password
             const filteredUsers = this.userDetails.filter((user:any)=>
              
              user.userName === insertFormData.userName && user.password === insertFormData.password && user.otp===insertFormData.otp);
                 if (filteredUsers.length > 0 ){
                    alert('Login successful');
                  this.router.navigate(['/']);
                       }
                  else {   
                    var n=5;
                    for(var i=1;i<=5;i++){
                      var count=1;
                    if (filteredUsers.length > 0 ){
                      alert('Login successful');
                    // this.router.navigate(['/home']);

                         }
                         count++;
                        }
                    alert("Invalid email or password or OTP"+i+"had chances")
                    
                      }
                      // alert("Account Locked")
                  
                  }
                  

                   else {
                  alert('Please fill in all required fields and correct any validation errors.');   
                  }   
                }
  }

  
  
  
