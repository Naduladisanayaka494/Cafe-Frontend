// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { SnackbarService } from './snackbar.service';
// import jwt_decode from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// export class RouteGuardService {

//   constructor(public auth:AuthService,private SnackbarService:SnackbarService,private router:Router) { }

//   canActive(route:ActivatedRouteSnapshot){
//     let exceptedRoleArray= route.data;
//     exceptedRoleArray =exceptedRoleArray.expectedRole;

//     const token:any=localStorage.getItem('token');
//     var tokenPayload:any;
//     try{
//       tokenPayload=jwt_decode('token')
//     }catch{
//       localStorage.clear()
//       this.router.navigate(['/'])
//     }
//     let checkRole=false

//     // for(let i=0;i<expectedRoleArray.length;i++){
//     //   if(expectedRoleArray[i]==tokenPayload.role){
//     //     checkRole=true;
//     //   }
//     // }
//     if(tokenPayload.role=='user'|| tokenPayload.role=='admin'){}
//     else{
//       this.router.navigate(['/']);
//       localStorage.clear();
//       return false;
//     }


//   }
// }
