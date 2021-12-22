import { Component, OnInit } from '@angular/core';
import { AmenitiesService } from '../../amenities.service';
import { UtilsService } from 'app/utils.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParksService } from 'app/components/page/parks/parks.service';
//import { QuestionService } from 'app/components/page/questions/question.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [
      UtilsService,
      AmenitiesService,
      ParksService,
     // QuestionService
  ]
})
export class AddAminityInspectionDialog implements OnInit {

  btnStatus = true;
  btnLabel = 'Add Inspection';
  customQuestionSet: any;
  private authToken:any = this._utils.fetchAuthtokenTokenString();
  customizedQuestionSets: any;
  serviceId: any;
  recurrences: any;
  inspectionTypes: any;
  inspectors: any;


  constructor(
    public _dialog: MatDialogRef<AddAminityInspectionDialog>,
    private _amenitiesService: AmenitiesService,
    private _utils: UtilsService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _parksService: ParksService,
    //private _questionService: QuestionService,



  ) { }

  ngOnInit(): void {
    this.serviceId = this._utils.serviceId;
    this.fetchInspectors();
    this.fetchRecurrence();
    this.fetchInspectionType();
}


      /**FETCH RECCURENCE */
      fetchRecurrence() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchRecurrence(input)
            .subscribe(response => {
                console.log(response.data);
                this.recurrences = response.data;
            })

    }

    /*FETCH INSPECTION TYPES */
    fetchInspectionType() {
      /*  this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._questionService.fetchInspectionType(input)
            .subscribe(response => {
                this.inspectionTypes = response.data;
            });*/
    }

    /**FETCH INSPECTORS */
    fetchInspectors() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchInspectors(input)
            .subscribe(response => {
                this.inspectors = response.data;
            });
    }

        /*CLOSE DIALOG*/
        close() {
          this._dialog.close();
      }    


}
