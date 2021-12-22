import { AppComponent } from './../../../app.component';
import { DeleteMoreCityDetailsDialog } from './delete/delete.template';
import { AddCityDetailsDialog } from './add/add.template';
import { editCityDetailsDialog } from './edit/edit.template';
import { ViewMoreCityDetailsDialog } from './viewMore/viewMore.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../utils.service';
import { CityService } from './city.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [
    CityService,
    UtilsService
  ]
})
export class CityComponent implements OnInit {
  serviceId: any;
  tableDataStatus: boolean = true;
  imageName: any;
  linkSplit: any;
  items: any[];
  cities: any;
  snackMessage: any;
  dataFetchStatus = false;
  authToken: any;
  filterArray: any = { city: '' };

  constructor(
    public _cityService: CityService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.serviceId = this._utils.serviceId;
    this.fetchData();
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
  }

  /**FETCH ALL CITIES */
  fetchData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);
    this._cityService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.cities = response.data;
          if (this.cities == null) {
            this.tableDataStatus = false;
          } else {
            this.tableDataStatus = true;
            const len = this.cities.length;
            this.items = [];
            for (let i = 0; i < len; i++) {
              this.items.push({
                city: response.data[i].city
              });
              this.linkSplit = this.cities[i].cityLogo.split('/');
              this.imageName = this.linkSplit[2];
              this.cities[i].imageName = this.imageName;
            }
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
    const add = this._mdDialog.open(AddCityDetailsDialog, { disableClose: true });
    add.afterClosed().subscribe(result => {
      this.fetchData();
    });

  }

  /**VIEW MORE BUTTON */
  viewMore(value) {
    const viewMore = this._mdDialog.open(ViewMoreCityDetailsDialog, { disableClose: true });
    viewMore.componentInstance.moreDetails = value;
  }

  /**EDIT BUTTON */
  edit(value) {
    const edit = this._mdDialog.open(editCityDetailsDialog, { disableClose: true });
    edit.componentInstance.moreDetails = value;
    edit.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**DELETE BUTTON */
  delete(value) {
    const deleteCity = this._mdDialog.open(DeleteMoreCityDetailsDialog, { disableClose: true });
    deleteCity.componentInstance.moreDetails = value;
    deleteCity.afterClosed().subscribe(result => {
      this.fetchData();
    });

  }

}