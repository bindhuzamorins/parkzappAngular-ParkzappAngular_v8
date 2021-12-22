import { EditQuestionDetailsDialog } from './edit/edit.template';
import { AppComponent } from './../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddQuestionDetailsDialog } from './add/add.template';
import { UtilsService } from './../../../utils.service';
import { QuestionService } from './question.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [
    QuestionService,
    UtilsService
  ]
})
export class QuestionsComponent implements OnInit {
  inspectionTypes: any;
  snackMessage: any;
  items: any[];
  questions: any;
  questionnaireSetName: any;
  questionssets: any;
  inspectionType: any;
  parks: any;
  parkId: any;
  dataFetchStatus: boolean;
  authToken: any;
  filterArray: any = { question: '' };
  color = 'accent';

  constructor(
    private _utils: UtilsService,
    public _questionService: QuestionService,
    private _snackBar: MatSnackBar,
    public _mdDialog: MatDialog,
    private _appComponent: AppComponent
  ) { }

  ngOnInit() {
    this._appComponent.checkSessionStatusAndRedirectAfterLogin();
    this.fetchData();
    this.fetchParks();
    this.fetchInspectionTypes();
  }


  fetchInspectionTypes() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._questionService.fetchInspectionType(input)
      .subscribe(response => {
        // console.log(response.data);
        this.inspectionTypes = response.data;
      });
  }

  /* FETCH ALL PARKS */
  fetchParks() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._questionService.fetchPark(input)
      .subscribe(response => {
        this.parks = response.data;
        console.log(this.parks);
      });

  }

  /* FETCH ALL QUESTIONS */
  fetchData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    this._questionService.fetchData(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.questions = response.data;
          console.log(this.questions);
          const len = this.questions.length;
          console.log(len);
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
  /* FETCH ALL QUESTIONS */
  fetchDatabyid() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    const serviceId = this._utils.fetchServiceId();
    input.append('serviceId', serviceId);
    input.append('qsId', this.questionnaireSetName);
    this._questionService.fetchQuestionbyid(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;
          this.questions = response.data;
          console.log(this.questions);
          const len = this.questions.length;
          console.log(len);
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

  fetchQsData() {
    this.authToken = this._utils.fetchAuthtokenTokenString();
    const input = new FormData();
    input.append('token', this.authToken);
    input.append('inspectionTypeId', this.inspectionType);
    input.append('parkId', this.parkId);
    console.log(this);
    this._questionService.fetchQuestionSet(input)
      .subscribe(response => {
        if (response.response_code === '1') {
          this.dataFetchStatus = true;

          this.questionssets = response.data;
          console.log(this.questionssets);
          const len = this.questionssets.length;

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

  /*ADD QUESTIONS*/
  add() {
    const dialog = this._mdDialog.open(AddQuestionDetailsDialog, { disableClose: true });
    dialog.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }
  /**EDIT BUTTON */
  edit(value) {
    console.log("value");
    console.log(value);
    const edit = this._mdDialog.open(EditQuestionDetailsDialog, { disableClose: true });
    edit.componentInstance.moreDetails = value;
    edit.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }
  del(value) {
    if (confirm('Are you sure you want to delete this Question?') === true) {

      this.authToken = this._utils.fetchAuthtokenTokenString();
      const input = new FormData();
      input.append('id', value.id);
      input.append('token', this.authToken);
      this._questionService.delData(input)
        .subscribe(response => {
          if (response.response_code == 1) {
            this._snackBar.open(response.message, 'CLOSE', {
              duration: 5000,
            });
            this.fetchData();
          }
          else {
            this._snackBar.open(response.message, 'CLOSE', {
              duration: 5000,
            });
          }
        });
    }
  }
}
