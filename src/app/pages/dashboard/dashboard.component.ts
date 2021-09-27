import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminModulesService } from 'src/app/core/services/admin/admin-modules.service';
import { CookieService } from 'src/app/core/services/cookie.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

/**
 * Dashboard component - handling dashboard with sidear and content
 */
export class DashboardComponent implements OnInit {
  icon:any;
  color:any;
  fault_count: any;
  ticketLiftsCount: any;
  ticketElsCount: any;
  numUserLogin: any;
  jonsonCount: any;
  cmrlCount: any;
  iscmrl_user: boolean =false;
  isTicketStatus: boolean =false;
  left_Completed: any;
  left_InCompleted: any;
  left_Close: any;
  left_Open: any;
  ESCALATORS_Completed: any;
  ESCALATORS_InCompleted: any;
  ESCALATORS_Close: any;
  ESCALATORS_Open: any;
 

  constructor(private adminService:AdminModulesService,private router: Router,private cookieService: CookieService)
  {
    //  if(!JSON.parse(this.cookieService.getCookie('currentUser'))){
    //   this.router.navigate(['./']);
    //  }
   }

 ngOnInit() {
  this.getAllDasboardDetails();
 }

 getAllDasboardDetails(){
   this.adminService.getAllDasboardDetails().pipe()
   .subscribe( data => {
       console.log("data ",data); 
       this.fault_count = data['Data'].fault_count;
       this.ticketLiftsCount = data['Data'].ticketLiftsCount;
       this.ticketElsCount = data['Data'].ticketElsCount;
       this.numUserLogin = data['Data'].numUserLogin;
       this.jonsonCount = data['Data'].jonsonCount;
       this.cmrlCount = data['Data'].cmrlCount;


       this.left_Completed = data['Data'].left_Completed
       this.left_InCompleted = data['Data'].left_InCompleted;
       this.left_Close = data['Data'].left_Close
       this.left_Open = data['Data'].left_Open;

       this.ESCALATORS_Completed = data['Data'].ESCALATORS_Completed
       this.ESCALATORS_InCompleted = data['Data'].ESCALATORS_InCompleted;
       this.ESCALATORS_Close = data['Data'].ESCALATORS_Close
       this.ESCALATORS_Open = data['Data'].ESCALATORS_Open;
     
     
     },error => {
      
     });
 }

 userStatus(status){
   if(status == "Lifts"){
    this.iscmrl_user = true;
    this.isTicketStatus = false;
   }
   else if(status == "Escalators"){
    this.iscmrl_user = false;
    this.isTicketStatus = true;
   }else{
    this.iscmrl_user = false;
    this.isTicketStatus = false;
   }
 
 }

}
