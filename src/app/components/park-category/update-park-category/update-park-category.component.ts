import { Component, OnInit } from '@angular/core';
import { ParkCategoryService } from '../park-category.service';
import { UtilsService } from 'app/utils.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ng4FilesService } from 'angular4-files-upload';

@Component({
  selector: 'app-update-park-category',
  templateUrl: './update-park-category.component.html',
  styleUrls: ['./update-park-category.component.css'],
  providers: [
    ParkCategoryService,
    UtilsService
  ]
})
export class UpdateParkCategoryComponent implements OnInit {
  btnStatus = true;
  btnLabel = 'Update details';
  moreDetails: any;
  currentProfileImage: any;
  imageShown: boolean;
  docshown: boolean;
  divshown: boolean;
  public selectedFiles;
  private authToken:any = this._utils.fetchAuthtokenTokenString();
  serviceId: any;

  constructor(
    public editCategory: MatDialogRef<UpdateParkCategoryComponent>,
    private _snackBar: MatSnackBar,
    private _categoryService: ParkCategoryService,
    private _utils: UtilsService,
    public _mdDialog: MatDialog,
    private ng4FilesService: Ng4FilesService

  ) { }

  ngOnInit() {

    this.serviceId = this._utils.serviceId;
    // this.fetchCities();
    //this.fetchAllStates();

  }

  /**CHANGE BUTTON STATUS ON ANY DATA CHANGE */
  enableButton() {
    this.btnStatus = true;
  }


  /**EDIT CITY DETAILS*/
  edit(value: any) {
    this.btnStatus = false;
    this.btnLabel = 'Updating! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('id', this.moreDetails.id);
    input.append('category', value.category);
    input.append('feature', value.description);

    this._categoryService.editData(input)
      .subscribe(response => {
        if (response.response_code == 1) {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 5000,
          });
          this.editCategory.close();
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
    this.editCategory.close();
  }


}
