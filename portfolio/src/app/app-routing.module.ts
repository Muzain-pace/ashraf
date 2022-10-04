import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { Form2Component } from './form/form2/form2.component';
import { GetOneComponent } from './get-one/get-one.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { SubtopperComponentComponent } from './view-result/subtopper-component/subtopper-component.component';
import { TopperComponentComponent } from './view-result/topper-component/topper-component.component';
import { ViewResultComponent } from './view-result/view-result.component';

const routes: Routes = [
  {path:'result',component:ResultComponent},
  {path:'viewResult',component:ViewResultComponent},
  {path:'',component:HomeComponent},
  {path:'viewResult/topper',component:TopperComponentComponent},
  {path:'viewResult/subtopper',component:SubtopperComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
