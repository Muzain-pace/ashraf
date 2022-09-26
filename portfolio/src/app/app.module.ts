import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';





import { AppComponent } from './app.component';
import { SlidesComponent } from './slides/slides.component';
import { FormComponent } from './form/form.component';
import { MatInputModule } from '@angular/material/input';   
import {MatButtonModule} from '@angular/material/button';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signup/signin/signin.component';
import { Form2Component } from './form/form2/form2.component';  


import {MessageService} from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/accordion'; 


import {SkeletonModule} from 'primeng/skeleton';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import { GetOneComponent } from './get-one/get-one.component';

import {ButtonModule} from 'primeng/button';
import { ResultComponent } from './result/result.component';

import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';

import {FileUploadModule} from 'primeng/fileupload';
import { ViewResultComponent } from './view-result/view-result.component';

// i addded from here 
import {MatCardModule} from '@angular/material/card'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import { MatIconModule} from '@angular/material/icon'; 
import {MatSelectModule} from '@angular/material/select'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent, 
    SlidesComponent,
    FormComponent,
    SignupComponent,
    SigninComponent,
    Form2Component,
    GetOneComponent,
    ResultComponent,
    ViewResultComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    AccordionModule,
    SkeletonModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    RippleModule,
    FileUploadModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
