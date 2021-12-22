import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workOrder',
  templateUrl: './workOrder.component.html',
  styleUrls: ['./workOrder.component.css']
})
export class WorkOrderComponent implements OnInit {
  pageName = 'finishedWorkorder';

  constructor() { }

  ngOnInit() {
  }

  // generatePage() {
  //   this.pageName = 'generateWorkorder';
  // }

  finishedPage() {
    this.pageName = 'finishedWorkorder';
  }

  pendingPage() {
    this.pageName = 'pendingWorkorder';
  }

}
