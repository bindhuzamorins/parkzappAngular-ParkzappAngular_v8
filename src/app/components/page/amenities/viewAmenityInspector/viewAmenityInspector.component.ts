import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewAmenityInspector',
  templateUrl: './viewAmenityInspector.component.html',
  styleUrls: ['./viewAmenityInspector.component.css']
})
export class ViewAmenityInspectorDialog implements OnInit {
  moreInspectorDetails: any;
  assignedInspectors: any;

  constructor() { }

  ngOnInit() {
  }

}
