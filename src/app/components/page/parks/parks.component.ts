import { ViewParkChecklistDialog } from './viewChecklist/viewChecklist.template';
import { ViewAmenitiesDialog } from './viewAmenities/viewAmenities.template';
import { EditParkDetailsDialog } from './edit/edit.template';
import { ViewRecordsDialog } from './viewRecords/viewRecords.template';
import { ViewEquipmentsDialog } from './viewEquipments/viewEquipments.template';
import { ViewInspectionsDialog } from './viewInspections/viewInspections.template';
import { ViewInspectorsDialog } from './viewInspectors/viewInspectors.template';
import { AddParkDialog } from './add/add.template';
import { MapParkDialog } from './map/map.template';
import { bluePrintDialog } from './bluePrint/bluePrint.template';
import { ViewParkDialog } from './view/view.template';
import { AppComponent } from './../../../app.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from './../../../utils.service';
import { ParksService } from './parks.service';
import { Component, OnInit } from '@angular/core';
//import { FindValueOperator } from 'rxjs/operators/find';

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css'],
  providers: [
    ParksService
  ]
})
export class ParksComponent implements OnInit {
  serviceOne: boolean;
  searchPlaceholder: string;
  headClass: string;
  btnName: string;
  otherButtonClass: string;
  otherServiceStatus: boolean;
  playGroundGridStatus: boolean;
  serviceId: any;
  tableDataStatus: boolean = true;
  assignedAmenities: any;
  assignedRecords: any;
  assignedEquipments: any;
  assignedInspections: any;
  assignedInspectors: any;
  loadingStatus: boolean;
  imageUrl: string;
  parks: any = 0;
  snackMessage: any;
  items: any[];
  dataFetchStatus: boolean;
  private authToken: any = this._utils.fetchAuthtokenTokenString();

  filterArray: any = { parkName: '' };
  serviceThree: boolean;
  thName: string;
  insName: string;
  serviceFour: boolean;
  serviceFive: boolean;
  serviceSix: boolean;
  serviceTwo: boolean;

  constructor(
    private _parksService: ParksService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent,

  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this.fetchData();
    this.imageUrl = this._utils.imageUrl;
    this.listName();
  }

  fetchData() {
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);

    this._parksService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.tableDataStatus = true;
          if (this.serviceId === '1') {
            this.playGroundGridStatus = true;
            this.otherServiceStatus = false;
            this.otherButtonClass = 'other-btn';
          } else {
            this.otherServiceStatus = true;
            this.playGroundGridStatus = false;
            if (this.serviceId === '2') {
              this.otherButtonClass = 'otherBtnIcearena';
            } else if (this.serviceId === '3') {
              this.otherButtonClass = 'otherBtnBuilding';
            } else if (this.serviceId === '4') {
              this.otherButtonClass = 'otherBtnSports';
            } else if (this.serviceId === '5') {
              this.otherButtonClass = 'otherBtnFire';
            } else if (this.serviceId === '6') {
              this.otherButtonClass = 'otherBtnParking';
            }

          }
          this.parks = response.data[0].parks;
          console.log(this.parks);
          const len = this.parks.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              parkName: response.data[0].parks[i].parkName
            });
          }
        } else {
          this.tableDataStatus = false;
          this.dataFetchStatus = true;
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }

      })
  }

  /**VIEW MORE BUTTON */
  view(value: any) {
    const _dialog = this._mdDialog.open(ViewParkDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
  }

  /**VIEW INSPECTORS BUTTON */
  viewInspectors(value: any) {
    this.loadingStatus = true;
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', value.id);
    input.append('serviceId', this.serviceId);
    this._parksService.fetchAssignedInspectors(input)
      .subscribe(response => {
        if (response.response_code == '1') {
          this.loadingStatus = false;
          if (response.data == null) {
            this.assignedInspectors = [];
            this.snackMessage = 'No inspectors assigned!';
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000,
            });
            // this.loadingStatus = true;
          } else {
            this.assignedInspectors = response.data;
            const dialog = this._mdDialog.open(ViewInspectorsDialog, { disableClose: true });
            dialog.componentInstance.moreDetails = value;
            dialog.componentInstance.assignedInspectors = this.assignedInspectors;
          }
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
          this.loadingStatus = false;
        }
      });

  }

  /**VIEW ON MAP BUTTON */
  map(value: any) {
    const _dialog = this._mdDialog.open(MapParkDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**VIEW ON BLUE PRINT BUTTON */
  blue(value: any) {
    const _dialog = this._mdDialog.open(bluePrintDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**VIEW INSPECTIONS */
  viewInspections(value: any) {
    this.loadingStatus = true;
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', value.id);
    input.append('serviceId', this.serviceId);
    this._parksService.fetchAssignedInspections(input)
      .subscribe(response => {
        if (response.response_code == '1') {
          this.loadingStatus = false;
          if (response.data == null) {
            this.snackMessage = 'No inspections assigned!';
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000,
            });
          } else {
            this.assignedInspections = response.data
            const _dialog = this._mdDialog.open(ViewInspectionsDialog, { disableClose: true });
            _dialog.componentInstance.moreDetails = value;
            _dialog.componentInstance.assignedInspections = this.assignedInspections;
          }
        } else {
          /*this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });*/
          this.loadingStatus = false;
          // this.assignedInspections = response.data
          const _dialog = this._mdDialog.open(ViewInspectionsDialog, { disableClose: true });
          _dialog.componentInstance.moreDetails = value;
          // _dialog.componentInstance.assignedInspections = this.assignedInspections;
        }
      });
  }

  /**VIEW EQUIPMENTS */
  viewEquipments(value: any) {
    this.loadingStatus = true;
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', value.id);
    this._parksService.fetchAssignedEquipments(input)
      .subscribe(response => {
        if (response.response_code == '1') {
          this.loadingStatus = false;
          if (response.data == null) {
            this.assignedEquipments = [];
            this.snackMessage = 'No equipment assigned!';
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000,
            });
            const _dialog = this._mdDialog.open(ViewEquipmentsDialog, { disableClose: true });
            _dialog.componentInstance.moreDetails = value;
            _dialog.componentInstance.assignedEquipments = this.assignedEquipments;

          } else {
            this.assignedEquipments = response.data
            const _dialog = this._mdDialog.open(ViewEquipmentsDialog, { disableClose: true });
            _dialog.componentInstance.moreDetails = value;
            _dialog.componentInstance.assignedEquipments = this.assignedEquipments;
          }
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }
      });
  }

  /**VIEW RECORDS */
  viewRecords(value: any) {
    this.loadingStatus = true;
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', value.id);
    this._parksService.fetchAssignedRecords(input)
      .subscribe(response => {
        if (response.response_code == '1') {
          this.loadingStatus = false;
          this.assignedRecords = response.data
          const _dialog = this._mdDialog.open(ViewRecordsDialog, { disableClose: true });
          _dialog.componentInstance.moreDetails = value;
          _dialog.componentInstance.assignedRecords = this.assignedRecords;
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }
      });
  }

  /**VIEW AMENITIES */
  viewAmenities(value: any) {
    this.loadingStatus = true;
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('parkId', value.id);
    this._parksService.fetchSelectedAmenities(input)
      .subscribe(response => {
        if (response.response_code == '1') {
          this.loadingStatus = false;
          if (response.data == null) {
            this.snackMessage = 'No amenities assigned!';
            this._snackBar.open(this.snackMessage, 'OKAY', {
              duration: 5000,
            });
            const _dialog = this._mdDialog.open(ViewAmenitiesDialog, { disableClose: true });
            _dialog.componentInstance.moreDetails = value;
            _dialog.componentInstance.assignedAmenities = this.assignedAmenities;

          } else {
            this.assignedAmenities = response.data
            const _dialog = this._mdDialog.open(ViewAmenitiesDialog, { disableClose: true });
            _dialog.componentInstance.moreDetails = value;
            _dialog.componentInstance.assignedAmenities = this.assignedAmenities;
          }
        } else {
          const _dialog = this._mdDialog.open(ViewAmenitiesDialog, { disableClose: true });
          _dialog.componentInstance.moreDetails = value;
          this.loadingStatus = false;
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }
      });
  }

  /**VIEW CHECKLIST */
  viewChecklist(value: any) {

    this.loadingStatus = true;
    const input = new FormData();
    input.append('token', this.authToken);
    this._parksService.fetchAssessmentChecklist(input)
      .subscribe(response => {
        if (response.response_code == '1') {
          this.loadingStatus = false;
          const _dialog = this._mdDialog.open(ViewParkChecklistDialog, { disableClose: true });
          _dialog.componentInstance.moreDetails = value;
          _dialog.componentInstance.defaultChecklists = response.data;
        }
      });
  }

  /**ADD PARK */
  add() {
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    console.log(this.authToken);

    this._parksService.validatePark(input)
      .subscribe(response => {
        if (response.response_code == 0) {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
        }
        else {
          const _dialog = this._mdDialog.open(AddParkDialog, { disableClose: true });
          _dialog.afterClosed().subscribe(result => {
            this.fetchData();
          });
        }
      })



  }


  /**ADD BUILDING */
  addbuilding() {
    const input = new FormData();
    input.append('token', this.authToken);
    console.log(this.authToken);

    this._parksService.validateBuilding(input)
      .subscribe(response => {
        ``
        if (response.response_code == 0) {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
        }
        else {
          const _dialog = this._mdDialog.open(AddParkDialog, { disableClose: true });
          _dialog.afterClosed().subscribe(result => {
            this.fetchData();
          });
        }
      })



  }
  /*add() {
    console.log(this.parks.length);
    if (this.parks.length >= this._appComponent.maximumPlaygrounds) {
      this.snackMessage = 'Cannot add more parks. Limit is ' + this._appComponent.maximumPlaygrounds + '. Upgrade plan for more parks';
      this._snackBar.open(this.snackMessage, 'OKAY', {
        duration: 10000
      });
    }
    else {
      const _dialog = this._mdDialog.open(AddParkDialog, { disableClose: true });
      _dialog.afterClosed().subscribe(result => {
        this.fetchData();
      });

    }
  }*/

  /**VIEW RECORDS */
  edit(value: any) {
    console.log(value);
    const _dialog = this._mdDialog.open(EditParkDetailsDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  // FUNCTION FOR CHANGING Texts W R TO SERVICES
  listName() {
    this.serviceId = this._utils.fetchServiceId();

    if (this.serviceId === '1') {
      this.headClass = 'List of all Parks';
      this.btnName = 'Add New Park';
      this.serviceOne = true;
      this.searchPlaceholder = 'Search Park Name';
      this.insName = 'Park';


    } else if (this.serviceId === '2') {
      this.headClass = 'List of all Ice arena';
      this.btnName = 'Add New Park';
      this.serviceTwo = true;
      this.searchPlaceholder = 'Search Park Name';
      this.insName = 'Park';



    } else if (this.serviceId === '3') {
      this.headClass = 'List of all Buildings';
      this.btnName = 'Add New Building';
      this.serviceThree = true;
      this.searchPlaceholder = 'Search Building Name...';
      this.thName = 'Building Name';
      this.insName = 'Building';



    } else if (this.serviceId === '4') {
      this.headClass = 'List of all parks';
      this.btnName = 'Add New Park';
      this.serviceFour = true;
      this.searchPlaceholder = 'Search Park Name';
      this.insName = 'Park';



    } else if (this.serviceId === '5') {
      this.headClass = 'List of all Parks';
      this.btnName = 'Add New Park';
      this.serviceFive = true;
      this.searchPlaceholder = 'Search Park Name';
      this.insName = 'Park';



    } else if (this.serviceId === '6') {
      this.headClass = 'List of all Parks';
      this.btnName = 'Add New Park';
      this.serviceSix = true;
      this.searchPlaceholder = 'Search Park Name';
      this.insName = 'Park';



    }
  }

}
