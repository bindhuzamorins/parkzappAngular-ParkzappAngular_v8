import { VideoDialog } from './video/video.template';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilsService } from './../../../utils.service';


@Component({
  selector: 'app-helpVideo',
  templateUrl: './helpVideo.component.html',
  styleUrls: ['./helpVideo.component.css'],
  providers: [
    UtilsService,
  ]
})
export class HelpVideoComponent implements OnInit {


  constructor(
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent,
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
  }

  /** CODE FOR SHOW VIDEO  */
  show(value: any) {
    const dialog = this._mdDialog.open(VideoDialog, { disableClose: true });
    dialog.componentInstance.moreDetails = value;
    dialog.afterClosed().subscribe(result => {
    });
  }


}
