import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './data';
import {Chart} from  'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather';
  data: Data[];
  value = [];
  year = [];
  month = [];
  actmnth = [];
  months = [];
  actyear = [];
  strtmonSelected: number;
  endmonSelected: number;
  yearSelected: number;
 
  chart =[];
  cond: boolean = true;
  constructor(private http: HttpClient){}
  
  ngOnInit(){
    this.months =[
      {id:1,month:"Jan"},
      {id:2,month:"Feb"},
      {id:3,month:"Mar"},
      {id:4,month:"Apr"},
      {id:5,month:"May"},
      {id:6,month:"Jun"},
      {id:7,month:"Jul"},
      {id:8,month:"Aug"},
      {id:9,month:"Sep"},
      {id:10,month:"Oct"},
      {id:11,month:"Nov"},
      {id:12,month:"Dec"}
    ];
    this.http.get('http://localhost:3000/tempdata')
    .subscribe((res: Data[]) => {
    for(var i = 0; i <= res.length-1;i++){
        
        if(!this.actyear.includes(res[i].year)){
          this.actyear.push(res[i].year);
       //  console.log((this.actyear));
          
        }
      }});
      }


  monStart(val1,val2, val3){

    this.http.get('http://localhost:3000/tempdata')
    .subscribe((res: Data[]) => {
      if(val1 > val2){
        alert("Start month should be less than end month");
      }
    for(var i = 0; i <= res.length-1;i++){
      
      if(res[i].month >= val1 && res[i].month <= val2 && res[i].year == val3){
        this.value.push(res[i].value);
        
        if(!this.actmnth.includes(res[i].month)){
          this.actmnth.push(res[i].month);
          // console.log(i);
        
      //  console.log(this.actmnth);
      }
      }}
      
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.actmnth,
          datasets: [
            {
              data: this.value,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });

    this.actmnth = [];
    this.value = [];
    
  }
  //   for(let i=val1;i<=val2; i++){
  //     this.strtmonSelected = i;
  //     this.endmonSelected = i;
  //   console.log(this.actmnth.length);
  // }
}

