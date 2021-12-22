import { Component, OnInit } from '@angular/core';
import { ParkCategoryService } from '../park-category.service';
import { UtilsService } from 'app/utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-park-category',
  templateUrl: './delete-park-category.component.html',
  styleUrls: ['./delete-park-category.component.css'],

  providers: [
    ParkCategoryService,
    UtilsService
  ]
})
export class DeleteParkCategoryComponent {
  authToken: any;
  moreDetails: any;
  btnStatus = true;
  btnLabel = 'Delete';

  constructor(
    public deleteCity: MatDialogRef<DeleteParkCategoryComponent>,
    private _snackBar: MatSnackBar,
    private _utils: UtilsService,
    private _categoryService: ParkCategoryService
  ) {
  }

  delete() {
    this.btnStatus = false;
    this.btnLabel = 'Deleting! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', this.moreDetails.id);
    this._categoryService.deleteData(input)
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