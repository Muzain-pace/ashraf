import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { Form2Component } from './form/form2/form2.component';
import { GetOneComponent } from './get-one/get-one.component';
import { ResultComponent } from './result/result.component';
import { SignupComponent } from './signup/signup.component';
import { ViewResultComponent } from './view-result/view-result.component';

const routes: Routes = [
  {path:'home',component:FormComponent},
  {path:'signup-in',component:SignupComponent},
  {path:'home/edit',component:Form2Component},
  {path:'getOne',component:GetOneComponent},
  {path:'',component:ResultComponent},
  {path:'viewResult',component:ViewResultComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
