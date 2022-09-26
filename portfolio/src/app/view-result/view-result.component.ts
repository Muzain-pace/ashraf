import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ResultsService } from '../results.service';


@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  constructor(private ResultsService:ResultsService) { }

  TopperObj:any;
  SubjectTopperObj:any;
  SubjectFailObj:any;
  async ngOnInit(){
    this.TopperObj = await lastValueFrom(this.ResultsService.getTopper());
    this.SubjectTopperObj = await lastValueFrom(this.ResultsService.getSubTopper());
    this.SubjectFailObj = await lastValueFrom(this.ResultsService.getSubFail());

  }

}
