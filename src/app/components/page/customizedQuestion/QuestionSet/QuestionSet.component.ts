import { AppComponent } from './../../../../app.component';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../../../../utils.service';
import { addQuestionSetDialog } from './add/add.template';
import { EditQuestionSetDialog } from './edit/edit.template';
import { DeleteQuestionSetDialog } from './delete/delete.template';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionSetService } from 'app/components/page/customizedQuestion/QuestionSet/QuestionSet.service';


@Component({
  selector: 'app-QuestionSet',
  templateUrl: './QuestionSet.component.html',
  styleUrls: ['./QuestionSet.component.css'],
  providers: [
    QuestionSetService,
    UtilsService
  ]
})
export class QuestionSetComponent implements OnInit {
  serviceId: any;
  snackMessage: any;
  items: any[];
  questionSets: any;
  dataFetchStatus: boolean;
  authToken: any;
  filterArray: any = { questionnaireSetName: '' };
  questionnaireSetName: any;

  color = 'accent';


  constructor(
    private _utils: UtilsService,
    private _appComponent: AppComponent,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    public _QuestionSetService: QuestionSetService
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.serviceId = this._utils.fetchServiceId();
    this.fetchData();
  }

  /* FETCH ALL QUESTIONS */
  fetchData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('serviceId', this.serviceId);

    // const serviceId = this._utils.fetchServiceId();
    // input.append('serviceId', serviceId);
    this._QuestionSetService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.questionSets = response.data;
          console.log(this.questionSets);
          const len = this.questionSets.length;
          this.items = [];
          for (let i = 0; i < len; i++) {
            this.items.push({
              questionnaireSetName: response.data[i].questionnaireSetName,
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

  /*ADD QUESTION SET*/
  addQuestionSet() {
    const dialog = this._mdDialog.open(addQuestionSetDialog, { disableClose: true });
    dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**EDIT BUTTON */
  edit(value) {
    const edit = this._mdDialog.open(EditQuestionSetDialog, { disableClose: true });
    edit.componentInstance.moreDetails = value;
    edit.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  /**DELETE BUTTON */
  delete(value) {
    const _dialog = this._mdDialog.open(DeleteQuestionSetDialog, { disableClose: true });
    _dialog.componentInstance.moreDetails = value;
    _dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

}

