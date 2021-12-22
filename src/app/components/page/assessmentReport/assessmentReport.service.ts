import { UtilsService } from './../../../utils.service';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class AssessmentReportService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;


    constructor(
        private _http: HttpClient,
        private _utils: UtilsService

    ) { }

    /** FETCH ASSESSMENT CHECKLIST INSPECTION REPORT */
    search(data: any) {
        this.filePath = 'report/parkAssessment/assessmentReport.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** SEND MAIL [ASSESSMENT INSPECTION REPORT]  */
    send(data: any) {
        this.filePath = 'report/parkAssessment/parkAssessmentReportMail.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** VIEW DETAILS FOR ASSESSMENT CHECKLIST REPORT */
    showAssessmentReportDetails(data: any) {
        this.filePath = 'report/parkAssessment/parkAssessmentReportDetails.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** PRINT ASSESSMENT CHECKLIST REPORT */
    print(data: any) {
        this.filePath = 'report/parkAssessment/parkAssessmentReportDetailsHtml.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }






}