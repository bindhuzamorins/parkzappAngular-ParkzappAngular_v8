import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customizedQuestion',
  templateUrl: './customizedQuestion.component.html',
  styleUrls: ['./customizedQuestion.component.css']
})
export class CustomizedQuestionComponent implements OnInit {
  pageName = 'QuestionSet';
  constructor() { }

  ngOnInit() {
  }

  QuestionSet() {
    this.pageName = 'QuestionSet';
  }

  customQuestion() {
    this.pageName = 'customQuestion';
  }
}
