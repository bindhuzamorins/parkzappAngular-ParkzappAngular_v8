import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class InspectionReportService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;


    constructor(
        private _http: HttpClient,
        private _utils: UtilsService

    ) { }

    /** FETCH INSPECTION REPORT */
    search(data: any) {
        this.filePath = 'report/inspection/inspectionReport.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** VIEW MORE DETAILS OF INSPECTION REPORT  */
    inspectionReportDetails(data: any) {
        this.filePath = 'report/inspection/inspectionReportDetails.php';
        // this.filePath = 'report/inspection/inspectionReportDetailsnew.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    //Fetch Combined Report
    searchCombinedReport(data: any) {
        this.filePath = 'report/combinedReports/combinedReport.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    searchCombinedAssesmentReport(data: any) {
        this.filePath = 'report/combinedReports/combinedAssesmnetReport.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }


    /** SEND MAIL [INSPECTION REPORT]  */
    send(data: any) {
        this.filePath = 'report/inspection/inspectionReportMail.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    sendCombinedMail(data:any){
        this.filePath = 'report/combinedReports/combinedReportMail.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** PRINT WORK ORDER */
    print(data: any) {
        this.filePath = 'report/inspection/inspectionReporthtml.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }
    printCombinedReport(data: any) {
        this.filePath = 'report/combinedReports/combinedReporthtml.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }





}