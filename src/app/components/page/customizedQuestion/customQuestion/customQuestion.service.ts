import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { UtilsService } from '../../../../utils.service';

@Injectable()
export class CustomQuestionService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;
constructor(
    private _http: HttpClient,
    private _utils: UtilsService
) { }

  /**FETCH QUESTION DETAILS*/
  fetchInspectionType(data: any) {
    this.filePath = 'questionManagement/fetchInspectionTypes.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}


 /**FETCH QUESTION SET*/
 fetchQuestionSet(data: any) {
    this.filePath = 'questionManagement/fetchQuestionSet.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}

 /**FETCH QUESTION**/
 fetchQuestion(data: any) {
    this.filePath = 'questionManagement/fetchQuestion.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}

/**ADD QUESTION DETAILS*/
addData(data: any) {
    this.filePath = 'questionManagement/addQuestion.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}

/**EDIT QUESTION DETAILS*/
editData(data: any) {
    this.filePath = 'questionManagement/updateQuestion.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}

delData(data: any) {
    this.filePath = 'questionManagement/delQuestion.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}
}
