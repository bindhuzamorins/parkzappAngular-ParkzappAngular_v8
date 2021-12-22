import { Injectable } from '@angular/core';
import { UtilsService } from './../../../../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class QuestionSetService {
    filePath: any;
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

// /**FETCH QUESTION Set*/
// fetchQuestionSet(data: any) {
//     this.filePath = 'questionManagement/fetchQuestionSet.php';
//     const input = data;
//     const headers = new Headers;
//     headers.append('Content-type', 'application/Json;charset=utf-8');
//     return this._http
//         .post(this.defaultUrl + this.filePath, data, headers)
//         .map((response: Response) => response);
// }

/**FETCH QUESTION DETAILS*/
fetchData(data: any) {
    this.filePath = 'questionManagement/fetchCustomizedQuestionSet.php';
    console.log(this.defaultUrl);
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}
/**ADD QUESTION DETAILS*/
addData(data: any) {
    this.filePath = 'questionManagement/addCustomizedQuestionSet.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}

 /**EDIT QUESTION DETAILS*/
 editData(data: any) {
    this.filePath = 'questionManagement/updateCustomizedQuestionSet.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}

delData(data: any) {
    this.filePath = 'questionManagement/delCustomizedQuestionSet.php';
    const input = data;
    const headers = new HttpHeaders;
    headers.append('Content-type', 'application/Json;charset=utf-8');
    return this._http
        .post(this.defaultUrl + this.filePath, data, {headers:headers})
        .map((response: any) => response);
}
}