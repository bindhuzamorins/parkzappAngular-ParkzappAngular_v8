import { Component, OnInit } from '@angular/core';
import { ParkAreaService } from './park-area.service';
import { UtilsService } from 'app/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from './../../../app.component';
import { AddAreaDialog } from '../parks/add/addArea/addArea.template';
import { EditParkAreaComponent } from './edit-park-area/edit-park-area.component';
import { DeleteParkAreaComponent } from './delete-park-area/delete-park-area.component';

@Component({
  selector: 'app-park-area',
  templateUrl: './park-area.component.html',
  styleUrls: ['./park-area.component.css'],
  providers: [
    ParkAreaService,
    UtilsService
  ]
})
export class ParkAreaComponent implements OnInit {
  serviceId: any;
  tableDataStatus: boolean = true;
  imageName: any;
  linkSplit: any;
  items: any[];
  area: any;
  snackMessage: any;
  dataFetchStatus = false;
  authToken: any;
  filterArray: any = { area: '' };

  constructor(
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent,
    public _areaService: ParkAreaService,
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this.fetchData();
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
  }
  /**FETCH ALL AREA */
  fetchData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._areaService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.area = response.data;
          if (this.area == null) {
            this.tableDataStatus = false;
          } else {
            this.tableDataStatus = true;
            const len = this.area.length;
            this.items = [];
            for (let i = 0; i < len; i++) {
              this.items.push({
                area: response.data[i].area
              });
              // this.linkSplit = this.area[i].cityLogo.split('/');
              // this.imageName = this.linkSplit[2];
              // this.cities[i].imageName = this.imageName;
            }
            console.log(this.items);
          }

        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000
          });
        }
      });
  }

  /**ADD BUTTON */
  add() {
    const add = this._mdDialog.open(AddAreaDialog, { disableClose: true });
    add.afterClosed().subscribe(result => {
      this.fetchData();
    });

  }
  /**EDIT BUTTON */
  edit(value) {
    const edit = this._mdDialog.open(EditParkAreaComponent, { disableClose: true });
    edit.componentInstance.moreDetails = value;
    edit.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**DELETE BUTTON */
  delete(value) {
    const deleteCity = this._mdDialog.open(DeleteParkAreaComponent, { disableClose: true });
    deleteCity.componentInstance.moreDetails = value;
    deleteCity.afterClosed().subscribe(result => {
      this.fetchData();
    });

  }

}


