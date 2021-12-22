import { Component, OnInit } from '@angular/core';
import { AmenitiesService } from './../amenities.service';
import { UtilsService } from './../../../../utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddAminityInspectionDialog } from './add/add.component';


@Component({
  selector: 'app-viewInspections',
  templateUrl: './viewInspections.component.html',
  styleUrls: ['./viewInspections.component.css'],
  providers: [
      UtilsService,
      AmenitiesService
  ]
})
export class ViewAmenityInspectionsDialog implements OnInit {
  amenityInspection: any;
  // assignedInspections: any;

  constructor( public _dialog: MatDialogRef<ViewAmenityInspectionsDialog>,
    public _mdDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _utils: UtilsService,
    private _amenitiesService: AmenitiesService) { }

  ngOnInit() {
  }


    /*CLOSE DIALOG*/
    close() {
      this._dialog.close();
  }

  
    /**ADD BUTTON */
    add() {
      const _dialog = this._mdDialog.open(AddAminityInspectionDialog, { disableClose: true });
      _dialog.afterClosed().subscribe(result => {
      });
  
    }

}
