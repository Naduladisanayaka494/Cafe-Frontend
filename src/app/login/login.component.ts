import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { MatDialogRef } from "@angular/material/dialog";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { SnackbarService } from "../services/snackbar.service";
import { GlobalConstants } from '../shared/global.constant';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarservice: SnackbarService
  ) {}

  ngOnInit() {
    this.loginForm=this.formbuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]]

    })

  }

  handleSubmit(){
    this.ngxService.start()
    var formData=this.loginForm.value

    var data={
      email:formData.email,
      password:formData.password
    }
    console.log(data)
    this.userService.login(data).subscribe((res:any)=>{
      console.log(res)
      this.ngxService.stop();
      this.dialogRef.close();
      localStorage.setItem('token',res.token);
      this.router.navigate(['/cafe/dashboard']);
    },(error)=>{
      this.ngxService.stop();
      console.log("h")
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snackbarservice.openSnackBar(this.responseMessage,GlobalConstants.genericError);
    }
      )
  }
}
