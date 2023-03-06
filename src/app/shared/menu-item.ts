import { Injectable } from "@angular/core";


export interface Menu{
  state:string;
  name:string;
  icon:string;
  role:string;


}

const MENUITEMS =[
  {state:'dashboard',name:'Dashboard',icon:'dasboard',role:''},
  {state:'category',name:'Category',icon:'category',role:'admin'}
];

@Injectable()
export class MenuItems{
  getMenuitem(): Menu []{
    return MENUITEMS;

  }
}
