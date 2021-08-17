import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AdminModulesService } from 'src/app/services/admin-modules.service';
import Swal from 'sweetalert2';
declare var $:any;
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [DatePipe]
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
              public datepipe: DatePipe,
              private formBuilder:FormBuilder) {
                this.addUserForm = this.formBuilder.group({
                  id:[''],
                  username:['',Validators.required],
                  password:['',Validators.required],
                  user_email:['',Validators.required],
                  user_phone:['',Validators.required],
                  employee_id:['',Validators.required],
                  date_of_reg:['',Validators.required],
                  profile_img:['',Validators.required],
                  user_type:['',Validators.required],
                  user_status:['',Validators.required]
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
      console.log(response);
      let count = response['Data'];
      count = count.length;
      count = count + 1;
      let temp = "EMP"+count;
      console.log(temp);
      let date =  this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      this.addUserForm.controls['employee_id'].setValue(temp);
      this.addUserForm.controls['user_status'].setValue("True");
      this.addUserForm.controls['employee_id'].disable();
      this.addUserForm.controls['user_status'].disable();
      this.addUserForm.controls['date_of_reg'].setValue(date);
      this.addUserForm.controls['date_of_reg'].disable();
      this.addUserForm.controls['user_type'].setValue("1");
      


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
    let count = this.UserList.length;
    count = count + 1;
    let temp = count;
    console.log(temp);
    let date =  this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.addUserForm.controls['date_of_reg'].setValue(date);
    this.addUserForm.controls['employee_id'].setValue(+temp);
    this.addUserForm.value.employee_id = temp;
    console.log(this.addUserForm.value);
    this.adminService.createUser(this.addUserForm.value).subscribe(data=>{
      const response:any = data;
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
        username : data.username,
        password : data.password,
        user_email : data.user_email,
        user_phone : data.user_phone,
        employee_id : data.employee_id,
        date_of_reg : data.date_of_reg,
        profile_img : data.profile_img,
        user_type : data.user_type,
        user_status : data.user_status       
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
    this.adminService.updateUser(this.addUserForm.value).subscribe(data=>{
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
    this.adminService.getUserList().subscribe(async data=>{
      const response:any = data;
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
