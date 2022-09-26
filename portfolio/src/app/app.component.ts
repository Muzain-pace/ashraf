import { Component } from '@angular/core';
import { bufferToggle } from 'rxjs';


@Component({
  selector: 'app-root',
  // template:'./app.component.html',
  // styles:[`
  // h1{
  //   color:blue;
  // }
  // `]
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ashraf';
  public name = "ashraf";
  public value = "";
}
