import { Component, OnInit, ViewChild } from '@angular/core';
import { Scale } from 'chart.js';
import { lastValueFrom } from 'rxjs';
import { ResultsService } from '../results.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NONE_TYPE } from '@angular/compiler';
// for Toppers
let labels1: any[] = [];
let data1: any[] = [];
let datas1: any[] = [];
// for SubjectTopper
let labels2: any[] = [];
let data2: any[] = [];
let datas2: any[] = [];



//this function is used to remove the duplicate element from lables array in graph
function onlyUnique(value:any, index:any, self:any) {
  return self.indexOf(value) === index;
}


@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css'],
})
export class ViewResultComponent implements OnInit {
  options: any;

  constructor(private ResultsService: ResultsService) {}

  btnhidden = false;
  public openPDF(type: string): void {
    this.btnhidden = true;
    setTimeout(() => {
      let DATA: any = document.getElementById('table1');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(type + '.pdf');
      });
      this.btnhidden = false;
    }, 1000);

    // this.btnhidden = true;

    //   constructor(private ResultsService:ResultsService) { }
  }
  TopperObj: any = [];
  SubjectTopperObj: any;
  SubjectFailObj: any = [];
  Failedsubject:any[] = [];

  loader=true;
  async ngOnInit() {
    let semId = localStorage.getItem('semId');
    console.log("sem id ->"+semId)
    this.TopperObj = await lastValueFrom(this.ResultsService.getTopper(localStorage.getItem('semId')));
    this.SubjectTopperObj = await lastValueFrom(
      this.ResultsService.getSubTopper(semId)
    );
    this.SubjectFailObj = await lastValueFrom(
      this.ResultsService.getSubFail(semId)
    );
    for(let i=0; i<this.SubjectFailObj.length; i++){
      if(this.SubjectFailObj[i].length > 0) this.Failedsubject.push(this.SubjectFailObj[i][0].Subject[0].subject);
    }
    
    console.log(this.Failedsubject)
    
    // for Toppers

    this.TopperObj.forEach((e: any, i: string | number) => {
      labels1.push(this.TopperObj[i].usn);
      data1.push(this.TopperObj[i].totalmarks);
      let percentage = parseFloat(this.TopperObj[i].percentage).toFixed(2);
      console.log(percentage);
      datas1.push(percentage);
      console.log(this.TopperObj[i].usn);
    });
    console.log(this.TopperObj);

    

    labels1 = labels1.filter(onlyUnique); //labels1 array sometimes contains duplicate to remove duplicate 



    // For SubjectToppers

    this.SubjectTopperObj.forEach((e: any, i: string | number) => {
      labels2.push(this.SubjectTopperObj[i].Student.usn);
      data2.push(this.SubjectTopperObj[i].totalMarksPerSubject);
    });
    labels2 = labels2.filter(onlyUnique);
    console.log(labels2);


    this.datas11 = {
      labels: labels1,
      datasets: [
        {
          label: 'Topper Marks',
          data: data1,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(2, 117, 216, 0.31)',
        },
        {
          label: 'Percentage',
          data: datas1,
          backgroundColor: '#FFA726',
        },
      ],
    };
    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 20,
      },
      legend: {
        position: 'bottom',
      },
    };

    this.datas22 = {
      labels: labels2,
      datasets: [
        {
          label: 'Subject Toppers',
          data: data2,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(2, 117, 216, 0.31)',
        },
        {
          label: 'Marks',
          data: data2,
          backgroundColor: '#FFA726',
        },
      ],
    };
    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 20,
      },
      legend: {
        position: 'bottom',
      },
    };
    this.loader = false;

  }
  datas11: any;
  datas22: any;
}
