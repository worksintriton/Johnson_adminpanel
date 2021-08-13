import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModulesService } from 'src/app/services/admin-modules.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
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
                  id:[''],
                  User_name:['',Validators.required],
                  created_at:['',Validators.required],
                  created_by:['',Validators.required],
                  modified_at:['',Validators.required],
                  modified_by:['',Validators.required],
                });
               }

  ngOnInit(): void {

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

    this.adminService.getUserList().subscribe(async data=>{
      const response:any = data;
      if (response['success']) {
        this.UserList = await response['data'];
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
    this.adminService.createUser(this.addUserForm.value).subscribe(data=>{
      const response:any = data;
      if (response['success']) {
        this.showSuccess(response['msg']);
        this.cancel();
      } else {
        this.showError(response['msg']);
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
        id: data.id,
        User_name: data.User_name,
        created_at: data.created_at,
        created_by: data.created_by,
        modified_at: data.modified_at,
        modified_by: data.modified_by,
      });
      $('.addUser').modal('show');
      this.selectedData_ID =  data.id;
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
    this.adminService.deleteUser(this.selectedData_ID).subscribe(data=>{
      const response:any = data;
      if (response['success']) {
        this.showSuccess(response['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showError(response['msg']);
      }
    });
  }

  updateUser(){
    this.dataLoaded = false;
    this.adminService.updateUser(this.addUserForm.value).subscribe(data=>{
      const response:any = data;
      if (response['success']) {
        this.showSuccess(response['msg']);
        this.cancel();
        this.selectedData_ID = null;
      } else {
        this.showSuccess(response['msg']);
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
    this.adminService.getUserList().subscribe(async data=>{
      const response:any = data;
      if (response['success']) {
        this.UserList = await response['data'];
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
