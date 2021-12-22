import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../../../../app.component';
import { WorkOrderService } from './../../workOrder.service';
import { UtilsService } from './../../../../../utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewNote',
  templateUrl: './viewNote.component.html',
  styleUrls: ['./viewNote.component.css'],
  providers: [
    UtilsService,
    WorkOrderService,
    AppComponent
]

})
export class ViewNoteDialog implements OnInit {

  authToken: any;
  noteDetails: any;
  btnStatus = true;
  btnLabel = 'Submit';

  constructor(
    public noteMore: MatDialogRef<ViewNoteDialog>,
    private _snackBar: MatSnackBar,
    private _utils: UtilsService,
    private _workOrderService: WorkOrderService,
    private _appComponent: AppComponent,

  ) { }

  ngOnInit() {
  }

  add() {

    this.btnStatus = false;
    this.btnLabel = 'Notes Submitting! Please wait...';
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('notes', this.noteDetails.notes);
    input.append('wodid', this.noteDetails.id);

    console.log(this.authToken);
    console.log(this.noteDetails.id);

   // input.append('ParkId', this.park);
    // console.log(this.wonumber);
    this._workOrderService.updateNote(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
          this.btnLabel = 'Submit';
          this.btnStatus = true;
          this.noteMore.close();
        } else {
          this._snackBar.open(response.message, 'CLOSE', {
            duration: 2000,
          });
          // this.btnStatus = true;
          // this.btnLabel = 'Add new recurrence';
        }
      });



  }

   /*CLOSE DIALOG*/
   close() {
    this.noteMore.close();
}
}
