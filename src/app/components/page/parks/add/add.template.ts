import { showHidePipe } from './../../../pipes/showHide.pipe';
import { AddParkCategoryDialog } from './addCategory/addCategory.template';
import { AddAreaDialog } from './addArea/addArea.template';
import { viewCustDialog } from './addQuestionSet/addQuestionSet.template';

import { AddCityDetailsDialog } from './../../city/add/add.template';
import { ParksService } from './../parks.service';
import { UtilsService } from './../../../../utils.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Ng4FilesService, Ng4FilesConfig, Ng4FilesStatus, Ng4FilesSelected } from 'angular4-files-upload';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { QuestionService } from '../../questions/question.service';
import { QuestionSetService } from '../../customizedQuestion/QuestionSet/QuestionSet.service';


@Component({
    moduleId: module.id,
    templateUrl: './add.template.html',
    styleUrls: ['./add.template.css'],
    providers: [
        UtilsService,
        ParksService,
        QuestionService,
        QuestionSetService
    ]
})

export class AddParkDialog implements OnInit {
    selectPark: any;
    allParks: any;
    Wizhead: string;
    headName: string;
    commonDetailsSix: any;
    commonDetailsFive: any;
    commonDetailsFour: any;
    commonDetailsThree: any;
    commonDetailsTwo: any;
    commonDetailsOne: any;
    // checkStatus: boolean;
    loadModal: boolean;
    custQuestionSetValues: any;
    customizedSet: string;
    custQuestionSet: any;
    customizedQuestionSets: any;
    customizedPlaygroundValue: any;
    inspectionType19: string;
    inspectionType18: string;
    inspectionType17: string;
    inspectionType16: string;
    inspectionType15: string;
    inspectionType14: string;
    inspectionType13: string;
    inspectionType12: string;
    inspectionType11: string;
    inspectionType10: string;
    inspectionType9: string;
    inspectionType8: string;
    inspectionType7: string;
    inspectionType6: string;
    inspectionType5: string;
    inspectionType4: string;
    inspectionType3: string;
    inspectionType2: string;
    inspectionType1: string;
    inspectionTypeThree: string;
    inspectionTypeOne: string;
    inspectionTypeTwo: string;
    parkServiceSix: string;
    parkServiceFive: string;
    parkServiceFour: string;
    parkServiceThree: string;
    parkServiceTwo: string;
    parkServiceOne: string;
    serviceSix: boolean;
    serviceFive: boolean;
    serviceFour: boolean;
    serviceThree: boolean;
    serviceTwo: boolean;
    serviceOne: boolean;
    assignmentDivSixStatus: boolean;
    assignmentDivFiveStatus: boolean;
    assignmentDivFourStatus: boolean;
    assignmentDivThreeStatus: boolean;
    assignmentDivTwoStatus: boolean;
    assignmentDivOneStatus: boolean;
    inspectionTypes: any;
    addEquipmentStatus: boolean;
    serviceId: any;
    // today = Date();
    today = new Date();

    // minDate = new Date();
    minDate = new Date(this.today.getTime() - (24 * 60 * 60 * 1000));


    parkLong: any = -77.71508792754975;
    parkLat: any = 39.63310066716126;
    map = 0;
    zoom = 5;
    parkImage: any;
    address: string;
    parkEquipment: any;
    parkCountry: any;
    parkBluePrint: any;
    parkArea: any;
    parkCategory: any;
    parkWebsite: any;
    parkEmail: any = "";
    parkPhone: any;
    parkZipCode: any;
    parkCity: any;
    parkState: any;
    parkAddress: any;
    parkName: any;
    imageFileStatusBlueprint = true;
    imageFileStatusLogo = true;
    imageFileLogoBlueprint: any = '';
    imageFileLogo: any = '';
    categories: any;
    areas: any;
    cities: any = [];
    countrySelected: boolean;
    allStates: any;
    countries: any;
    equipments: any;
    inspectors: any;
    recurrences: any;
    priority: any;
    imageUrl: string;
    dateOne: any;
    btnStatus = true;
    // btnLabel = 'Add new park';
    // btnLabelBuilding = 'Add new building';
    btnLabel = 'Add';
    btnLabelBuilding = 'Add';

    show: boolean = false;
    show2: boolean = false;
    show3: boolean = false;
    show4: boolean = false;
    show5: boolean = false;
    showAmenity: boolean = false;
    showVisual: boolean = false;


    asignOneStatus = false;
    asignTwoStatus = false;
    asignThreeStatus = false;
    asignFourStatus = false;
    asignFiveStatus = false;
    asignAmenityStatus = false;
    asignVisualStatus = false;


    inspectionStatusOne = true;
    inspectionStatusTwo = true;
    inspectionStatusThree = true;
    inspectionStatusFour = true;
    inspectionStatusFive = true;
    inspectionStatusAmenity = true;
    inspectionStatusVisual = true;


    inspectorOne: any;
    recurrenceOne = null;
    moreDetails: string;
    priorityOne: any;

    recurrenceTwo = null;
    dateTwo: any;
    inspectorTwo: any;
    priorityTwo: any;

    recurrenceThree = null;
    inspectorThree: any;
    dateThree: any;
    priorityThree: any;

    recurrenceFour = null;
    inspectorFour: any;
    dateFour: any;
    priorityFour: any;

    recurrenceFive = null;
    inspectorFive: any;
    dateFive: any;
    priorityFive: any;

    recurrenceAmenity = null;
    inspectorAmenity: any;
    dateAmenity: any;
    priorityAmenity: any;

    recurrenceVisual = null;
    inspectorVisual: any;
    dateVisual: any;
    priorityVisual: any;

    recurrenceSix = null;
    recurrenceSeven = null;
    recurrenceEight = null;
    recurrenceNine = null;
    recurrenceTen = null;
    recurrenceEleven = null;
    recurrenceTwelve = null;
    recurrenceThirteen = null;
    recurrenceFourteen = null;
    recurrenceFifteen = null;
    recurrenceSixteen = null;
    recurrenceSeventeen = null;
    recurrenceEighteen = null;
    recurrenceNineteen = null;

    divInActiveOne = false;
    divInActiveTwo = false;
    divInActiveThree = false;
    divInActiveFour = false;
    divInActiveFive = false;
    divInActiveSix = false;

    newLog: any;
    newLat: any;
    m: any;
    latAndLog: MouseEvent;
    loadingStatus: boolean;
    showme: boolean = false;

    currentProfileImage: any;
    imageShown: boolean;
    docshown: boolean;
    divshown: boolean;
    public selectedFiles;
    private configImage: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1

    };

    private configgif: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1
    };
    currentProfileImage2: any;
    imageShown2: boolean;
    docshown2: boolean;
    divshown2: boolean;
    public selectedFiles2;
    private configImage2: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1

    };

    private configgif2: Ng4FilesConfig = {
        acceptExtensions: ['*'],
        maxFilesCount: 1
    };

    private authToken:any = this._utils.fetchAuthtokenTokenString();
    serviceThree3: boolean;
    parkLogo: string;
    countryCode: any;
    countryName: any;

    constructor(
        public _dialog: MatDialogRef<AddParkDialog>,
        private _snackBar: MatSnackBar,
        private _utils: UtilsService,
        public _mdDialog: MatDialog,
        private _parksService: ParksService,
        private ng4FilesService: Ng4FilesService,
        private _questionService: QuestionService,
        private _questionSetService: QuestionSetService


    ) {
        this.imageUrl = this._utils.imageUrl;
        // this.serviceId = this._utils.serviceId;
        // console.log(this.serviceId);
        // this.fetchRecurrence();
        // this.fetchInspectors();
        // this.fetchEquipments();
        // this.fetchSelectedCountries();
        // this.fetchCities();
        // this.fetchAreas();
        // this.fetchParkCategory();
        // this.showHideEquipmentAddPart();
    }


    ngOnInit() {
        this.serviceId = this._utils.serviceId;
        this.fetchCommonTask();
        this.setService();
        this.setValues();
        this.fetchRecurrence();
        this.fetchInspectors();
        this.fetchEquipments();
        this.fetchSelectedCountries();
        this.fetchCities();
        this.fetchAreas();
        this.fetchParkCategory();
        this.fetchInspectionTypes();
        this.showHideEquipmentAddPart();
        this.showServiceDiv();
        this.ng4FilesService.addConfig(this.configImage, 'my-image-config');
        this.ng4FilesService.addConfig(this.configgif, 'my-gif-config');
        this.ng4FilesService.addConfig(this.configImage2, 'my-image-config2');
        this.ng4FilesService.addConfig(this.configgif2, 'my-gif-config2');
        this.textName();
        this.selectParks();
        this.fetchCountry();
    }

    /**FETCH COMMON TASKS */
    fetchCommonTask() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._utils.fetchCommonDetails(input)
            .subscribe(response => {
                this.commonDetailsOne = response.data[0].customerServiceOne;
                this.commonDetailsTwo = response.data[0].customerServiceTwo;
                this.commonDetailsThree = response.data[0].customerServiceThree;
                this.commonDetailsFour = response.data[0].customerServiceFour;
                this.commonDetailsFive = response.data[0].customerServiceFive;
                this.commonDetailsSix = response.data[0].customerServiceSix;
                this.selectServices();
            });
    }

    /** HIDE AND SHOW ADD EQUIPMENT PART W R TO SERVICE */
    showHideEquipmentAddPart() {
        if (this.serviceId === '1') {
            this.addEquipmentStatus = false;
        } else {
            this.addEquipmentStatus = true;
        }
    }
    /** Function for set values */
    setValues() {
        this.inspectionType1 = '1';
        this.inspectionType2 = '2';
        this.inspectionType3 = '3';
        this.inspectionType4 = '4';
        this.inspectionType5 = '5';
        this.inspectionType6 = '6';
        this.inspectionType7 = '7';
        this.inspectionType8 = '8';
        this.inspectionType9 = '9';
        this.inspectionType10 = '10';
        this.inspectionType11 = '11';
        this.inspectionType12 = '12';
        this.inspectionType13 = '13';
        this.inspectionType14 = '14';
        this.inspectionType15 = '15';
        this.inspectionType16 = '16';
        this.inspectionType17 = '17';
        this.inspectionType18 = '18';
        this.inspectionType19 = '19';
    }

    /** FUNCTION FOR SELECTING SERVICES BY DEFAULT */
    setService() {
        if (this.serviceId == 1) {
            this.serviceOne = true;

        } else if (this.serviceId == 2) {
            this.serviceTwo = true;

        } else if (this.serviceId == 3) {
            this.serviceThree = true;
            this.serviceThree3 = true;


        } else if (this.serviceId == 4) {
            this.serviceFour = true;

        } else if (this.serviceId == 5) {
            this.serviceFive = true;

        } else {
            this.serviceSix = true;
        }
    }

    /** CODE FOR SHOWING SERVICES W.R.TO ACTIVE SERVICES*/
    selectServices() {
        if (this.commonDetailsOne === '1') {
            this.divInActiveOne = true;
        }
        if (this.commonDetailsTwo === '2') {
            this.divInActiveTwo = true;
        }
        if (this.commonDetailsThree === '3') {
            this.divInActiveThree = true;
        }
        if (this.commonDetailsFour === '4') {
            this.divInActiveFour = true;
        }
        if (this.commonDetailsFive === '5') {
            this.divInActiveFive = true;
        }
        if (this.commonDetailsSix === '6') {
            this.divInActiveSix = true;
        }
    }


    /** FUNCTION FOR SHOW INSPECTION ASSIGNMENT PART W.R.TO SERVICE */
    showServiceDiv() {
        if (this.serviceId === '1') {
            this.assignmentDivOneStatus = true;
            this.assignmentDivTwoStatus = false;
            this.assignmentDivThreeStatus = false;
            this.assignmentDivFourStatus = false;
            this.assignmentDivFiveStatus = false;
            this.assignmentDivSixStatus = false;
        } else if (this.serviceId === '2') {
            this.assignmentDivOneStatus = false;
            this.assignmentDivTwoStatus = true;
            this.assignmentDivThreeStatus = false;
            this.assignmentDivFourStatus = false;
            this.assignmentDivFiveStatus = false;
            this.assignmentDivSixStatus = false;
        } else if (this.serviceId === '3') {
            this.assignmentDivOneStatus = false;
            this.assignmentDivTwoStatus = false;
            this.assignmentDivThreeStatus = true;
            this.assignmentDivFourStatus = false;
            this.assignmentDivFiveStatus = false;
            this.assignmentDivSixStatus = false;
        } else if (this.serviceId === '4') {
            this.assignmentDivOneStatus = false;
            this.assignmentDivTwoStatus = false;
            this.assignmentDivThreeStatus = false;
            this.assignmentDivFourStatus = true;
            this.assignmentDivFiveStatus = false;
            this.assignmentDivSixStatus = false;
        } else if (this.serviceId === '5') {
            this.assignmentDivOneStatus = false;
            this.assignmentDivTwoStatus = false;
            this.assignmentDivThreeStatus = false;
            this.assignmentDivFourStatus = false;
            this.assignmentDivFiveStatus = true;
            this.assignmentDivSixStatus = false;
        } else {
            this.assignmentDivOneStatus = false;
            this.assignmentDivTwoStatus = false;
            this.assignmentDivThreeStatus = false;
            this.assignmentDivFourStatus = false;
            this.assignmentDivFiveStatus = false;
            this.assignmentDivSixStatus = true;
        }
    }

    /**VALIDATE TOGGLE BUTTON INSPECTION*/
    toggleAsignOne() {
        if (this.asignOneStatus) {
            this.asignOneStatus = false;
            this.recurrenceOne = null;
            this.inspectorOne = null;
            this.dateOne = Date();
            this.inspectionStatusOne = true;

            this.show = false;
        }
        else {
            this.asignOneStatus = true;
            this.show = true;
            this.inspectionStatusOne = false;

        }
    }
    toggleAsignTwo() {
        if (this.asignTwoStatus) {
            this.asignTwoStatus = false;
            this.recurrenceTwo = null;
            this.inspectorTwo = null;
            this.dateTwo = Date();
            this.inspectionStatusTwo = true;
            this.show2 = false;
        }
        else {
            this.asignTwoStatus = true;
            this.inspectionStatusTwo = false;
            this.show2 = true;
        }
    }
    toggleAsignThree() {
        if (this.asignThreeStatus) {
            this.asignThreeStatus = false;
            this.recurrenceThree = null;
            this.inspectorThree = null;
            this.dateThree = Date();
            this.inspectionStatusThree = true;
            this.show3 = false;
        } else {
            this.asignThreeStatus = true;
            this.inspectionStatusThree = false;
            this.show3 = true;
        }
    }
    toggleAsignFour() {
        if (this.asignFourStatus) {
            this.asignFourStatus = false;
            this.recurrenceFour = null;
            this.inspectorFour = null;
            this.dateFour = Date();
            this.inspectionStatusFour = true;
            this.show4 = false;
        } else {
            this.asignFourStatus = true;
            this.inspectionStatusFour = false;
            this.show4 = true;
        }
    }
    toggleAsignFive() {
        if (this.asignFiveStatus) {
            this.asignFiveStatus = false;
            this.recurrenceFive = null;
            this.inspectorFive = null;
            this.dateFive = Date();
            this.inspectionStatusFive = true;
            this.show5 = false;
        } else {
            this.asignFiveStatus = true;
            this.inspectionStatusFive = false;
            this.show5 = true;
        }
    }

    toggleAsignAmenity() {
        if (this.asignAmenityStatus) {
            this.asignAmenityStatus = false;
            this.recurrenceAmenity = null;
            this.inspectorAmenity = null;
            this.dateAmenity = Date();
            this.inspectionStatusAmenity = true;
            this.showAmenity = false;
        } else {
            this.asignAmenityStatus = true;
            this.inspectionStatusAmenity = false;
            this.showAmenity = true;
        }
    }

    toggleAsignVisual() {
        if (this.asignVisualStatus) {
            this.asignVisualStatus = false;
            this.recurrenceVisual = null;
            this.inspectorVisual = null;
            this.dateVisual = Date();
            this.inspectionStatusVisual = true;
            this.showVisual = false;
        } else {
            this.asignVisualStatus = true;
            this.inspectionStatusVisual = false;
            this.showVisual = true;
        }
    }



    /**CHECK COUNTRY SELECTED OR NOT AND ALLERT  */
    checkCountryStatus() {
        if (!this.parkCountry) {
            this._snackBar.open('Select country to enable state', 'CLOSE', {
                duration: 4000,
            });

        }
    }

    /**CHECK FILEDS WITHIN EACH INSPECTION*/
    checkAssignInspection() {
        if (this.serviceId == 1) {
            if (this.asignOneStatus) {
                if (!this.recurrenceOne || !this.inspectorOne || !this.dateOne) {
                    this._snackBar.open('Select all fields in Playground inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusOne = false;
                } else {
                    this.inspectionStatusOne = true;
                }
            }
            if (this.asignTwoStatus) {
                if (!this.recurrenceTwo || !this.inspectorTwo || !this.dateTwo) {
                    this._snackBar.open('Select all fields in General inspection!', 'CLOSE', {
                        duration: 2000,
                    });

                    this.inspectionStatusTwo = false;
                } else {
                    this.inspectionStatusTwo = true;
                }
            }
            if (this.asignThreeStatus) {
                if (!this.recurrenceThree || !this.inspectorThree || !this.dateThree) {
                    this._snackBar.open('Select all fields in Audit!', 'CLOSE', {
                        duration: 2000,
                    });

                    this.inspectionStatusThree = false;
                } else {
                    this.inspectionStatusThree = true;
                }
            }
            if (this.asignFourStatus) {
                if (!this.recurrenceFour || !this.inspectorFour || !this.dateFour) {
                    this._snackBar.open('Select all fields in Customized inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusFour = false;
                } else {
                    this.inspectionStatusFour = true;
                }
            }

            if (this.asignAmenityStatus) {
                if (!this.recurrenceAmenity || !this.inspectorAmenity || !this.dateAmenity) {
                    this._snackBar.open('Select all fields in Amenity inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusAmenity = false;
                } else {
                    this.inspectionStatusAmenity = true;
                }
            }
            if (this.asignVisualStatus) {
                if (!this.recurrenceVisual || !this.inspectorVisual || !this.dateVisual) {
                    this._snackBar.open('Select all fields in Visual inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusVisual = false;
                } else {
                    this.inspectionStatusVisual = true;
                }
            }
        }
        if (this.serviceId == 2) {
            if (this.asignOneStatus) {
                if (!this.recurrenceFive || !this.inspectorOne || !this.dateOne) {
                    this._snackBar.open('Select all fields in ice resurfacer inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusOne = false;
                    // this.btnStatus = true;
                } else {
                    this.inspectionStatusOne = true;
                }
            }
            if (this.asignTwoStatus) {
                if (!this.recurrenceSix || !this.inspectorTwo || !this.dateTwo) {
                    this._snackBar.open('Select all fields in compressor room inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusTwo = false;
                } else {
                    this.inspectionStatusTwo = true;
                }
            }
            if (this.asignThreeStatus) {
                if (!this.recurrenceSeven || !this.inspectorThree || !this.dateThree) {
                    this._snackBar.open('Select all fields in ice rink inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusThree = false;
                } else {
                    this.inspectionStatusThree = true;
                }
            }
            if (this.asignFourStatus) {
                if (!this.recurrenceEight || !this.inspectorFour || !this.dateFour) {
                    this._snackBar.open('Select all fields in Customized inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusFour = false;
                } else {
                    this.inspectionStatusFour = true;
                }
            }
            if (this.asignFiveStatus) {
                if (!this.recurrenceNine || !this.inspectorFive || !this.dateFive) {
                    this._snackBar.open('Select all fields in ice arena amenities!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusFive = false;
                } else {
                    this.inspectionStatusFive = true;
                }
            }
        }
        if (this.serviceId == 3) {
            if (this.asignOneStatus) {
                if (!this.recurrenceTen || !this.inspectorOne || !this.dateOne) {
                    this._snackBar.open('Select all fields in general inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusOne = false;
                } else {
                    this.inspectionStatusOne = true;
                }
            }
            if (this.asignTwoStatus) {
                if (!this.recurrenceEleven || !this.inspectorTwo || !this.dateTwo) {
                    this._snackBar.open('Select all fields in customized inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusTwo = false;
                } else {
                    this.inspectionStatusTwo = true;
                }
            }
        }
        if (this.serviceId == 4) {
            if (this.asignOneStatus) {
                if (!this.recurrenceTwelve || !this.inspectorOne || !this.dateOne) {
                    this._snackBar.open('Select all fields in sports field inspection checklist!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusOne = false;
                } else {
                    this.inspectionStatusOne = true;
                }
            }
            if (this.asignTwoStatus) {
                if (!this.recurrenceThirteen || !this.inspectorTwo || !this.dateTwo) {
                    this._snackBar.open('Select all fields in sports facility inspection!', 'CLOSE', {
                        duration: 2000,
                    });

                    this.inspectionStatusTwo = false;
                } else {
                    this.inspectionStatusTwo = true;
                }
            }
            if (this.asignThreeStatus) {
                if (!this.recurrenceFourteen || !this.inspectorThree || !this.dateThree) {
                    this._snackBar.open('Select all fields in customized inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusThree = false;
                } else {
                    this.inspectionStatusThree = true;
                }
            }
        }
        if (this.serviceId == 5) {
            if (this.asignOneStatus) {
                if (!this.recurrenceFifteen || !this.inspectorOne || !this.dateOne) {
                    this._snackBar.open('Select all fields in fire inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusOne = false;
                } else {
                    this.inspectionStatusOne = true;
                }
            }
            if (this.asignTwoStatus) {
                if (!this.recurrenceThirteen || !this.inspectorTwo || !this.dateTwo) {
                    this._snackBar.open('Select all fields in customized inspection!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusTwo = false;
                } else {
                    this.inspectionStatusTwo = true;
                }
            }
        }
        if (this.serviceId == 6) {
            if (this.asignOneStatus) {
                if (!this.recurrenceSeventeen || !this.inspectorOne || !this.dateOne) {
                    this._snackBar.open('Select all fields in parking lot security checklist!', 'CLOSE', {
                        duration: 2000,
                    });
                    this.inspectionStatusOne = false;
                } else {
                    this.inspectionStatusOne = true;
                }
            }
            if (this.asignTwoStatus) {
                if (!this.recurrenceEighteen || !this.inspectorTwo || !this.dateTwo) {
                    this._snackBar.open('Select all fields in sidewalk inspection checklist!', 'CLOSE', {
                        duration: 2000,
                    });

                    this.inspectionStatusTwo = false;
                } else {
                    this.inspectionStatusTwo = true;
                }
            }
            if (this.asignThreeStatus) {
                if (!this.recurrenceNineteen || !this.inspectorThree || !this.dateThree) {
                    this._snackBar.open('Select all fields in customized inspection!', 'CLOSE', {
                        duration: 2000,
                    });

                    this.inspectionStatusThree = false;
                } else {
                    this.inspectionStatusThree = true;
                }
            }
        }
    }
    load() {
        this.map = 1;
    }
    /**FIND LATITUDE AND LONGITUDE */
    findLatLong() {
        if (this.parkName && this.parkAddress && this.parkState && this.parkCountry && this.parkZipCode) {
            this.address = this.parkName + '+' + this.parkAddress + '+' + this.parkState + '+' + this.parkCountry + '+' + this.parkZipCode;
            this._parksService.fetchLatLong(this.address + '&key=AIzaSyCUO5Kg5i9s_4O6jfnT7S93xm0HWd6ArGI')
                .subscribe(response => {
                    console.log(response);
                    console.log(response.status);
                    if (response.status === 'OK') {
                        this.parkLat = response.results['0'].geometry.location.lat;
                        this.parkLong = response.results['0'].geometry.location.lng;
                        this.zoom = 17;


                        this._snackBar.open('Please confirm your location!', 'CLOSE', {
                            duration: 5000,
                        });
                        console.log(this.parkLat);
                    } else {
                        this._snackBar.open('Please double check your address!', 'CLOSE', {
                            duration: 5000,
                        });
                    }
                })
        }
    }

    /** FUNCTION FOR LOADING CUSTOMIZED QUESTION SET */
    loadPlaygroundCustomizedQuestionSet(event, value) {
        if (event.checked === true) {
            const input = new FormData();
            input.append('token', this.authToken);
            input.append('serviceId', this.serviceId);
            this._parksService.checkExistCustomizedSet(input)
                .subscribe(response => {
                    if (response.response_code == 1) {
                        const input = new FormData();
                        input.append('token', this.authToken);
                        input.append('serviceId', this.serviceId);
                        this._questionSetService.fetchData(input)
                            .subscribe(response => {
                                console.log(response.data);
                                this.customizedQuestionSets = response.data;
                                const _dialog = this._mdDialog.open(viewCustDialog, { disableClose: true });
                                _dialog.componentInstance.customizedQuestionSets = this.customizedQuestionSets;
                                _dialog.afterClosed().subscribe(result => {
                                    // console.log('test     ' + _dialog.componentInstance.custQuestionSet);
                                    this.custQuestionSetValues = _dialog.componentInstance.custQuestionSet;
                                    //console.log('result   ' + this.custQuestionSetValues);

                                    if (value == '4' || value == '9' && this.custQuestionSetValues) {
                                        this.toggleAsignFour();
                                    } else if (value == '19' || value == '14' && this.custQuestionSetValues) {
                                        this.toggleAsignTwo();
                                    } else if (value == '12' || value == '17' && this.custQuestionSetValues) {
                                        this.toggleAsignThree();
                                    }
                                });
                            })

                    } else {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });
                    }
                })

            // console.log(value + '   ' + event.checked);
            /* const input = new FormData();
             input.append('token', this.authToken);
             input.append('serviceId', this.serviceId);
             this._questionSetService.fetchData(input)
                 .subscribe(response => {
                     console.log(response.data);
                     this.customizedQuestionSets = response.data;
                     const _dialog = this._mdDialog.open(viewCustDialog, { disableClose: true });
                     _dialog.componentInstance.customizedQuestionSets = this.customizedQuestionSets;
                     _dialog.afterClosed().subscribe(result => {
                         // console.log('test     ' + _dialog.componentInstance.custQuestionSet);
                         this.custQuestionSetValues = _dialog.componentInstance.custQuestionSet;
                         //console.log('result   ' + this.custQuestionSetValues);
 
                         if (value == '4' || value == '9' && this.custQuestionSetValues) {
                             this.toggleAsignFour();
                         } else if (value == '19' || value == '14' && this.custQuestionSetValues) {
                             this.toggleAsignTwo();
                         } else if (value == '12' || value == '17' && this.custQuestionSetValues) {
                             this.toggleAsignThree();
                         }
                     });
                 });*/
        }
    }

    /**ADD PARK */
    add() {
        //console.log(this.selectPark);
        this.checkAssignInspection();
        if (!this.inspectionStatusOne ||
            !this.inspectionStatusTwo ||
            !this.inspectionStatusThree ||
            !this.inspectionStatusFour ||
            !this.inspectionStatusAmenity ||
            !this.inspectionStatusVisual ||
            !this.inspectionStatusFive) {

        } else {
            this.btnStatus = false;
            this.btnLabel = 'Adding! Please wait...';
            this.btnLabelBuilding = 'Adding! Please wait...';
            // console.log(this.recurrenceOne);
            // console.log(this.recurrenceTwo);
            // console.log(this.recurrenceThree);
            // console.log('four    ' + this.recurrenceFour);

            // console.log(this.recurrenceFive);
            // console.log(this.recurrenceSix);
            // console.log(this.recurrenceSeven);
            // console.log(this.recurrenceEight);
            // console.log('ice ame' + this.recurrenceNine);


            /*console.log(this.inspectionType1);
            console.log(this.inspectionType2);
            console.log(this.inspectionType3);
            console.log(this.inspectionType4);
            console.log(this.inspectionType5);
            console.log(this.inspectionType6);
            console.log(this.inspectionType7);
            console.log(this.inspectionType8);
            console.log(this.inspectionType9);
            console.log(this.inspectionType10);
            console.log(this.inspectionType11);
            console.log(this.inspectionType12);
            console.log(this.inspectionType13);
            console.log(this.inspectionType14);
            console.log(this.inspectionType15);
            console.log(this.inspectionType16);
            console.log(this.inspectionType17);
            console.log(this.inspectionType18);
            console.log(this.inspectionType19);*/



            if (this.serviceOne === true) {
                this.parkServiceOne = '1';
            } else {
                this.parkServiceOne = 'undefined';
            }

            if (this.serviceTwo === true) {
                this.parkServiceTwo = '2';
            } else {
                this.parkServiceTwo = 'undefined';
            }

            if (this.serviceThree === true) {
                this.parkServiceThree = '3';
            } else {
                this.parkServiceThree = 'undefined';
            }
            if (this.serviceFour === true) {
                this.parkServiceFour = '4';
            } else {
                this.parkServiceFour = 'undefined';
            }
            if (this.serviceFive === true) {
                this.parkServiceFive = '5';
            } else {
                this.parkServiceFive = 'undefined';
            }
            if (this.serviceSix === true) {
                this.parkServiceSix = '6';
            } else {
                this.parkServiceSix = 'undefined';
            }

            /** CODE FOR FETCHING CUSTOMIZED QUESTIONSET FROM LOCAL STORAGE */
            this.custQuestionSet = localStorage.getItem('custQuestionSet');
            // console.log(this.custQuestionSet);


            const input = new FormData();
            input.append('token', this.authToken);
            input.append('serviceId', this.serviceId);

            /**park details */
            input.append('parkName', this.parkName);
            input.append('parkAddress', this.parkAddress);
            input.append('parkState', this.parkState);
            input.append('parkCity', this.parkCity);
            input.append('parkZipCode', this.parkZipCode);
            input.append('parkPhone', this.parkPhone);
            input.append('parkEmail', this.parkEmail);
            input.append('parkWebsite', this.parkWebsite);
            input.append('parkCategory', this.parkCategory);
            input.append('parkArea', this.parkArea);
            input.append('parkImage', this.imageFileLogo);
            input.append('parkBluePrint', this.imageFileLogoBlueprint);
            input.append('parkCountry', this.parkCountry);
            input.append('selectPark', this.selectPark);
            /**location data */
            input.append('latitude', this.parkLat);
            input.append('longitude', this.parkLong);

            /**park equipments */
            input.append('parkEquipment', this.parkEquipment);

            /** Park services */
            input.append('parkServiceOne', this.parkServiceOne);
            input.append('parkServiceTwo', this.parkServiceTwo);
            input.append('parkServiceThree', this.parkServiceThree);
            input.append('parkServiceFour', this.parkServiceFour);
            input.append('parkServiceFive', this.parkServiceFive);
            input.append('parkServiceSix', this.parkServiceSix);



            /**park inspection */
            input.append('recurrenceOne', this.recurrenceOne);
            input.append('recurrenceTwo', this.recurrenceTwo);
            input.append('recurrenceThree', this.recurrenceThree);
            input.append('recurrenceFour', this.recurrenceFour);
            input.append('recurrenceFive', this.recurrenceFive);
            input.append('recurrenceSix', this.recurrenceSix);
            input.append('recurrenceSeven', this.recurrenceSeven);
            input.append('recurrenceEight', this.recurrenceEight);
            input.append('recurrenceNine', this.recurrenceNine);
            input.append('recurrenceTen', this.recurrenceTen);
            input.append('recurrenceEleven', this.recurrenceEleven);
            input.append('recurrenceTwelve', this.recurrenceTwelve);
            input.append('recurrenceThirteen', this.recurrenceThirteen);
            input.append('recurrenceFourteen', this.recurrenceFourteen);
            input.append('recurrenceFifteen', this.recurrenceFifteen);
            input.append('recurrenceSixteen', this.recurrenceSixteen);
            input.append('recurrenceSeventeen', this.recurrenceSeventeen);
            input.append('recurrenceEighteen', this.recurrenceEighteen);
            input.append('recurrenceNineteen', this.recurrenceNineteen);
            input.append('recurrenceAmenity', this.recurrenceAmenity);
            input.append('recurrenceVisual', this.recurrenceVisual);

            /** CUSTOMIZED QUESTIONSET */
            input.append('custQuestionSet', this.custQuestionSet);

            input.append('inspectorOne', this.inspectorOne);
            input.append('inspectorTwo', this.inspectorTwo);
            input.append('inspectorThree', this.inspectorThree);
            input.append('inspectorFour', this.inspectorFour);
            input.append('inspectorFive', this.inspectorFive);
            input.append('inspectorAmenity', this.inspectorAmenity);
            input.append('inspectorVisual', this.inspectorVisual);

            input.append('priorityOne', this.priorityOne);
            input.append('priorityTwo', this.priorityTwo);
            input.append('priorityThree', this.priorityThree);
            input.append('priorityFour', this.priorityFour);
            input.append('priorityFive', this.priorityFive);
            input.append('priorityAmenity', this.priorityAmenity);
            input.append('priorityVisual', this.priorityVisual);


            let inspctdat: any;
            let inspctdat1: any;
            let inspctdat2: any;
            let inspctdat3: any;
            let inspctdat4: any;
            let inspctdatAmenity: any;
            let inspctdatVisual: any;

            console.log(this.dateOne);
            if (this.asignOneStatus) {
                const year = this.dateOne.getFullYear();
                const month = this.dateOne.getMonth() + 1;
                const day = this.dateOne.getDate();
                inspctdat = year + "-" + month + "-" + day;
                console.log(inspctdat);
            }
            if (this.asignTwoStatus) {
                const year1 = this.dateTwo.getFullYear();
                const month1 = this.dateTwo.getMonth() + 1;
                const day1 = this.dateTwo.getDate();
                inspctdat1 = year1 + "-" + month1 + "-" + day1;
                console.log(inspctdat1);
            }
            if (this.asignThreeStatus) {
                const year2 = this.dateThree.getFullYear();
                const month2 = this.dateThree.getMonth() + 1;
                const day2 = this.dateThree.getDate();
                inspctdat2 = year2 + "-" + month2 + "-" + day2;
            }
            if (this.asignFourStatus) {
                const year3 = this.dateFour.getFullYear();
                const month3 = this.dateFour.getMonth() + 1;
                const day3 = this.dateFour.getDate();
                inspctdat3 = year3 + "-" + month3 + "-" + day3;
            }
            if (this.asignFiveStatus) {
                const year4 = this.dateFive.getFullYear();
                const month4 = this.dateFive.getMonth() + 1;
                const day4 = this.dateFive.getDate();
                inspctdat4 = year4 + "-" + month4 + "-" + day4;
            }
            if (this.asignAmenityStatus) {
                const yearAmenity = this.dateAmenity.getFullYear();
                const monthAmenity = this.dateAmenity.getMonth() + 1;
                const dayAmenity = this.dateAmenity.getDate();
                inspctdatAmenity = yearAmenity + "-" + monthAmenity + "-" + dayAmenity;
            }
            if (this.asignVisualStatus) {
                const yearVisual = this.dateVisual.getFullYear();
                const monthVisual = this.dateVisual.getMonth() + 1;
                const dayVisual = this.dateVisual.getDate();
                inspctdatVisual = yearVisual + "-" + monthVisual + "-" + dayVisual;
            }

            input.append('dateOne', inspctdat);
            input.append('dateTwo', inspctdat1);
            input.append('dateThree', inspctdat2);
            input.append('dateFour', inspctdat3);
            input.append('dateFive', inspctdat4);
            input.append('dateAmenity', inspctdatAmenity);
            input.append('dateVisual', inspctdatVisual);

            // console.log(inspctdat);
            // console.log(inspctdat1);
            // console.log(inspctdat2);


            this._parksService.addPark(input)
                .subscribe(response => {
                    if (response.response_code == 1) {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });

                        // Remove local storage data
                        this._dialog.close();
                        localStorage.removeItem('custQuestionSet');
                    } else {
                        this._snackBar.open(response.message, 'CLOSE', {
                            duration: 5000,
                        });
                        this.btnStatus = true;
                        this.btnLabel = 'Add new park';
                        this.btnLabelBuilding = 'Add new building';
                    }
                })
        }
    }


    /**VALIDATE LOGO IMAGE FILE */
    fileEventLogo(fileInput: any) {
        this.imageFileLogo = fileInput.target.files[0];
        if (this.imageFileLogo.type === 'image/jpeg' || this.imageFileLogo.type === 'image/png' || this.imageFileLogo.type === 'image/gif'
            || this.imageFileLogo.type === 'image/jpg') {
            this.imageFileStatusLogo = true;
        } else {
            this._snackBar.open('Please select an image file!', 'CLOSE', {
                duration: 2000,
            });
            this.imageFileLogo = '';
            this.imageFileStatusLogo = false;
        }
    }

    /**VALIDATE BLUE PRINT IMAGE FILE */
    fileEventBlueprint(fileInput: any) {
        this.imageFileLogoBlueprint = fileInput.target.files[0];
        if (this.imageFileLogoBlueprint.type === 'image/jpeg' || this.imageFileLogoBlueprint.type === 'image/png' || this.imageFileLogoBlueprint.type === 'image/gif'
            || this.imageFileLogoBlueprint.type === 'image/jpg') {
            this.imageFileStatusBlueprint = true;
        } else {
            this._snackBar.open('Blueprint needs be an image file', 'CLOSE', {
                duration: 2000,
            });
            this.imageFileLogoBlueprint = '';
            this.imageFileStatusBlueprint = false;
        }
    }

    /**FETCH RECCURENCE */
    fetchRecurrence() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchRecurrence(input)
            .subscribe(response => {
                this.recurrences = response.data;
                console.log(this.recurrences)
            })

    }

    /**FETCH INSPECTORS */
    fetchInspectors() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchInspectors(input)
            .subscribe(response => {
                this.inspectors = response.data;
            });
    }

    /** FETCH INSPECTION TYPES */
    fetchInspectionTypes() {
        this.authToken = this._utils.fetchAuthtokenTokenString();
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._questionService.fetchInspectionType(input)
            .subscribe(response => {
                console.log(response.data);
                this.inspectionTypes = response.data;
                console.log('inspectiontype');
                this.inspectionType1 = this.inspectionTypes[0].inspectiontype;
                this.inspectionType2 = this.inspectionTypes[1].inspectiontype;
                this.inspectionType3 = this.inspectionTypes[2].inspectiontype;

            });
    }

    /**Fetch Country */
    fetchCountry() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchCountry(input)
            .subscribe(response => {
                const countryData = response.data;
                this.countryCode = countryData.countryCode;
                this.countryName = countryData.country;
                console.log(this.countryCode);
                //this.cities = response.data;
            });

    }

    /**FETCH CITIES */
    fetchCities() {
        this.cities = [];
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchCities(input)
            .subscribe(response => {
                const mycity = response.data;
                console.log(mycity);
                const len = mycity.length;
                for (let i = 0; i < len; i++) {
                    console.log(mycity[i].state);
                    console.log(this.parkState);

                    if (mycity[i].state === this.parkState) {
                        this.cities.push({
                            city: mycity[i].city,
                            id: mycity[i].id
                        });
                    }

                }
                //this.cities = response.data;
            });
    }

    /**FETCH AREAS */
    fetchAreas() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._parksService.fetchAreas(input)
            .subscribe(response => {
                this.areas = response.data;
            })

    }

    /**FETCH CATEGORIES */
    fetchParkCategory() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._parksService.fetchParkCategory(input)
            .subscribe(response => {
                this.categories = response.data;
            })

    }

    /**FETCH ALL SELECTED COUNTRIES */
    fetchSelectedCountries() {
        this._parksService.fetchSelectedCountries()
            .subscribe(response => {
                this.countries = response;
            });
    }

    /**FETCH STATE */
    fetchState(value: any) {
        console.log(value);
        this._parksService.fetchStates(value)
            .subscribe(response => {
                this.allStates = response;
                this.countrySelected = true;
            });
    }


    /**FETCH PARK NAME */
    selectParks() {
        const input = new FormData();
        input.append('token', this.authToken);
        input.append('serviceId', this.serviceId);
        this._parksService.fetchPark(input)
            .subscribe(response => {
                console.log(response);
                this.allParks = response.data[0].parks;
                console.log(this.allParks);
            });
    }

    /**FETCH EQUIPMENTS */
    fetchEquipments() {
        const input = new FormData();
        input.append('token', this.authToken);
        this._parksService.fetchEquipments(input)
            .subscribe(response => {
                this.equipments = response.data;
                console.log(this.equipments);
            })
    }



    /**ADD NEW AREA */
    addNewArea() {
        const add = this._mdDialog.open(AddAreaDialog, { disableClose: true });
        add.afterClosed().subscribe(result => {
            this.fetchAreas();
        });
    }

    /**ADD NEW CATEGORY */
    addNewCategory() {
        const add = this._mdDialog.open(AddParkCategoryDialog, { disableClose: true });
        add.afterClosed().subscribe(result => {
            this.fetchParkCategory();
        });
    }


    /**ADD NEW CITY */
    addNewCity() {
        const add = this._mdDialog.open(AddCityDetailsDialog, { disableClose: true });
        add.afterClosed().subscribe(result => {
            this.fetchCities();
        });
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        this.latAndLog = $event;
        this.loadingStatus = true;
        this.parkLat = this.latAndLog['coords'].lat;
        this.parkLong = this.latAndLog['coords'].lng;
        this.loadingStatus = false;

    }
    /*CLOSE DIALOG*/
    close() {
        this._dialog.close();
    }
    funshowme() {
        this.showme = true;
    }
    funhideme() {
        this.showme = false;
    }
    public filesSelect(selectedFiles: Ng4FilesSelected): void {
        if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
            this.selectedFiles = selectedFiles.status;
            return;
        }

        // Handle error statuses here

        this.selectedFiles = Array.from(selectedFiles.files).map(file => {
            // Load the image in
            console.log(file);
            this.imageFileLogo = file;
            if (file.size > 5000000) {
                this._snackBar.open('Maximum size 5MB', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFileLogo = '';
                this.imageFileStatusLogo = false;
            }
            else if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
                || file.type === 'image/jpg') {
                this.imageFileStatusLogo = true;
                this.imageShown = true;
                this.divshown = true;


                let fileReader = new FileReader();
                fileReader.onload = () => {

                    // Set and show the image
                    this.currentProfileImage = fileReader.result;

                };
                this.openDialog(file);
                // Read in the file
                fileReader.readAsDataURL(file);

            }
            else {
                this._snackBar.open('The file you are selected is not acceptable', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFileLogo = '';
                this.imageFileStatusLogo = false;
            }



        });
    }

    public filesSelect2(selectedFiles: Ng4FilesSelected): void {
        if (selectedFiles.status !== Ng4FilesStatus.STATUS_SUCCESS) {
            this.selectedFiles2 = selectedFiles.status;
            return;
        }

        // Handle error statuses here

        this.selectedFiles2 = Array.from(selectedFiles.files).map(file => {
            // Load the image in
            this.imageFileLogoBlueprint = file;
            if (file.size > 5000000) {
                this._snackBar.open('Maximum size 5MB', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFileLogoBlueprint = '';
                this.imageFileStatusBlueprint = false;
            }
            else if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
                || file.type === 'image/jpg') {
                this.imageFileStatusBlueprint = true;
                this.imageShown2 = true;
                this.divshown2 = true

                let fileReader = new FileReader();
                fileReader.onload = () => {
                    // Set and show the image
                    this.currentProfileImage2 = fileReader.result;

                };
                // Read in the file
                fileReader.readAsDataURL(file);


            }
            else {
                this._snackBar.open('The file you are selected is not acceptable', 'CLOSE', {
                    duration: 6000,
                });
                this.imageFileLogoBlueprint = '';
                this.imageFileStatusBlueprint = false;
            }

        });
    }
    openDialog(file: any): void {
        let dialogRef = this._mdDialog.open(CropimageDialog, {

            data: { image: file }
        });

        dialogRef.afterClosed().subscribe(result2 => {


            if (result2 !== undefined) {


                this.imageFileLogo = result2;
                this.currentProfileImage = result2;


            } else {
                this.currentProfileImage = "";
                this.imageShown = false;
                this.divshown = false;
            }

        });
    }

    // FUNCTION FOR CHANGING text W R TO SERVICES
    textName() {
        this.serviceId = this._utils.fetchServiceId();

        if (this.serviceId === '1') {
            this.headName = 'Add New Park';
            this.Wizhead = 'Park details';
            this.parkLogo = 'Park Logo';


        } else if (this.serviceId === '2') {
            this.headName = 'Add New Park';
            this.Wizhead = 'Park details';
            this.parkLogo = 'Park Logo';



        } else if (this.serviceId === '3') {
            this.headName = 'Add New Building';
            this.Wizhead = 'Building details';
            this.parkLogo = 'Building Logo';




        } else if (this.serviceId === '4') {
            this.headName = 'Add New Park';
            this.Wizhead = 'Park details';
            this.parkLogo = 'Park Logo';



        } else if (this.serviceId === '5') {
            this.headName = 'Add New Park';
            this.Wizhead = 'Park details';
            this.parkLogo = 'Park Logo';



        } else if (this.serviceId === '6') {
            this.headName = 'Add New Park';
            this.Wizhead = 'Park details';
            this.parkLogo = 'Park Logo';


        }
    }


}

// just an interface for type safety.
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
@Component({

    templateUrl: 'cropimage.html',
})
export class CropimageDialog {

    imagedata: any;
    fileimage: any;
    cropperSettings: CropperSettings;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;

    constructor(
        public dialogRef: MatDialogRef<CropimageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 150;
        this.cropperSettings.height = 150;
        this.cropperSettings.croppedWidth = 150;
        this.cropperSettings.croppedHeight = 150;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.keepAspect = false;

        var image: any = new Image();
        var file: File = data.image;
        var myReader: FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent: any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };
        console.log(that.fileimage);
        myReader.readAsDataURL(file);

        this.imagedata = { image: image.src, file: data.image };
    }

    cancelme() {


        this.dialogRef.close();
    }
    saveme() {

        this.dialogRef.close();
    }
}
