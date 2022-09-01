import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TaskLayoutComponent } from './components/task-layout/task-layout.component';
//import { TaskRoutingModule } from './components/task-layout/task-routing.module';
//import { TaskLayoutModule } from './components/task-layout/task-layout.module';

const routes: Routes = [
  {
    path: 'task',
    component: TaskLayoutComponent,
    loadChildren: () => import('./components/task-layout/task-layout.module').then(m => m.TaskLayoutModule)
    //loadChildren: () => TaskRoutingModule
    //loadChildren: () => TaskLayoutModule
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'task/active'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
