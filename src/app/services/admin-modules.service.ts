import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminModulesService {

  constructor(private http:HttpClient) { }

  // User MANAGEMENT API LIST STARTS HERE //

  getUserList(){
    return this.http.get(environment.baseurl+'user-management/getlist')
  }

  getUserInfo(id:any){
    return this.http.get(environment.baseurl+'user-management/getby_id/'+id);
  }

  createUser(data:any){
    return this.http.post(environment.baseurl+'user-management/create',data);
  }

  updateUser(data:any){
    return this.http.put(environment.baseurl+'user-management/update/'+data.id,data)
  }

  deleteUser(id:any){
    return this.http.delete(environment.baseurl+'user-management/delete/'+id);
  }

  searchUserList(data:any){
    return this.http.post(environment.baseurl+'user-management/search',data)
  }


  // User MANAGEMENT API LIST ENDEDS HERE //



    // STATION MANAGEMENT API LIST STARTS HERE //

    getstationList(){
      return this.http.get(environment.baseurl+'station_name/getlist')
    }

    getstationInfo(id:any){
      return this.http.get(environment.baseurl+'station_name/getby_id/'+id);
    }

    createstation(data:any){
      console.log(data);
      return this.http.post(environment.baseurl+'station_name/create',data);
    }

    updatestation(data:any){
      console.log(data);
      return this.http.put(environment.baseurl+'station_name/update/'+data.id,data)
    }

    deletestation(id:any){
      console.log(id);
      return this.http.delete(environment.baseurl+'station_name/delete/'+id);
    }

    searchstationList(data:any){
      return this.http.post(environment.baseurl+'station_name/search',data)
    }


    // STATION MANAGEMENT API LIST ENDEDS HERE //



    // JOB NO MANAGEMENT API LIST STARTS HERE //

    getjobnoList(){
      return this.http.get(environment.baseurl+'job_no/getlist')
    }

    getjobnoInfo(id:any){
      return this.http.get(environment.baseurl+'job_no/getby_id/'+id);
    }

    createjobno(data:any){
      console.log(data);
      return this.http.post(environment.baseurl+'job_no/create',data);
    }

    updatejobno(data:any){
      console.log(data);
      return this.http.put(environment.baseurl+'job_no/update/'+data.id,data)
    }

    deletejobno(id:any){
      console.log(id);
      return this.http.delete(environment.baseurl+'job_no/delete/'+id);
    }

    searchjobnoList(data:any){
      return this.http.post(environment.baseurl+'job_no/search',data)
    }


    // JOB NO MANAGEMENT API LIST ENDEDS HERE //



    // FAULT MANAGEMENT API LIST STARTS HERE //

    getfaultList(){
      return this.http.get(environment.baseurl+'fault_type/getlist')
    }

    getfaultInfo(id:any){
      return this.http.get(environment.baseurl+'fault_type/getby_id/'+id);
    }

    createfault(data:any){
      console.log(data);
      return this.http.post(environment.baseurl+'fault_type/create',data);
    }

    updatefault(data:any){
      console.log(data);
      return this.http.put(environment.baseurl+'fault_type/update/'+data.id,data)
    }

    deletefault(id:any){
      console.log(id);
      return this.http.delete(environment.baseurl+'fault_type/delete/'+id);
    }

    searchfaultList(data:any){
      return this.http.post(environment.baseurl+'fault_type/search',data)
    }


    // FAULT MANAGEMENT API LIST ENDEDS HERE //



}
