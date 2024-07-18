import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

  id:number;

  updatedTaskForm!: FormGroup;
  listOfEmployees:any=[];
  listOfPriorities:any=["LOW","MEDIUM","HIGH"]
  listOfTaskStatus:any=["PENDING","INPROGRESS","COMPLETED","DEFERRED","CANCELLED"]
  
  constructor(private servive:AdminService,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private adminService:AdminService,
    private snackbar:MatSnackBar,
    private router:Router
  ) {
    this.id=this.route.snapshot.params["id"];
    this.getTaskById();
    this.getUsers();
    this.updatedTaskForm=this.fb.group({
      employeeId: [null,[Validators.required]],
      title: [null,[Validators.required]],
      description: [null,[Validators.required]],
      dueDate: [null,[Validators.required]],
      priority: [null,[Validators.required]],
      taskStatus: [null,[Validators.required]],   
    })
  }

  getTaskById(){
    this.servive.getTaskById(this.id).subscribe((res)=>{
      this.updatedTaskForm.patchValue(res);
      console.log(res);
    })
  }

  getUsers(){
    this.adminService.getUsers().subscribe((res)=>{
      this.listOfEmployees=res
      console.log(res); 
    })
  }

  updateTask(){
    console.log(this.updatedTaskForm.value);
    this.adminService.updateTask(this.id,this.updatedTaskForm.value).subscribe((res)=>{
      if(res.id !=null){
        this.snackbar.open("Task updated successfully","Close",{duration:2000});
        this.router.navigateByUrl("/admin/dashboard");
      }else{
        this.snackbar.open("Something went wrong","Error",{duration:2000});
      }
    })
    
  }


}
