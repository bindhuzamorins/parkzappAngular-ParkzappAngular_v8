import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;

    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }

    /**FETCH USER DETAILS*/
    fetchData(data: any) {
        this.filePath = 'user/fetchAllUser.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**FETCH ASIGNED PARK FOR SELECTED USER*/
    fetchAssignedParks(data: any) {
        this.filePath = 'user/fetchAssignedParks.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**FETCH STATES*/
    fetchStates(value: any) {
        return this._http
            .get('assets/json/states/' + value + '.json')
            .map((response: any) => response);
    }

    /**FETCH WORK TYPES*/
    fetchWorkType() {
        return this._http
            .get('assets/json/workType.json')
            .map((response: any) => response);
    }

    /**FETCH SELECTED COUNTRIES*/
    fetchSelectedCountries() {
        return this._http
            .get('assets/json/selectedCountries.json')
            .map((response: any) => response);
    }

    /**FETCH ROLES*/
    fetchRoles(data: any) {
        this.filePath = 'user/fetchRole.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**ADD USER DETAILS*/
    addData(data: any) {
        this.filePath = 'user/addUser.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**EDIT USER DETAILS*/
    editData(data: any) {
        this.filePath = 'user/updateUser.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**DELETE USER*/
    delete(data: any) {
        this.filePath = 'user/deleteUser.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /**TOGGLE NOTIFICATION FOR SELECTED USER*/
    toggleNotification(data: any) {
        this.filePath = 'user/changeNotificationStatus.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

    /** FUNCTION FOR CHECKING USER COUNT */
    checkUserCount(data: any) {
        this.filePath = 'user/checkUserLimit.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers})
            .map((response: any) => response);
    }

        /** FUNCTION FOR VALIDATING GMAIL */
        validateEmail(data: any) {
            this.filePath = 'user/validateEmail.php';
            const input = data;
            const headers = new HttpHeaders;
            headers.append('Content-type', 'application/Json;charset=utf-8');
            return this._http
                .post(this.defaultUrl + this.filePath, data, {headers:headers})
                .map((response: any) => response);
        }
    


}