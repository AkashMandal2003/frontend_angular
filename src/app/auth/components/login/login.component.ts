import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm!: FormGroup
    hidePassword =true

    constructor(private fb:FormBuilder,
      private authservice:AuthService,
      private snackbar: MatSnackBar,
      private router:Router
    ) {
      this.loginForm=this.fb.group({
        email:[null,[Validators.required,Validators.email]],
        password:[null,[Validators.required]],
      })
    }

    togglePasswordVisibility(){
      this.hidePassword=!this.hidePassword;
    }

    onSubmit(){
      console.log(this.loginForm.value);
      this.authservice.login(this.loginForm.value).subscribe((res)=>{
        console.log(res);
        if(res.userId !=null){
          const user={
            id:res.id,
            role:res.userRole
          }
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          console.log('User role:', user.role);  
          console.log('Is Admin Logged In:', StorageService.isAdminLoggedIn());  
          console.log('Is Employee Logged In:', StorageService.isEmployeeLoggedIn());
          if(StorageService.isAdminLoggedIn()){
            this.router.navigateByUrl("/admin/dashboard")
          }else if(StorageService.isEmployeeLoggedIn()){
            this.router.navigateByUrl("/employee/dashboard")
          }
          this.snackbar.open("Login successfull","Close",{duration:2000});
        }else{
          this.snackbar.open("Invalid Credentials","Close",{duration:2000,panelClass:"error-snackbar"});
        }
      })
    }
}
