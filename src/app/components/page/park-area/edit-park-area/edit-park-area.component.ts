import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParkAreaService } from '../park-area.service';
import { UtilsService } from 'app/utils.service';
import { Ng4FilesService } from 'angular4-files-upload';

@Component({
  selector: 'app-edit-park-area',
  templateUrl: './edit-park-area.component.html',
  styleUrls: ['./edit-park-area.component.css'],
  providers: [
    ParkAreaService,
    UtilsService
  ]
})
export class EditParkAreaComponent implements OnInit {

  btnStatus = true;
  btnLabel = 'Update details';
  moreDetails: any;
  currentProfileImage: any;
  imageShown: boolean;
  docshown: boolean;
  divshown: boolean;
  public selectedFiles;
  private authToken:any = this._utils.fetchAuthtokenTokenString();
  cities: any[];
  serviceId: any;

  constructor(
    public editArea: MatDialogRef<EditParkAreaComponent>,
    private _snackBar: MatSnackBar,
    private _areaService: ParkAreaService,
    private _utils: UtilsService,
    public _mdDialog: MatDialog,
    private ng4FilesService: Ng4FilesService

  ) { }

  ngOnInit() {

    this.serviceId = this._utils.serviceId;
    this.fetchCities();
    //this.fetchAllStates();

  }

  /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
  enableButton() {
    this.btnStatus = true;
  }


  /**FETCH CITIES */
  fetchCities() {
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);

    this._areaService.fetchCities(input)
      .subscribe(response => {
        this.cities = response.data;
        console.log(this.cities);
      });
  }

  /**EDIT CITY DETAILS*/
  edit(value: any) {
    this.btnStatus = false;
    this.btnLabel = 'Updating! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', this.moreDetails.id);
    input.append('city', value.city);
    input.append('area', value.area);

    this._areaService.editData(input)
      .subscribe(response => {
        if (response.response_code == 1) {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
          this.editArea.close();
        }
        else {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
          this.btnStatus = true;
          this.btnLabel = 'Update details';
        }
      });
  }

  /*CLOSE DIALOG*/
  close() {
    this.editArea.close();
  }


}
