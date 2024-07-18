import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfTasks:any=[];

  constructor(private service:EmployeeService,
    private snackbar:MatSnackBar
  ){
    this.getTasks();
  }

  getTasks(){
    this.service.getEmployeeTaskById().subscribe((res)=>{
      console.log(res);
      this.listOfTasks=res;
    })
  }

  updateStatus(id:number,status:string){
    this.service.updateStatus(id,status).subscribe((res)=>{
      if(res.id!=null){
        this.snackbar.open("Task Status updates successfully","Close",{duration:2000});
        this.getTasks();
      }else{
        this.snackbar.open("Getting error while updating task..","Close",{duration:2000});
      }
    })
  }

  exportToCSV() {
    const csvData = this.listOfTasks.map((task: { title: any; description: any; dueDate: string | number | Date; employeeName: any; priority: any; taskStatus: any; }) => ({
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
