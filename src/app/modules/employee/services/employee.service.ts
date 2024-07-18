import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASE_URL="https://task-management-system.up.railway.app/"

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { 

  }

  getEmployeeTaskById():Observable<any>{
    return this.http.get(BASE_URL+"api/employee/tasks",{
       headers:this.createAuthorizationHeader()
     })
   }
  
  
   updateStatus(id:number,status:string):Observable<any>{
    return this.http.get(BASE_URL+`api/employee/task/${id}/${status}`,{
       headers:this.createAuthorizationHeader()
     })
   }


   getTaskHistoryy(taskId: number): Observable<any> {
    return this.http.get(BASE_URL + `api/employee/history/${taskId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization','Bearer '+StorageService.getToken()
    )
  }
  
}
