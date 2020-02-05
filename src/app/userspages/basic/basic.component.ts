import { Component, OnInit } from '@angular/core';
import { CreateService } from 'src/app/create/create.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  constructor(private createService: CreateService) { }

  ngOnInit() {
  }

  

}
