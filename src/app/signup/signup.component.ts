import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global.constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any=FormGroup;
  responseMessage:any;

  constructor(private formbuilder:FormBuilder,private router:Router,private UserService:UserService,private snacbar:SnackbarService,private dialogRef:MatDialogRef<SignupComponent>,private ngxservice:NgxUiLoaderService) { }

  ngOnInit() {
    this.signupForm=this.formbuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password:[null,[Validators.required]]
    })
  }

  handleSubmit(){
    this.ngxservice.start();
    var formData= this.signupForm.value;
    var Data ={
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password
    }
    this.UserService.signup(Data).subscribe((res:any)=>{
      this.ngxservice.stop();
      this.dialogRef.close();
      this.responseMessage=res?.message;
      this.snacbar.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);


    },(error)=>{
      this.ngxservice.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.snacbar.openSnackBar(this.responseMessage,GlobalConstants.genericError);
    }


    )
  }

}
