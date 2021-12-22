import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from 'app/utils.service';
import { ParkAreaService } from '../park-area.service';

@Component({
  selector: 'app-delete-park-area',
  templateUrl: './delete-park-area.component.html',
  styleUrls: ['./delete-park-area.component.css'],
  providers: [
    ParkAreaService,
    UtilsService
  ]
})
export class DeleteParkAreaComponent {
  authToken: any;
  moreDetails: any;
  btnStatus = true;
  btnLabel = 'Delete';

  constructor(
    public deleteCity: MatDialogRef<DeleteParkAreaComponent>,
    private _snackBar: MatSnackBar,
    private _utils: UtilsService,
    private _areaService: ParkAreaService
  ) {
  }

  delete() {
    this.btnStatus = false;
    this.btnLabel = 'Deleting! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', this.moreDetails.id);
    this._areaService.deleteData(input)
      .subscribe(response => {
        if (response.response_code == 1) {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
          this.deleteCity.close();
        }
        else {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
          this.btnStatus = true;
          this.btnLabel = 'Delete';
        }

      })
  }

  /*CLOSE DIALOG*/
  close() {
    this.deleteCity.close();
  }
}