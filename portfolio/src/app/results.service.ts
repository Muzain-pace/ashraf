import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sem, Sub, Batch } from './results';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  constructor(private http: HttpClient) {}
  semId: any;

  headers: any;
  //post batch
  postBatch(newData: any) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<any>('https://vtu-result.glitch.me/api/batch', newData, {
      headers: this.headers,
    });
  }

  getBatch(batch: any): Observable<Batch[]> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    return this.http.get<any>('https://vtu-result.glitch.me/api/getbatch/' + batch);
  }

  postSem(newData: any) {
     this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<any>('https://vtu-result.glitch.me/api/sem', newData, {
      headers: this.headers,
    });
  }
  //get available sem
  getSem(sem: any): Observable<Sem[]> {
    return this.http.get<any>('https://vtu-result.glitch.me/api/getSem/' + sem);
  }

  postSub(newData: any) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<any>('https://vtu-result.glitch.me/api/sub', newData, {
      headers: this.headers,
    });
  }

  postStudent(newData: any) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<any>('https://vtu-result.glitch.me/api/student', newData, {
      headers: this.headers,
    });
  }
  postMarks(newData: any) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<any>('https://vtu-result.glitch.me/api/marks', newData, {
      headers: this.headers,
    });
  }

  getSub(): Observable<Sub[]> {
    return this.http.get<any>('https://vtu-result.glitch.me/api/Subjectdetails');
  }

  //get student wise topper
  getTopper(semId: any): Observable<any[]> {
    return this.http.get<any>(
      'https://vtu-result.glitch.me/api/getStudentTopper/' + semId
    );
  }
  //get subject wise topper
  getSubTopper(semId: any): Observable<any[]> {
    return this.http.get<any>(
      'https://vtu-result.glitch.me/api/getSubTopper/' + semId
    );
  }
  //get subject wise faile students
  getSubFail(semId:any): Observable<any[]> {
    return this.http.get<any>('https://vtu-result.glitch.me/api/subfailure/'+semId);
  }
}
