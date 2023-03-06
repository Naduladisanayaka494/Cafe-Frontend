import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global.constant';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  responseMessage:any;
  data:any;

	ngAfterViewInit() { }

	constructor(private dashboardService:DashboardService,private ngxService:NgxUiLoaderService,private SnackbarService:SnackbarService) {
    this.ngxService.start()
    this.dashboard()
	}

  dashboard(){
    this.dashboardService.getDetails().subscribe((res:any)=>{
      this.ngxService.stop();
      this.data=res
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error)
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }else{
        this.responseMessage=GlobalConstants.genericError
      }
      this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.genericError)

    }
    )
  }
}
