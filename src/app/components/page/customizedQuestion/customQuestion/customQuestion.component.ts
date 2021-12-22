import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../../../../app.component';
import { UtilsService } from './../../../../utils.service';
import { AddCustomQuestionDialog } from './add/add.template';
import { EditCustomQuestionDialog } from './edit/edit.template';
import { DeleteCustomQuestionDialog } from './delete/delete.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomQuestionService } from 'app/components/page/customizedQuestion/customQuestion/customQuestion.service';


@Component({
  selector: 'app-customQuestion',
  templateUrl: './customQuestion.component.html',
  styleUrls: ['./customQuestion.component.css'],
  providers: [
    CustomQuestionService,
    UtilsService
  ]
})
export class CustomQuestionComponent implements OnInit {
  custom: any;
  value: any;
  inspectionTypes: any;
  snackMessage: any;
  items: any[];
  questions: any;
  dataFetchStatus: boolean;
  authToken: any;
  filterArray: any = { question: '' };
  questionnaire_set_name: any;

  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    public _mdDialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _CustomQuestionService: CustomQuestionService
  ) { }

  ngOnInit() {
    this.fetchData();
  }


  /* FETCH ALL QUESTIONS */
  fetchData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    this.custom = '1';
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    input.append('custom', this.custom);
    
    this._CustomQuestionService.fetchQuestion(input)
      .subscribe(response => {
        console.log(response);
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.questions = response.data;
          const len = this.questions.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              questionnaire_set_name: response.data[i].questionnaire_set_name,
            });
          }
        } else {
          this.snackMessage = response.message;
          this._snackBar.open(this.snackMessage, 'OKAY', {
            duration: 5000,
          });
        }
      });
  }


  /*ADD QUESTION*/
  add() {
    const dialog = this._mdDialog.open(AddCustomQuestionDialog, { disableClose: true });
    dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**EDIT BUTTON */
  edit(value: any) {
    console.log(value);
    const edit = this._mdDialog.open(EditCustomQuestionDialog, { disableClose: true });
    edit.componentInstance.moreDetails = value;
    edit.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**DELETE BUTTON */
  delete(value: any) {
    const _dialog = this._mdDialog.open(DeleteCustomQuestionDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }
}
