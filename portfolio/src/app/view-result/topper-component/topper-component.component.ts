import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ResultsService } from 'src/app/results.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

let labels1: any[] = [];
let data1: any[] = [];
let datas1: any[] = [];


@Component({
  selector: 'app-topper-component',
  templateUrl: './topper-component.component.html',
  styleUrls: ['./topper-component.component.css']
})
export class TopperComponentComponent implements OnInit {
  
  constructor(private ResultsService: ResultsService) { }

  btnhidden = false;
  TopperObj:any;
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
  }
  
  options:any;
  async ngOnInit(){
    let semId = localStorage.getItem('semId');
    this.TopperObj = await lastValueFrom(this.ResultsService.getTopper(semId));

    for (let i = 0; i < this.TopperObj.length; i++) {
      labels1.push(this.TopperObj[i].usn);
      data1.push(this.TopperObj[i].totalmarks);
      datas1.push(this.TopperObj[i].percentage);
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

    

  }
  datas11: any;
  datas22: any;

}
