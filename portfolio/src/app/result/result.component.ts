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
import { Router } from '@angular/router';

interface Sem {
  name: string;
  code: number;
  
}
interface Batch{
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
  batch: Batch[];
  constructor(
    private primengConfig: PrimeNGConfig,
    private ResultsService: ResultsService,
    private messageService: MessageService,
    private router: Router
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
    this.batch = [
      { name: '2018', code: 2018 },
      { name: '2019', code: 2019 },
      { name: '2020', code: 2020 },
    ];
  }
  selectedBatch: number =0;
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
    console.log('size', file.size);
    console.log('type', file.type);


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
      
      let ob = {"batch":this.formObj.batch}
      let arg = await lastValueFrom( this.ResultsService.postBatch((ob)));
      this.BatchObjId = arg._id
      
      let semobj = {
        "sem": this.formObj.sem,
        "batchId":arg._id
      }


      let arg2 = await lastValueFrom( this.ResultsService.postSem(semobj));
      this.SemObjId = arg2
      localStorage.setItem('semId', arg2._id);

      this.ResultsService.semId = arg2._id;
      console.log("added sem + batch");




      //this function is used to add subjects in subject table 
      (this.AddSub(this.SemObjId, this.subjectData))
      
      //this function is used to add marks details for corresponding student
      this.AddStudent(this.SemObjId, this.uploadedData).then(
        (result)=>{
          console.log("Hey Done ......................................................");
          this.viewresult = true;
          this.messageService.clear('duplicate');
          this.messageService.add({life:600000,key:'success-added',severity:'success', summary:'Successfully added', detail:'Confirm to proceed'});
          this.submitload = false;
          // this.uploadFile = false;

        }
      ); //to add details of students like marks,usn,name,percentage etc

    };
  }
  Subjects: Array<sub_interface> = []; // Array conataining the subject details (subject:subject code)

  async AddSub(SemObjId: any, subjectData: any) {
    return new Promise((res)=>{
    
      for (var subname in subjectData[0]) {
      let subobj = {
        semId: SemObjId,
        subcode: subjectData[0][subname],
        subject: subname,
      };
      console.log(subobj)
      // let arg = lastValueFrom(this.ResultsService.postSub(subobj))

      this.ResultsService.postSub(subobj).subscribe((arg) => {
        console.log(arg);
        this.Subjects.push(arg._id);
      });
      // this.Subjects.push(arg._id);
    }
    res(true);
    })
    
  }

  AddStudent(semId: any, uploadedData: any) {
    return new Promise((res)=>{
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

        parr.push(this.AddMarks(this.SemObjId, arg._id, this.Subjects,this.uploadedData,j));
        Promise.all(parr).then(()=>{
          res(true);
        });
      });
      
    })    
  }

   AddMarks(semId: any, StdId: any,Subjects: any[],uploadedData: any,idx: any) {
    return new Promise(async(res)=>{
      
      console.log('Hello' + idx);
      const subdetails = await lastValueFrom(this.ResultsService.getSub());      
      Subjects.forEach(async (subid, j) => {
        let key: any;
        // for (let i = 0; i < subdetails.length; i++) {
          subdetails.every( async (sub,i) => {
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
              return false;
            }
            return true;
          });
    });
    console.log('...............');
    })
    
  }
  //Add sem
  uploadFile = false; //this is flag to show the upload button
  BatchObjId: any;
  SemObjId: any;
  spinnerload = false;

AddSem(batch_id:any,sem:any){
  return new Promise(async (res,rej)=>{
    let arg = await lastValueFrom(this.ResultsService.getSem(sem));
    var flag:Number=0;
    for(let i=0; i<arg.length; i++)
    {
      if(batch_id == arg[i].batchId){
        flag=1;
        localStorage.setItem('semId',arg[i]._id)
        this.router.navigateByUrl('/viewResult');
        break;
      }
    }
    if(flag==0)
    {
      this.messageService.add({key:'duplicate',severity: 'warn',summary: 'data not available ',detail: 'kindly upload the xcel file'});
      // let semobj = {
      //   "sem": sem,
      //   "batchId":batch_id
      // }


      // let arg2 = await lastValueFrom( this.ResultsService.postSem(semobj));
      // this.SemObjId = arg2
      // localStorage.setItem('semId', arg2._id);

      // this.ResultsService.semId = arg2._id;
      // console.log("added sem + batch")
      this.uploadFile = true;

    }

    res(true);
  })

  
}

formObj:any;
  async AddBatch(data: any) {
    //when Add button is clicked this function is called
    this.spinnerload = !this.spinnerload;


    console.log(data.form.value); //ex:{  batch: 2019, sem : 2 }
    let Obj = data.form.value;
    this.selectedSem = Obj.sem;
    let isSemavailable = true;
    this.formObj = Obj;


    let batcharr = new Array();
    batcharr.push(await lastValueFrom(this.ResultsService.getBatch((Obj.batch))));
    console.log(batcharr)
    
    console.log(batcharr);
    if (batcharr[0].length == 0) //if batch was not previously added
    {

      console.log(Obj.batch)
      // let ob = {"batch":Obj.batch}
      // let arg = await lastValueFrom( this.ResultsService.postBatch((ob)));
      // this.BatchObjId = arg._id

    }
    else{
      this.BatchObjId = batcharr[0][0]._id;
    }
    this.AddSem(this.BatchObjId, Obj.sem)
    

    console.log(this.BatchObjId);

    
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}






