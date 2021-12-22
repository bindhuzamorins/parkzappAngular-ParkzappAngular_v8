import { Injectable } from '@angular/core';
import { UtilsService } from './../../../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {
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

    // fetchInspectionTypeForReport(data: any) {
    //     this.filePath = 'questionManagement/fetchInspectionTypes.php';
    //     const input = data;
    //     const headers = new Headers;
    //     headers.append('Content-type', 'application/Json;charset=utf-8');
    //     return this._http
    //         .post(this.defaultUrl + this.filePath, data, headers)
    //         .map((response: Response) => response);
    // }

    /** SELECT PARKS*/
    fetchPark(data: any) {
        this.filePath = 'park/listParks.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**FETCH QUESTION SET*/
    fetchQuestionSet(data: any) {
        this.filePath = 'questionManagement/fetchQuestionSetByPark.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**FETCH QUESTION SET BY ID*/
    fetchQuestionbyid(data: any) {
        this.filePath = 'questionManagement/fetchQuestionbyid.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    /**FETCH QUESTION DETAILS*/
    fetchData(data: any) {
        this.filePath = 'questionManagement/fetchQuestion.php';
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