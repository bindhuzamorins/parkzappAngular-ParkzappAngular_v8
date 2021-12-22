import { DeleteAmenityDetailsDialog } from './delete/delete.template';
import { EditAmenityDetailsDialog } from './edit/edit.template';
import { AddAmenityDetailsDialog } from './add/add.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../utils.service';
import { AmenitiesService } from './amenities.service';
import { Component, OnInit } from '@angular/core';
import { ViewAmenityInspectionsDialog } from './viewInspections/viewInspections.component';
import { ParksService } from '../parks/parks.service';
import { ViewAmenityInspectorDialog } from './viewAmenityInspector/viewAmenityInspector.component';
import { element } from 'protractor';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
  providers: [
    AmenitiesService,
    UtilsService,
    ParksService
  ]
})
export class AmenitiesComponent implements OnInit {
  tableDataStatus: boolean = true;
  dataStatus: boolean;
  isReadOnly: boolean;
  snackMessage: any;
  items: any[];
  amenities: any;
  dataFetchStatus: boolean;
  filterArray: any = { amenity: '' };

  private authToken:any = this._utils.fetchAuthtokenTokenString();
  loadingStatus: boolean;
  serviceId: any;
  assignedInspections: any;
  assignedInspectors: any[];

  constructor(
    private _amenitiesService: AmenitiesService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _parksService: ParksService,

  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this.fetchAmenities();
  }

  /**FETCH ALL AMENITIES*/
  fetchAmenities() {
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._amenitiesService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.tableDataStatus = true;
          this.dataFetchStatus = true;
          this.amenities = response.data;

          const len = this.amenities.length;
          if (len > 0) {
            this.items = [];
            for (let i = 0; i < len; i++) {
              this.items.push({
                amenity: response.data[i].amenity
              });
            }
            this.dataStatus = true;
          }
          else {
            this.dataStatus = false;
          }
        } else {
          this.tableDataStatus = false;
          this.dataFetchStatus = true;
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }

  /**VIEW AMENITY INSPECTION*/
  amenityInspections(value: any) {
    // this.loadingStatus = true;
    // const input = new FormData();
    // input.append('token', this.authToken);
    // input.append('parkId', value.id);
    // input.append('serviceId', this.serviceId);
    // this._parksService.fetchAssignedInspections(input)
    //   .subscribe(response => {
    //     if (response.response_code == '1') {
    //       this.loadingStatus = false;
    //       if (response.data == null) {
    //         this.snackMessage = 'No inspections assigned!';
    //         this._snackBar.open(this.snackMessage, 'OKAY', {
    //           duration: 5000,
    //         });
    //       } else {
    //         this.assignedInspections = response.data;
    const _dialog = this._mdDialog.open(ViewAmenityInspectionsDialog, { disableClose: true });
    _dialog.componentInstance.amenityInspection = value;
    // _dialog.componentInstance.assignedInspections = this.assignedInspections;
  }
  //   } else {
  //     /*this.snackMessage = response.message;
  //     this._snackBar.open(this.snackMessage, 'OKAY', {
  //       duration: 5000,
  //     });*/
  //     this.loadingStatus = false;
  //     // this.assignedInspections = response.data
  //     //const _dialog = this._mdDialog.open(ViewInspectionsDialog, { disableClose: true });
  //    // _dialog.componentInstance.moreDetails = value;
  //     // _dialog.componentInstance.assignedInspections = this.assignedInspections;
  //   }
  // });
  // }

  /**ADD BUTTON */
  add() {
    const _dialog = this._mdDialog.open(AddAmenityDetailsDialog, { disableClose: true });
    _dialog.afterClosed().subscribe(result => {
      this.fetchAmenities();
    });

  }

  /**EDIT BUTTON */
  edit(value: any) {
    const _dialog = this._mdDialog.open(EditAmenityDetailsDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchAmenities();
    });
  }

  /**DELETE */
  delete(value: any) {
    const _dialog = this._mdDialog.open(DeleteAmenityDetailsDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchAmenities();
    });
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
            const dialog = this._mdDialog.open(ViewAmenityInspectorDialog, { disableClose: true });
            dialog.componentInstance.moreInspectorDetails = value;
            dialog.componentInstance.assignedInspectors = this.assignedInspectors;
          }
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY 2', {
            duration: 5000,
          });
          this.loadingStatus = false;
        }
      });

  }


}
