import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StationDetailsModule } from './station-details/station-details.module';
import { JobNoDetailsModule } from './job-no-details/job-no-details.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { FaultTypeDetailsModule } from './fault-type-details/fault-type-details.module';
import { TicketDetailsModule } from './ticket-details/ticket-details.module';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { NotificationDetailsModule } from './notification-details/notification-details.module';
import { ViewTicketDetailsComponent } from './view-ticket-details/view-ticket-details.component';
import { ViewTicketDetailsModule } from './view-ticket-details/view-ticket-details.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    StationDetailsModule,
    JobNoDetailsModule,
    UserDetailsModule,
    FaultTypeDetailsModule,
    TicketDetailsModule,
    NotificationDetailsModule,
    ViewTicketDetailsModule,
    CommonModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    NgbDropdownModule,
    UIModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
