import { Component, OnInit, ViewChild } from '@angular/core';
import { Scale } from 'chart.js';
import { lastValueFrom } from 'rxjs';
import { ResultsService } from '../results.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NONE_TYPE } from '@angular/compiler';
// for Toppers
let labels1:any[]=[];
let data1:any[]=[];
let datas1:any[]=[];
// for SubjectTopper
let labels2:any[]=[];
let data2:any[]=[];
let datas2:any[]=[];




@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

	options: any;
	
  constructor(private ResultsService:ResultsService) {}

  btnhidden = false;
  public openPDF(type:string): void {

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
			PDF.save(type+'.pdf');
	
		});
		this.btnhidden = false;
		
	}, 1000);
	
		
		

	
	
	// this.btnhidden = true;
    

//   constructor(private ResultsService:ResultsService) { }

  }
  TopperObj:any;
  SubjectTopperObj:any;
  SubjectFailObj:any;
  async ngOnInit(){
    let semId = localStorage.getItem("semId");
    this.TopperObj = await lastValueFrom(this.ResultsService.getTopper(semId));
    this.SubjectTopperObj = await lastValueFrom(this.ResultsService.getSubTopper(semId));
    this.SubjectFailObj = await lastValueFrom(this.ResultsService.getSubFail(semId));
// for Toppers

	for(let i=0;i<this.TopperObj.length;i++){
		labels1.push(this.TopperObj[i].usn)
		data1.push(this.TopperObj[i].totalmarks)
		datas1.push(this.TopperObj[i].percentage)
	}
// For SubjectToppers
	for(let i=0;i<this.SubjectTopperObj.length;i++){
		labels2.push(this.SubjectTopperObj[i].Student[0].usn)
		data2.push(this.SubjectTopperObj[i].totalMarksPerSubject)
	}

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
			}
		]
	}
	this.options = {
		title: {
			display: true,
			text: 'My Title',
			fontSize: 20
		},
		legend: {
			position: 'bottom'
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
			}
		]
	}
	this.options = {
		title: {
			display: true,
			text: 'My Title',
			fontSize: 20
		},
		legend: {
			position: 'bottom'
		},
		
	};
	

  }
  datas11 :any;
  datas22 :any;


  }


  

