import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global.constant';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns:string[]=['name','edit'];
  dataSource:any;
  dataSourcetwo:any;
  responseMessage:any;

  constructor(private categoryService:CategoryService,private ngxService:NgxUiLoaderService,private dialog:MatDialog,private snacbarService:SnackbarService,private router:Router) { }

  ngOnInit() {
    this.ngxService.start()
    this.tabledata()
  }
  tabledata(){
    this.categoryService.getcategories().subscribe((res:any)=>{
      this.ngxService.stop();
      this.dataSource=res
      this.dataSourcetwo= new MatTableDataSource(res)

      console.log(this.dataSource)
      console.log( this.dataSourcetwo)
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalConstants.genericError
      }
      this.snacbarService.openSnackBar(this.responseMessage,GlobalConstants.genericError)
    })

  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcetwo.filter=filterValue.trim().toLowerCase()
  }

  handleAction(){

  }

  handleEditAction(value:any){

  }

}
