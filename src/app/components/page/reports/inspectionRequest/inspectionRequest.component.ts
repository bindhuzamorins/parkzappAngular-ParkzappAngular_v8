import { DeclineDialog } from './decline/decline.template';
import { ApproveDialog } from './approve/approve.template';
import { InspectionRequestService } from './inspectionRequest.service';
import { AppComponent } from './../../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../../utils.service';
import { Component, OnInit } from '@angular/core';
import { ParksService } from '../../parks/parks.service';
import { QuestionService } from '../../questions/question.service';

@Component({
  selector: 'app-inspectionRequest',
  templateUrl: './inspectionRequest.component.html',
  styleUrls: ['./inspectionRequest.component.css'],
  providers: [
    UtilsService,
    ParksService,
    QuestionService,
    InspectionRequestService
  ]
})
export class InspectionRequestComponent implements OnInit {

  serviceId: any;
  loadStatus = true;
  items: any[];
  snackMessage: any;
  requests: any;
  authToken: any;
  datafetch = true;
  filterArray: any = { inspectionName: '' };
  messageStatus = false;
  btnLabel = 'Search Inspection';
  parkName: any;
  parks: any;
  inspectionType: any;
  inspectionTypes: any;
  btnStatus = true;
  formStatus = true;
  inspectionName: string;
  serviceThree: boolean;
  insType: string;

  constructor(
    private _utils: UtilsService,
    private _snackbar: MatSnackBar,
    private _appComponent: AppComponent,
    private _questionService: QuestionService,
    private _parkService: ParksService,
    private _inspectionRequest: InspectionRequestService,
    public _mdDialog: MatDialog,
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    // console.log(this.serviceId);
    this.fetchParks();
    this.fetchInspectionTypes();
    this.fetchRequests();
    this.viewRequest();
  }

  /** FETCH ALL PARKS */
  fetchParks() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
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
    input.append('serviceId', this.serviceId);
    this._questionService.fetchInspectionType(input)
      .subscribe(response => {
        // console.log(response.data);
        this.inspectionTypes = response.data;
      });
  }

  fetchRequests() {

    this.authToken = this._utils.fetchAuthtokenTokenString();
    // console.log(this.authToken);
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._inspectionRequest.fetchInspectionRequest(input)
      .subscribe(response => {


        this.datafetch = false;
        if (response.response_code === '1') {

          this.requests = response.data;
          const len = this.requests.length;
          if (len >= 1) {
            this.loadStatus = false;
          } else {
            this.loadStatus = true;
          }
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              inspectionName: response.data[i].inspectionName
            });
          }
        } else {
          this.loadStatus = true;
          this.snackMessage = response.message;
          this._snackbar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }


  /** APPROVE DIALOG */
  approveDialog(value: any) {
    const dialog = this._mdDialog.open(ApproveDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
      this.fetchRequests();
    });
  }

  /** DECLINE INSPECTION REQUEST */
  requestDecline(value: any) {
    const dialog = this._mdDialog.open(DeclineDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
      this.fetchRequests();
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
    input.append('serviceId', this.serviceId);
    // console.log(this.authToken);
    this._inspectionRequest.search(input)
      .subscribe(response => {
        // console.log(response.data);
        this.loadStatus = false;
        this.btnStatus = true;
        this.btnLabel = 'Search Inspection';
        if (response.response_code === '1') {
          this.requests = response.data;
          const len = this.requests.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              inspectionName: response.data[i].inspectionName
            });
          }

        } else {
          this.requests = [];
          this.items = [];
          this.snackMessage = response.message;
          this._snackbar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }

      });
  }
  clearsearch() {
    this.loadStatus = true;
    this.ngOnInit();
  }

  viewRequest() {
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
        this.insType = 'Building';



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
