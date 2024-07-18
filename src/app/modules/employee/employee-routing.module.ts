import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskHistoryComponent } from './components/task-history/task-history.component';

const routes: Routes = [
  {path:"dashboard", component: DashboardComponent},
  { path: "history/:id", component: TaskHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
