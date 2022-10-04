import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { lastValueFrom } from 'rxjs';
import { ResultsService } from 'src/app/results.service';


let labels2: any[] = [];
let data2: any[] = [];
let datas2: any[] = [];


@Component({
  selector: 'app-subtopper-component',
  templateUrl: './subtopper-component.component.html',
  styleUrls: ['./subtopper-component.component.css']
})
export class SubtopperComponentComponent implements OnInit {

  constructor(private ResultsService:ResultsService) { }


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

  options:any;
  SubjectTopperObj:any;
  async ngOnInit(){
    let semId = localStorage.getItem('semId');
    this.SubjectTopperObj = await lastValueFrom(
      this.ResultsService.getSubTopper(semId)
    );
    
    for (let i = 0; i < this.SubjectTopperObj.length; i++) {
      labels2.push(this.SubjectTopperObj[i].Student[0].usn);
      data2.push(this.SubjectTopperObj[i].totalMarksPerSubject);
      datas2.push(this.SubjectTopperObj[i].percentage);

    }

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
          data: datas2,
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
  datas22: any;
}
