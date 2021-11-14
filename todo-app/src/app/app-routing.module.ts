import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {path:'list', component:ListComponent},
  {path:'create', component:CreateComponent},
  {path:'view', component:ViewComponent},
  {path:'delete', component:CreateComponent},
  {path:'**', component:ListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
