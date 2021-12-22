import { InspectionDueService } from './inspectionDue.service';
import { UtilsService } from './../../../../utils.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from './../../../../app.component';
import { ParksService } from '../../parks/parks.service';
import { QuestionService } from '../../questions/question.service';

@Component({
  selector: 'app-inspectionDue',
  templateUrl: './inspectionDue.component.html',
  styleUrls: ['./inspectionDue.component.css'],
  providers: [
    UtilsService,
    ParksService,
    QuestionService,
    InspectionDueService
  ]
})
export class InspectionDueComponent implements OnInit {
  serviceId: any;
  items: any;
  dues: any;
  snackMessage: any;
  loadStatus = false;
  authToken: any;
  filterArray: any = { inspectionName: '' };

  btnLabel = 'Search Inspection';
  parkName: any;
  parks: any;
  inspectionType: any;
  fromDate: any;
  toDate: any;
  Park: any;
  inspectionTypes: any;
  btnStatus = true;
  formStatus = true;
  serviceThree: boolean;
  inspectionName: string;
  insType: string;

  constructor(
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    private _appComponent: AppComponent,
    private _questionService: QuestionService,
    private _parkService: ParksService,
    private _inspectionDueService: InspectionDueService,
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.serviceId;
    // console.log(this.serviceId);
    this.fetchParks();
    this.fetchInspectionTypes();
    this.fetchInspectionDues();
    this.viewDue();
  }

  /** FETCH ALL PARKS */
  fetchParks() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._parkService.fetchData(input)
      .subscribe(response => {
        this.parks = response.data[0].parks;
        // console.log(response.data);
      });
  }


  /** FETCH INSPECTION TYPES */
  fetchInspectionTypes() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._questionService.fetchInspectionType(input)
      .subscribe(response => {
        // console.log(response.data);
        this.inspectionTypes = response.data;
      });
  }

  /** FETCH ALL INSPECTION DUES */
  fetchInspectionDues() {
    this.loadStatus = true;
    this.authToken = this._utils.fetchAuthtokenTokenString();
    // console.log(this.authToken);
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._inspectionDueService.fetchInspectionDues(input)
      .subscribe(response => {
        this.loadStatus = false;
        // console.log(response);
        if (response.response_code === '1') {


          this.dues = response.data;

          const len = this.dues.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              inspectionName: response.data[i].inspectionName
            });
          }

        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }

      });

  }
  /** SEARCH FOR INSPECTION DUES */
  search() {
    this.formStatus = false;
    this.btnStatus = false;
    this.loadStatus = true;
    this.btnLabel = 'Searching! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', this.parkName);
    input.append('inspectionType', this.inspectionType);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);

    // console.log(this.authToken);
    this._inspectionDueService.search(input)
      .subscribe(response => {
        // console.log(response.data);
        this.loadStatus = false;
        this.btnStatus = true;
        this.btnLabel = 'Search Inspection';
        if (response.response_code === '1') {



          this.dues = response.data;

          const len = this.dues.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              inspectionName: response.data[i].inspectionName
            });
          }

        } else {
          this.dues = [];
          this.items = [];
          this._snackBar.open(response.message, 'OKAY', {
            duration: 5000
          });



        }

      });
  }
  clearsearch() {
    this.loadStatus = true;
    this.ngOnInit();
  }

  viewDue() {
    this.serviceId = this._utils.fetchServiceId();

    if (this.serviceId === '1' ) {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';
    }    

    if (this.serviceId === '2' ) {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';


    }

    if (this.serviceId === '3' ) {
        this.serviceThree = true;
        this.inspectionName = 'Building Name';
        this.insType = 'Building Name';



    }

    if (this.serviceId === '4' ) {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';


    }

    if (this.serviceId === '5' ) {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';


    }

    if (this.serviceId === '6' ) {
      this.inspectionName = 'Park Name';
      this.insType = 'Park';


    }

    }


}
