import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ActiveTasksComponent } from '../active-tasks/active-tasks.component';
import { CompletedTasksComponent } from '../completed-tasks/completed-tasks.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { EditGuard } from 'src/app/guards/edit.guard';

const routes: Routes = [
    {
        path: 'new',
        title: 'Todo - New Task',
        component: NewTaskComponent,
    },
    {
        path: 'active',
        title: 'Todo - Active Tasks',
        component: ActiveTasksComponent,
    },
    {
        path: 'completed',
        title: 'Done - Completed Tasks',
        component: CompletedTasksComponent,
    },
    {
        path: 'edit',
        title: 'Todo - Edit Task',
        component: EditTaskComponent,
        canActivate: [EditGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'active'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
