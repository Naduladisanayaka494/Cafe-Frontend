import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { GlobalConstants } from '../../../shared/global.constant';
import { filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
 onAddCategory =new EventEmitter();
 onEditCategory =new EventEmitter();
 categoryForm:any= FormGroup;
 dialogAction:any="Add";


  constructor(private categoryService:CategoryService,private ngxService:NgxUiLoaderService,private dialog:MatDialog,private snacbarService:SnackbarService,private router:Router) { }

  ngOnInit() {
    this.ngxService.start()

  }
 

}
