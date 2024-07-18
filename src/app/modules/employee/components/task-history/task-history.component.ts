import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent implements OnInit {
  taskHistory: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    console.log(taskId);
    this.service.getTaskHistoryy(Number(taskId)).subscribe(history => {
      console.log(history);
      this.taskHistory = history;
    });
  }
}
