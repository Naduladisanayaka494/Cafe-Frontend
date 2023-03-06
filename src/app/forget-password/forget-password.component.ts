import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global.constant';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm:any= FormGroup;
  responseMessage:any;

  constructor(private formBuilder: FormBuilder,private userService:UserService,private dialogRef:MatDialogRef<ForgetPasswordComponent>,private ngxService:NgxUiLoaderService,private snacbarService:SnackbarService,) { }

  ngOnInit() {
    this. forgotPasswordForm = this. formBuilder .group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]

    })
  }

  submit(){
    this.ngxService.start();
    var formData=this.forgotPasswordForm.value;
    var data={
      email:formData.email
    }
    this.userService.forgotPassword(data).subscribe((res:any)=>{
      this.ngxService.stop()
      this.responseMessage=res?.message
      this.dialogRef.close();
      this.snacbarService.openSnackBar(this.responseMessage,"");
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message

      }else{
        this.responseMessage=GlobalConstants.genericError
      }
      this.snacbarService.openSnackBar(this.responseMessage,GlobalConstants.genericError)
    }
    )
  }

}
