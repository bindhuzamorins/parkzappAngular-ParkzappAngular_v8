
import {map} from 'rxjs/operators';

import { UtilsService } from './../../../utils.service';
import { Injectable } from '@angular/core';
//import { Http, any, HttpHeaders } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';



@Injectable()
export class ParksService {
    filePath: string;
    public defaultUrl = this._utils.defaultUrl;

    constructor(
        private _http: HttpClient,
        private _utils: UtilsService
    ) { }

    /**VALIDATE CUSTOMIZED QUESTION SET EXIST OR NOT*/
    checkExistCustomizedSet(data: any) {
        this.filePath = 'questionManagement/checkCustomQuest.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**VALIDATE PARKS COUNT*/
    validatePark(data: any) {
        this.filePath = 'park/parkValidation.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**VALIDATE BUILDING COUNT*/
    validateBuilding(data: any) {
        this.filePath = 'park/buildingValidation.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH PARKS*/
    fetchData(data: any) {
        this.filePath = 'park/listAllParks.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /** SELECT PARKS*/
    fetchPark(data: any) {
        this.filePath = 'park/listAllParksUnderService.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }
    /**FETCH Country */

    fetchCountry(data: any) {
        this.filePath = 'city/fetchCountry.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));

    }
    /**FETCH RECURRENCE*/
    fetchRecurrence(data: any) {
        this.filePath = 'recurrence/fetchRecurrence.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH INSPECTORS*/
    fetchInspectors(data: any) {
        this.filePath = 'user/fetchAllUser.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH ASSIGNED INSPECTORS FOR SELECTED PARK*/
    fetchAssignedInspectors(data: any) {
        this.filePath = 'inspector/viewAllInspectors.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH ASSIGNED INSPECTIONS FOR SELECTED PARK*/
    fetchAssignedInspections(data: any) {
        this.filePath = 'inspection/viewAllInspections.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH ASSIGNED EQUIPMENTS FOR SELECTED PARK*/
    fetchAssignedEquipments(data: any) {
        this.filePath = 'equipment/fetchAllEquipment.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH ASSIGNED EQUIPMENTS FOR SELECTED PARK*/
    fetchAssignedRecords(data: any) {
        this.filePath = 'records/viewRecord.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH EQUIPMENTS*/
    fetchEquipments(data: any) {
        this.filePath = 'equipment/fetchEquipments.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**UPDATE EQUIPMENTS LIST*/
    updateEquipmentsList(data: any) {
        this.filePath = 'equipment/addEquipment.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**UPDATE EQUIPMENTS LIST*/
    addDulicateEquipment(data: any) {
        this.filePath = 'equipment/addSameEquipment.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }


    /**DELETE SELECTED EQUIPMENT*/
    deleteEquipment(data: any) {
        this.filePath = 'equipment/deleteEquipment.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**TOGGLE EQUIPMENT*/
    toggleNotification(data: any) {
        this.filePath = 'equipment/equipmentHideShow.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /** EDIT EQUIPMENT LABEL*/
    equipmentLabelEdit(data: any) {
        this.filePath = 'equipment/equipmentLabelEdit.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH CITIES*/
    fetchCities(data: any) {
        this.filePath = 'city/fetchAllCity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH AREA*/
    fetchAreas(data: any) {
        this.filePath = 'area/fetchArea.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH AREA*/
    fetchParkCategory(data: any) {
        this.filePath = 'parkCategory/fetchParkCategory.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH LAT AND LONG */
    fetchLatLong(data: any) {
        const address = data;
        return this._http
            .get('https://maps.google.com/maps/api/geocode/json?address=' + address).pipe(
            map((response: any) => response));
    }

    /**ADD PARKS*/
    addPark(data: any) {
        this.filePath = 'park/addPark.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**ADD INSPECTION TO PARK*/
    addInspection(data: any) {
        this.filePath = 'inspection/addInspection.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**UPDATE INSPECTION TO PARK*/
    updateInspection(data: any) {
        this.filePath = 'inspection/updateInspection.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**UPDATE LOCATION OF THE PARK*/
    updateLocation(data: any) {
        this.filePath = 'park/locationUpdate.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**DELETE INSPECTION TO PARK*/
    deleteInspection(data: any) {
        this.filePath = 'inspection/deleteInspection.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**ADD PARKS*/
    edit(data: any) {
        this.filePath = 'park/editParkk.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**ADD NEW AREA*/
    addNewArea(data: any) {
        this.filePath = 'area/addArea.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**ADD NEW PARK CATEGORY*/
    addNewParkCategory(data: any) {
        this.filePath = 'parkCategory/addParkCategory.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH SELECTED AMENITIES IN PARK*/
    fetchSelectedAmenities(data: any) {
        this.filePath = 'parkAmenity/fetchParkAminity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**ADD SELECTED AMENITIES IN PARK*/
    addParkAmenities(data: any) {
        this.filePath = 'parkAmenity/addParkAmenity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**DELETE SELECTED AMENITIES IN PARK*/
    deleteParkAmenity(data: any) {
        this.filePath = 'parkAmenity/deleteParkAmenity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**UPDATE QUANTITY OF SELECTED AMENITY IN PARK*/
    updateParkAmenityQuantity(data: any) {
        this.filePath = 'parkAmenity/updateParkAmenity.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH ASSESSMENT CHECKLIST DATA */
    fetchAssessmentChecklist(data: any) {
        this.filePath = 'parkAssesment/fetchAssesmentChecklist.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH ASSESSMENT CHECKLIST DATA */
    fetchParkAssessmentChecklist(data: any) {
        this.filePath = 'parkAssesment/fetchParkAssesmentChecklist.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**UPDATE ASSESSMENT CHECKLIST WRT PARK */
    updateParkAssessmentChecklist(data: any) {
        this.filePath = 'parkAssesment/addParkChecklist.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }

    /**FETCH SELECTED COUNTRIES*/
    fetchSelectedCountries() {
        return this._http
            .get('assets/json/selectedCountries.json').pipe(
            map((response: any) => response));
    }

    /**FETCH STATES*/
    fetchStates(value: any) {
        return this._http
            .get('assets/json/states/' + value + '.json').pipe(
            map((response: any) => response));
    }
    /**Update equipement */
    manufactureredit(data: any) {
        this.filePath = 'equipment/editmfr.php';
        const input = data;
        const headers = new HttpHeaders;
        headers.append('Content-type', 'application/Json;charset=utf-8');
        return this._http
            .post(this.defaultUrl + this.filePath, data, {headers:headers}).pipe(
            map((response: any) => response));
    }
}