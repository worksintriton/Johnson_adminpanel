import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModulesService } from 'src/app/services/admin-modules.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-fault-type-details',
  templateUrl: './fault-type-details.component.html',
  styleUrls: ['./fault-type-details.component.scss']
})
export class FaultTypeDetailsComponent implements OnInit {
  dtOptions: any = {};
  UserList: any;
  dataLoaded: boolean = false;
  addmode: boolean= false;
  editmode: boolean= false;
  listmode: boolean= false;
  selectedData_ID: any;
  addUserForm: FormGroup;
  countryList: any;
  stateList: any;
  stateList_dup : any;
  deletemode: boolean = false;;

  state_name = '';
  country_name = '';

  constructor(private adminService:AdminModulesService,
              private toastr:ToastrManager,
              private formBuilder:FormBuilder) {
                this.addUserForm = this.formBuilder.group({
                  id: [''],
                  fault_type:['',Validators.required],
                  type:['',Validators.required]
                });
               }

  ngOnInit(): void {

    this.addUserForm.controls['type'].setValue("1");
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering:true,
      lengthMenu : [5, 10, 25, 50, 100]
    };

    this.adminService.getfaultList().subscribe(async data=>{
      const response:any = data;
      console.log(data);
      console.log(response);
      if (response['Status']) {
        this.UserList = await response['Data'];
        this.dataLoaded = true;
      } else {
        this.UserList = [];
      }
    });
  }

  getselected(event:any,i:any){
    console.log(i);
  }

  getallselected(event:any){

  }





  addUser(){
    this.adminService.createfault(this.addUserForm.value).subscribe(data=>{
      const response:any = data;
      console.log(response);
      if (response['Status'] == "Success") {
        this.showSuccess(response['Message']);
        this.cancel();
      } else {
        this.showError(response['Message']);
      }
    })
  }


  validate(id:any){
    if (id != null) {
      $('#deleteModal').modal('show');
      this.selectedData_ID =  id;
      this.addmode = false;
      this.editmode = false;
      this.deletemode = true;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }



  editUser(data:any){
    if (data != null) {
      this.addUserForm.patchValue({
        id: data._id,
        fault_type: data.fault_type,
        type: data.type
      });
      $('.addUser').modal('show');
      this.selectedData_ID =  data._id;
      this.addmode = false;
      this.editmode = true;
      this.deletemode = false;
      this.listmode = false;
    } else {
      this.showWarning("Please Select a Record");
    }
  }


  deleteUser(){
    this.dataLoaded = false;
    this.adminService.deletefault(this.selectedData_ID).subscribe(data=>{
      const response:any = data;
      if (response['Status'] == "Success") {
        this.showSuccess(response['Message']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(response['Message']);
      }
    });
  }

  updateUser(){
    this.dataLoaded = false;
    this.adminService.updatefault(this.addUserForm.value).subscribe(data=>{
      const response:any = data;
      if (response['Status'] == "Success") {
        this.showSuccess(response['Message']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showSuccess(response['Message']);
      }
    });
  }

  cancel(){
    $('#deleteModal').modal('hide');
    $('.addUser').modal('hide');
    this.dataLoaded = false;
    this.addmode = true;
    this.editmode = false;
    this.deletemode = false;
    this.listmode = true;
    this.onPageReload();
  }

  onPageReload(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      ordering:true,
      lengthMenu : [5, 10, 25, 50, 100]
    };
    this.adminService.getfaultList().subscribe(async data=>{
      const response:any = data;
      console.log(data);
      console.log(response);
      if (response['Status']) {
        this.UserList = await response['Data'];
        this.dataLoaded = true;
      } else {
        this.UserList = [];
      }
    });
  }


  showSuccess(msg:any) {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: msg,
    })
  }

  showError(msg:any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: msg,
    })
  }

  showWarning(msg:any) {
    Swal.fire({
      icon: 'warning',
      title: 'Check',
      text: msg,
    })
  }
}
