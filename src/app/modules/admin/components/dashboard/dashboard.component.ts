import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { title } from 'process';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTask:any =[];
  searchForm!:FormGroup;

  constructor(private service:AdminService,
    private snackbar:MatSnackBar,
    private fb:FormBuilder
  ) {
    this.getTasks();
    this.searchForm=this.fb.group({
      title:[null]
    })
  }

  getTasks(){
    this.service.getAllTasks().subscribe((res)=>{
      this.listOfTask=res;
    })
  }

  deleteTask(id:number){
    this.service.deleteTask(id).subscribe((res)=>{
        this.snackbar.open("Task deleted successfully","close",{duration:2000});
        this.getTasks();
    })
  }

  searchTask(){
    this.listOfTask=[];
    const title=this.searchForm.get('title')!.value;
    console.log(title);
    if(title==''){
      location.reload();
    }
    this.service.searchTask(title).subscribe((res)=>{
      console.log(res);
      this.listOfTask=res;
    })
    
  }

  exportToCSV() {
    const csvData = this.listOfTask.map((task: { title: any; description: any; dueDate: string | number | Date; employeeName: any; priority: any; taskStatus: any; }) => ({
      Title: task.title,
      Description: task.description,
      DueDate: new Date(task.dueDate).toLocaleDateString(),
      Employee: task.employeeName,
      Priority: task.priority,
      Status: task.taskStatus
    }));

    const csvContent = this.convertToCSV(csvData);
    this.downloadCSV(csvContent, 'Tasks.csv');
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).map(value => `"${value}"`).join(',')).join('\n');
    return `${header}\n${rows}`;
  }

  downloadCSV(csvContent: string, fileName: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
