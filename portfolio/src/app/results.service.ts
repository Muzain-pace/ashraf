import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sem, Sub} from './results';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http:HttpClient) { }

  headers:any;
  postSem(newData:any){

    this.headers = new Headers();
    this.headers.append('Content-Type','application/json');
    return this.http.post<any>('http://localhost:3000/api/sem',newData,{headers:this.headers});
  }
  //get available sem
  getSem():Observable<Sem[]>{
    return  this.http.get<any>('http://localhost:3000/api/getSem');
  }

  postSub(newData:any){
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json');
    return this.http.post<any>('http://localhost:3000/api/sub',newData,{headers:this.headers});
  }

  postStudent(newData:any){
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json');
    return this.http.post<any>('http://localhost:3000/api/student',newData,{headers:this.headers});
  }
  postMarks(newData:any){
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json');
    return this.http.post<any>('http://localhost:3000/api/marks',newData,{headers:this.headers});
  }

  getSub():Observable<Sub[]>{
    return  this.http.get<any>('http://localhost:3000/api/Subjectdetails');
  }


  //get student wise topper
  getTopper():Observable<any[]>{
    return this.http.get<any>('http://localhost:3000/api/getStudentTopper');
  }
  //get subject wise topper
  getSubTopper():Observable<any[]>{
    return this.http.get<any>('http://localhost:3000/api/getSubTopper');
  }
  //get subject wise faile students
  getSubFail():Observable<any[]>{
    return this.http.get<any>('http://localhost:3000/api/subfailure');
  }

}
