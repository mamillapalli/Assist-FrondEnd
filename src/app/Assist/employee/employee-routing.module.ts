import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./employee.component";
import {LeaverequestComponent} from "./leaverequest/leaverequest.component";

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: 'leave',
        component: LeaverequestComponent,
      },
      { path: '', redirectTo: 'leave', pathMatch: 'full' },
      { path: '**', redirectTo: 'leave', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
