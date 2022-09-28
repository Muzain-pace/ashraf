import { Component, OnInit } from '@angular/core';
import { Scale } from 'chart.js';
import { lastValueFrom } from 'rxjs';
import { ResultsService } from '../results.service';

let labels:any[]=[];
let data1:any[]=[];
let data2:any[]=[];

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})


export class ViewResultComponent implements OnInit {
	options: any;
  constructor(private ResultsService:ResultsService) {

   }

  TopperObj:any;
  SubjectTopperObj:any;
  SubjectFailObj:any;
  async ngOnInit(){
    this.TopperObj = await lastValueFrom(this.ResultsService.getTopper());
    this.SubjectTopperObj = await lastValueFrom(this.ResultsService.getSubTopper());
    this.SubjectFailObj = await lastValueFrom(this.ResultsService.getSubFail());
	console.log(this.TopperObj)
	for(let i=0;i<this.TopperObj.length;i++){
		labels.push(this.TopperObj[i].usn)
		data1.push(this.TopperObj[i].totalmarks)
		data2.push(this.TopperObj[i].percentage)
	}
	
	this.datas = {
		labels: labels,
		datasets: [
			{
				label: 'Topper Marks',
				data: data1,
				borderColor: '#42A5F5',
				backgroundColor: 'rgba(2, 117, 216, 0.31)',

				
			},
			{
				label: 'Percentage',
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
  




  datas :any;
  selectedUser = null;
	userArray = [
		{
		  uid: '10',
		  age: 22,
		  username: 'John Paul',
		},
		{
		  uid: '11',
		  age: 35,
		  username: 'Peter Jackson',
		},
		{
		  uid: '12',
		  age: 30,
		  username: 'Will Smith',
		},
		{
		  uid: '13',
		  age: 25,
		  username: 'Peter Paul',
		},
		{
		  uid: '14',
		  age: 34,
		  username: 'Johnson Peter',
		},
		{
		  uid: '15',
		  age: 30,
		  username: 'Eric Smidth',
		},
	  ];
}
