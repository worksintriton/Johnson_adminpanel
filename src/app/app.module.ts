import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './admin-modules/user-management/user-management.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { LoginpageComponent } from './admin-modules/loginpage/loginpage.component';
import { ForgotpasswordComponent } from './admin-modules/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './admin-modules/dashboard/dashboard.component';
import { UserdetailsComponent } from './admin-modules/userdetails/userdetails.component';
import { StationDetailsComponent } from './admin-modules/station-details/station-details.component';
import { JobNoDetailsComponent } from './admin-modules/job-no-details/job-no-details.component';
import { FaultTypeDetailsComponent } from './admin-modules/fault-type-details/fault-type-details.component';
import { NotificationDetailsComponent } from './admin-modules/notification-details/notification-details.component';
import { TicketDetailsComponent } from './admin-modules/ticket-details/ticket-details.component';


import {LocationStrategy, HashLocationStrategy} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserManagementComponent,
    LoginpageComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    UserdetailsComponent,
    StationDetailsComponent,
    JobNoDetailsComponent,
    FaultTypeDetailsComponent,
    NotificationDetailsComponent,
    TicketDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgSelectModule,
    AngularEditorModule,
    HttpClientModule,
    NgxPaginationModule,
    FilterPipeModule,
    AutocompleteLibModule,
    CarouselModule,
    DataTablesModule,
    ChartsModule,
    CommonModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
