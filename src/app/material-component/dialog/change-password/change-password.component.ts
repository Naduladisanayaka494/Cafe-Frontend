import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../../services/snackbar.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { GlobalConstants } from '../../../shared/global.constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:any=FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,private userService:UserService,public dialogref:MatDialogRef<ChangePasswordComponent>,private ngxService:NgxUiLoaderService,private SnackbarService:SnackbarService) { }

  ngOnInit(){
    this.changePasswordForm=this.formBuilder.group({
      oldPassword:[null,[Validators.required]],
      newPassword:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],



    })

   

  }

  validateSubmitButton(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
      return true;

    }else{
      return false
    }
  }
 
  handleChanged(){
    this.ngxService.start()
    var formData=this.changePasswordForm.value
    var data={
      oldPassword:formData.oldPassword,
      newPassword:formData.newPassword,
      confirmPassword:formData.confirmPassword,

    }
    this.userService.changePassword(data).subscribe((res:any)=>{
      this.ngxService.stop();
      this. responseMessage = res?.message;
      this.dialogref.close();
      this.SnackbarService.openSnackBar(this.responseMessage,"success");
     

    },(error)=>{
      console.log(error);
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.SnackbarService.openSnackBar(this.responseMessage,GlobalConstants.genericError)
    })
  }


}
