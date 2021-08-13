import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-modules/dashboard/dashboard.component';
import { FaultTypeDetailsComponent } from './admin-modules/fault-type-details/fault-type-details.component';
import { ForgotpasswordComponent } from './admin-modules/forgotpassword/forgotpassword.component';
import { JobNoDetailsComponent } from './admin-modules/job-no-details/job-no-details.component';
import { LoginpageComponent } from './admin-modules/loginpage/loginpage.component';
import { NotificationDetailsComponent } from './admin-modules/notification-details/notification-details.component';
import { StationDetailsComponent } from './admin-modules/station-details/station-details.component';
import { TicketDetailsComponent } from './admin-modules/ticket-details/ticket-details.component';
import { UserManagementComponent } from './admin-modules/user-management/user-management.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},

  {path:'login',component: LoginpageComponent},
  {path:'forgot_password',component: ForgotpasswordComponent},



  {path:'admin',component:AdminComponent,children:[
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'user-management',component:UserManagementComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'station_detail',component:StationDetailsComponent},
    {path:'jobno_detail',component:JobNoDetailsComponent},
    {path:'ticket_detail',component:TicketDetailsComponent},
    {path:'notification_detail',component:NotificationDetailsComponent},
    {path:'fault_detail',component:FaultTypeDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
