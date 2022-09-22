import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';

import { DropdownModule } from 'primeng/dropdown';

import { PrimeNGConfig } from 'primeng/api';
import { ResultsService } from '../results.service';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { AnimateTimings } from '@angular/animations';
import { async, lastValueFrom, Subject } from 'rxjs';

interface Sem {
  name: string;
  code: number;
}
interface sub_interface {
  subId: string;
  id: number;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [MessageService],
})
export class ResultComponent implements OnInit {
  sem: Sem[];
  constructor(
    private primengConfig: PrimeNGConfig,
    private ResultsService: ResultsService,
    private messageService: MessageService
  ) {
    this.sem = [
      { name: 'I', code: 1 },
      { name: 'II', code: 2 },
      { name: 'III', code: 3 },
      { name: 'IV', code: 4 },
      { name: 'V', code: 5 },
      { name: 'VI', code: 6 },
      { name: 'VII', code: 7 },
      { name: 'VIII', code: 8 },
    ];
  }
  selectedSem: number = 0;



  
 

  // upload the excel file
  uploadedData: any; //uploadedData contains worksheet1
  subjectData: any; //subjectData conatains worksheet2
  async UploadFile(event: any) {   // when file uploaded this function is called
   
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

     fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, {
        type: 'binary',
        sheetRows: 0,
      });
      var sheetnames = workbook.SheetNames;
      this.uploadedData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetnames[0]]
      );
      this.subjectData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetnames[1]]
      );

      console.log(this.uploadedData);
      console.log(this.subjectData);
      this.AddSub(this.SemObjId, this.subjectData); // to add the subject details of applied sem (subject and cubject code
    };
  }

  Subjects:Array<sub_interface> = []; // Array conataining the subject details (subject:subject code)

 async AddSub(SemObjId: any, subjectData: any) {
    for (var subname in subjectData[0]) {
      let subobj = {
        "semId":SemObjId,
        "subcode":subjectData[0][subname],
        "subject":subname
      }
      this.ResultsService.postSub(subobj).subscribe((arg) => {
        console.log(arg);
        this.Subjects.push(arg._id);
      });
  
    }
   this.AddStudent(this.SemObjId,this.uploadedData); //to add details of students like marks,usn,name,percentage etc
  }
 AddStudent(semId:any,uploadedData:any){
      uploadedData.forEach(async (_data:any,j:any) => {
        let percent = Number(uploadedData[j]["Percentage"]);
        // console.log(percent);
        let stdobj = {
          "semId":semId,
          "name":uploadedData[j]["NAME"],
          "usn":uploadedData[j]["USN"],
          "totalmarks":uploadedData[j]["Total"],
          "percentage":percent
        }
       const arg = await lastValueFrom(this.ResultsService.postStudent(stdobj));
        this.AddMarks(this.SemObjId,arg._id,this.Subjects,this.uploadedData);
      });

     
      

  }
    async AddMarks(semId:any,StdId:any,Subjects:any[],uploadedData:any){
    console.log("Hello");
    
    // console.log(typeof(subdetails));
    // console.log(subdetails[0]);
    
    Subjects.forEach(async (subid,j) => {
      let key:any;
      const subdetails = await lastValueFrom(this.ResultsService.getSub());
      subdetails.forEach( (indx) => {
        if(subid == indx._id){ 
          key = indx.subject;
          //  let stdobj = {
          //   "semId":semId,
          //   "subId":subid[j],
          //   "studentId":StdId,
          //   "totalMarksPerSubject":uploadedData[j][key]
          //  }
          //   const arg = await lastValueFrom(this.ResultsService.postStudent(stdobj));
        }
      });
      
      // console.log("stdid "+StdId + " subid " +sub )
      console.log(subid+" "+key+" "+ uploadedData[j][key]);
     
    });
    console.log("...............")  
  }




  //Add sem
  uploadFile = false; //this is flag to show the upload button

  SemObjId: any;
  AddSem(data: any) {  //when Add button is clicked this function is called
    console.log(data.form.value);  //ex:{  sem : 2 }
    let semObj = data.form.value; 
    let isSemavailable = true;

    this.ResultsService.getSem().subscribe({
      next: (data) => {
        data.forEach((element) => {
          if (element.sem == semObj.sem) {
            console.log('Duplicate.....');
            console.log(element);
            isSemavailable = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'cannot add duplicate Sem',
            });
            return;
          }
        });
        if (isSemavailable) {
          this.ResultsService.postSem(semObj).subscribe((arg) => {
            this.SemObjId = arg._id;
            console.log('Added Sem to db ..' + arg._id);
          });
          this.uploadFile = true;
        }
      },
      error: (e) => console.error(e),
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
