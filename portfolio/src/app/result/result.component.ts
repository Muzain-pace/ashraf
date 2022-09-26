import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';

import { DropdownModule } from 'primeng/dropdown';

import { PrimeNGConfig } from 'primeng/api';
import { ResultsService } from '../results.service';
import { MessageService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { AnimateTimings } from '@angular/animations';
import { async, lastValueFrom, Observable, Subject } from 'rxjs';

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

  submitload = false; //this flag is used when file is uploading....
  // upload the excel file
  uploadedData: any; //uploadedData contains worksheet1
  subjectData: any; //subjectData conatains worksheet2
  viewresult = false;
  UploadFile(event: any) {
    // when file uploaded this function is called
    // console.log(event.files[0]);
    this.submitload = true;

    let file = event.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = async(e) => {
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

      //this function is used to add subjects in subject table 
      (await this.AddSub(this.SemObjId, this.subjectData)).subscribe((data)=>{console.log(data);})
      
      //this function is used to add marks details for corresponding student
      this.AddStudent(this.SemObjId, this.uploadedData).then(
        (result)=>{
          console.log("Hey Done ......................................................");
          this.viewresult = true;
          this.messageService.clear('duplicate');
          this.messageService.add({life:600000,key:'success-added',severity:'success', summary:'Successfully added', detail:'Confirm to proceed'});
          this.submitload = false;
        }
      ); //to add details of students like marks,usn,name,percentage etc

    };
  }
  Subjects: Array<sub_interface> = []; // Array conataining the subject details (subject:subject code)

  async AddSub(SemObjId: any, subjectData: any) {
    return new Observable((res)=>{
      for (var subname in subjectData[0]) {
      let subobj = {
        semId: SemObjId,
        subcode: subjectData[0][subname],
        subject: subname,
      };

      // let arg = lastValueFrom(this.ResultsService.postSub(subobj))

      this.ResultsService.postSub(subobj).subscribe((arg) => {
        console.log(arg);
        this.Subjects.push(arg._id);
      });
      // this.Subjects.push(arg._id);
    }
    res.next(true);
    })
    
  }

  AddStudent(semId: any, uploadedData: any) {
    return new Promise((res)=>{
      // let id = 0;
      // for(let j=0; j<uploadedData.length; j++){
      //   let percent = Number(uploadedData[j]['Percentage']);
      //   // console.log(percent);
      //   let stdobj = {
      //     semId: semId,
      //     name: uploadedData[j]['NAME'],
      //     usn: uploadedData[j]['USN'],
      //     totalmarks: uploadedData[j]['Total'],
      //     percentage: percent,
      //   };
      //   const arg = await lastValueFrom(this.ResultsService.postStudent(stdobj));        

      //   this.AddMarks(this.SemObjId,arg._id,this.Subjects,this.uploadedData,j);
      // }
      // res(true);


     let parr = new Array();
      uploadedData.forEach(async (_data: any, j: any) => {
        // id = j;
        let percent = Number(uploadedData[j]['Percentage']);
        // console.log(percent);
        let stdobj = {
          semId: semId,
          name: uploadedData[j]['NAME'],
          usn: uploadedData[j]['USN'],
          totalmarks: uploadedData[j]['Total'],
          percentage: percent,
        };
        const arg = await lastValueFrom(this.ResultsService.postStudent(stdobj));        

        parr.push(this.AddMarks(this.SemObjId,arg._id,this.Subjects,this.uploadedData,j));
        Promise.all(parr).then(()=>{
          res(true);
        });
      });
      
    })    
  }

   AddMarks(semId: any,StdId: any,Subjects: any[],uploadedData: any,idx: any) {
    return new Promise(async(res)=>{
      
      console.log('Hello' + idx);
      const subdetails = await lastValueFrom(this.ResultsService.getSub());      
      Subjects.forEach(async (subid, j) => {
        let key: any;
        for (let i = 0; i < subdetails.length; i++) {
          if (subid == subdetails[i]._id) {
            key = subdetails[i].subject;
            let marksobj = {
              semId: semId,
              subId: subid,
              studentId: StdId,
              ia: uploadedData[idx][String(key) + '_IA'],
              ea: uploadedData[idx][String(key) + '_EA'],
              totalMarksPerSubject: uploadedData[idx][key],
            };
            const arg = await lastValueFrom(this.ResultsService.postMarks(marksobj));
            res(true);
            break;
          }
      }
    });
    console.log('...............');
    })
    
  }
  //Add sem
  uploadFile = false; //this is flag to show the upload button

  SemObjId: any;
  spinnerload = false;
  AddSem(data: any) {
    //when Add button is clicked this function is called
    this.spinnerload = !this.spinnerload;

    console.log(data.form.value); //ex:{  sem : 2 }
    let semObj = data.form.value;
    let isSemavailable = true;

    this.ResultsService.getSem().subscribe({
      next: (data) => {
        data.forEach((element) => {
          if (element.sem == semObj.sem) {
            console.log('Duplicate.....');
            console.log(element);
            isSemavailable = false;
            this.messageService.add({key:'duplicate',severity: 'error',summary: 'Error',detail: 'cannot add duplicate Sem'});
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
        this.spinnerload = !this.spinnerload;
      },
      error: (e) => console.error(e),
    });
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
