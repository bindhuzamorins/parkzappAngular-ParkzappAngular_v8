import { SendMailComponent } from './components/page/combined-report/sendMail/sendMail.component';
import { ViewMoreAssessmentDialog } from './components/page/assessmentReport/viewReport/viewMore.template';
import { mailDialog } from './components/page/assessmentReport/mail/mail.template';
import { ViewParkChecklistDialog } from './components/page/parks/viewChecklist/viewChecklist.template';
import { ViewAmenitiesDialog } from './components/page/parks/viewAmenities/viewAmenities.template';
import { DeleteAmenityDetailsDialog } from './components/page/amenities/delete/delete.template';
import { EditAmenityDetailsDialog } from './components/page/amenities/edit/edit.template';
import { AddAmenityDetailsDialog } from './components/page/amenities/add/add.template';
import { DeleteEmailDetailsDialog } from './components/page/emails/delete/delete.template';
import { EditEmailDetailsDialog } from './components/page/emails/edit/edit.template';
import { AddEmailDetailsDialog } from './components/page/emails/add/add.template';
import { PurchaseComponent } from './components/page/purchase/purchase.component';
import { StripePaymentDialog } from './components/page/planList/stripePayment/stripePayment.template';
import { UpgradePlanDialog } from './components/page/planList/upgradePlan/upgradePlan.template';
import { CustomPaymentDialog } from './components/page/planList/customPayment/customPayment.template';
import { PlanMoreDetailsDialog } from './components/page/planList/moreDetails/moreDetails.template';
import { pendingWorkOrderDetailsDialog } from './components/page/workOrder/pendingWorkorders/view/view.template';
import { WorkOrderDetailsDialog } from './components/page/workOrder/finishedWorkorders/view/view.template';
import { AddParkCategoryDialog } from './components/page/parks/add/addCategory/addCategory.template';
import { AddAreaDialog } from './components/page/parks/add/addArea/addArea.template';
import { ViewParkReportDialog } from './components/page/parkHistory/viewReport/viewReport.template';
import { VideoDialog } from './components/page/helpVideo/video/video.template';
import { SentMailDialog } from './components/page/inspectionReport/sentMail/mail.template';
import { ViewMoreDialog } from './components/page/inspectionReport/viewMore/viewMore.template';
import { EditInspectionDialog } from './components/page/parks/viewInspections/edit/editInspection.template';
import { AddInspectionDialog } from './components/page/parks/viewInspections/add/addInspection.template';
import { ViewComplaintDetailsDialog } from './components/page/userComplaints/viewMore/viewMore.template';
import { RegisterComplaintDialog } from './components/page/contactUs/registerComplaint/registerComplaint.template';
import { DeclineDialog } from './components/page/reports/inspectionRequest/decline/decline.template';
import { ApproveDialog } from './components/page/reports/inspectionRequest/approve/approve.template';
import { EditParkDetailsDialog } from './components/page/parks/edit/edit.template';
import { CropimageeditDialog } from './components/page/parks/edit/edit.template';
import { ViewRecordsDialog } from './components/page/parks/viewRecords/viewRecords.template';
import { ViewEquipmentsDialog } from './components/page/parks/viewEquipments/viewEquipments.template';
import { ViewInspectionsDialog } from './components/page/parks/viewInspections/viewInspections.template';
import { ViewInspectorsDialog } from './components/page/parks/viewInspectors/viewInspectors.template';
import { AddParkDialog } from './components/page/parks/add/add.template';
import { CropimageDialog } from './components/page/parks/add/add.template';
import { MapParkDialog } from './components/page/parks/map/map.template';
import { AddQuestionDetailsDialog } from './components/page/questions/add/add.template';
import { EditQuestionDetailsDialog } from './components/page/questions/edit/edit.template';
import { ViewParkDialog } from './components/page/parks/view/view.template';
import { DeleteRecordDialog } from './components/page/records/delete/delete.template';
import { AddRecordDialog } from './components/page/records/add/add.template';
import { ViewRecordDialog } from './components/page/records/view/view.template';
import { EditRecurrenceDialog } from './components/page/recurrence/edit/edit.template';
import { DeleteRecurrenceDialog } from './components/page/recurrence/delete/delete.template';
import { AddRecurrenceDialog } from './components/page/recurrence/add/add.template';
import { ViewParksUserDialog } from './components/page/users/viewParks/viewParks.template';
import { DeleteUserDialog } from './components/page/users/delete/delete.template';
import { EditUserDialog } from './components/page/users/edit/edit.template';
import { CropimageusereditDialog } from './components/page/users/edit/edit.template';
import { AddUserDialog } from './components/page/users/add/add.template';
import { CropimageuseraddDialog } from './components/page/users/add/add.template';
import { ViewMoreUserDialog } from './components/page/users/viewMore/viewMore.template';
import { DeleteMoreCityDetailsDialog } from './components/page/city/delete/delete.template';
import { AddCityDetailsDialog } from './components/page/city/add/add.template';
import { CropimagecityDialog } from './components/page/city/add/add.template';
import { editCityDetailsDialog } from './components/page/city/edit/edit.template';
import { CropimagecityeditDialog } from './components/page/city/edit/edit.template'
import { ViewMoreCityDetailsDialog } from './components/page/city/viewMore/viewMore.template';
import { PrivacyPolicyDialog } from './components/page/login/privacyPolicy/privacyPolicy.template';
import { ForgotPasswordDialog } from './components/page/login/forgotPassword/forgotPassword.template';
import { DeleteInspectionDialog } from 'app/components/page/parks/viewInspections/delete/delete.template';
import { ResetPasswordDialog } from './resetpassword/resetpassword.template';
import { mfrDialog } from 'app/components/page/parks/viewEquipments/mfr/mfr.template';
import { AddNewMailDialog } from 'app/components/page/userComplaints/AddNewMail/AddNewMail.template';
import { bluePrintDialog } from './components/page/parks/bluePrint/bluePrint.template';
import { NewServicesDialog } from './components/page/newServices/newServices.templete';
import { MapServicesDialog } from './components/page/mapServices/mapServices.templete';
import { addQuestionSetDialog } from './components/page/customizedQuestion/QuestionSet/add/add.template';
import { EditQuestionSetDialog } from './components/page/customizedQuestion/QuestionSet/edit/edit.template';
import { DeleteQuestionSetDialog } from './components/page/customizedQuestion/QuestionSet/delete/delete.template';
import { AddCustomQuestionDialog } from './components/page/customizedQuestion/customQuestion/add/add.template';
import { EditCustomQuestionDialog } from './components/page/customizedQuestion/customQuestion/edit/edit.template';
import { DeleteCustomQuestionDialog } from './components/page/customizedQuestion/customQuestion/delete/delete.template';
import { viewCustDialog } from './components/page/parks/add/addQuestionSet/addQuestionSet.template';
import { viewCustomDialog } from './components/page/parks/viewInspections/add/addQuestionSet/addQuestionSet.template';
import { ViewNoteDialog } from './components/page/workOrder/pendingWorkorders/viewNote/viewNote.component';
import { ReassignDialog } from './components/page/workOrder/pendingWorkorders/reassign/reassign.component';
import { ViewAmenityInspectionsDialog } from './components/page/amenities/viewInspections/viewInspections.component';
import { AddAminityInspectionDialog } from './components/page/amenities/viewInspections/add/add.component';
import { ViewAmenityInspectorDialog } from './components/page/amenities/viewAmenityInspector/viewAmenityInspector.component';
import { SentMailParkHistoryDialog } from './components/page/parkHistory/sentMail/sentMail.component';
import { ViewMapComponent } from './components/page/inspectionReport/viewMap/viewMap.component';
import { ParkAreaComponent } from './components/page/park-area/park-area.component';
import { EditParkAreaComponent } from './components/page/park-area/edit-park-area/edit-park-area.component';
import { DeleteParkAreaComponent } from './components/page/park-area/delete-park-area/delete-park-area.component';
import { ParkCategoryComponent } from './components/park-category/park-category.component';
import { UpdateParkCategoryComponent } from './components/park-category/update-park-category/update-park-category.component';
import { DeleteParkCategoryComponent } from './components/park-category/delete-park-category/delete-park-category.component';
import { GeneralReportsComponent } from './components/page/general-reports/general-reports.component';
import { AddInspectionNoteComponent } from './components/page/inspectionNote/add-inspection-note/add-inspection-note.component';
import { ViewInspectionNoteComponent } from './components/page/inspectionNote/view-inspection-note/view-inspection-note.component';
import { CombinedReportComponent } from './components/page/combined-report/combined-report.component';
import { ViewCombinedReportComponent } from './components/page/combined-report/view-combined-report/view-combined-report.component';


export const templateDeclaration = [
    
    PurchaseComponent,AddParkCategoryDialog,
    AddAreaDialog, AddParkDialog,
    DeleteInspectionDialog, EditInspectionDialog,
    AddInspectionDialog, 
    EditParkDetailsDialog, ViewRecordsDialog, ViewComplaintDetailsDialog,
    ViewEquipmentsDialog, ViewInspectionsDialog,
    ViewInspectorsDialog, ViewParkDialog, 
    MapParkDialog, ViewParkChecklistDialog, 
    mfrDialog,CropimageDialog, CropimageeditDialog, bluePrintDialog,
    ViewAmenityInspectionsDialog, AddAminityInspectionDialog, ViewAmenityInspectorDialog, ViewAmenitiesDialog,
    DeleteAmenityDetailsDialog, EditAmenityDetailsDialog, AddAmenityDetailsDialog,
    DeleteMoreCityDetailsDialog, AddCityDetailsDialog, CropimagecityDialog,
    editCityDetailsDialog, CropimagecityeditDialog, ViewMoreCityDetailsDialog,
    PrivacyPolicyDialog, ForgotPasswordDialog,NewServicesDialog, MapServicesDialog,
    CombinedReportComponent, ViewCombinedReportComponent, AddInspectionNoteComponent,
    ViewInspectionNoteComponent, ViewMapComponent, SentMailDialog, ViewMoreDialog,
    SentMailParkHistoryDialog, ViewParkReportDialog, DeleteRecordDialog, AddRecordDialog,
    ViewRecordDialog, ViewMoreAssessmentDialog, mailDialog, AddQuestionDetailsDialog,
    EditQuestionDetailsDialog, GeneralReportsComponent, ResetPasswordDialog, addQuestionSetDialog,
    EditQuestionSetDialog,DeleteQuestionSetDialog, AddCustomQuestionDialog, EditCustomQuestionDialog,
    DeleteCustomQuestionDialog, DeleteEmailDetailsDialog,EditEmailDetailsDialog, AddEmailDetailsDialog,
    DeclineDialog, ApproveDialog, EditRecurrenceDialog, DeleteRecurrenceDialog, AddRecurrenceDialog,
    pendingWorkOrderDetailsDialog, WorkOrderDetailsDialog, ViewNoteDialog, ReassignDialog, ViewParksUserDialog,
    DeleteUserDialog, EditUserDialog, CropimageusereditDialog, AddUserDialog, CropimageuseraddDialog, ViewMoreUserDialog,
    AddNewMailDialog, ParkAreaComponent, EditParkAreaComponent, DeleteParkAreaComponent, ParkCategoryComponent,
    UpdateParkCategoryComponent, DeleteParkCategoryComponent, VideoDialog, RegisterComplaintDialog, StripePaymentDialog,
    UpgradePlanDialog, CustomPaymentDialog, PlanMoreDetailsDialog, SendMailComponent, viewCustDialog,
     viewCustomDialog

];


export const templateEntry = [
    EditInspectionDialog,
    DeleteInspectionDialog, AddParkCategoryDialog,AddParkDialog,
    AddAreaDialog, AddInspectionDialog,
    EditParkDetailsDialog, ViewRecordsDialog, ViewAmenitiesDialog,ViewComplaintDetailsDialog,
    ViewEquipmentsDialog, ViewInspectionsDialog, ViewInspectorsDialog, ViewParkDialog, MapParkDialog,
     ViewParkChecklistDialog,
    CropimageDialog, CropimageeditDialog,mfrDialog,bluePrintDialog, ViewAmenityInspectionsDialog,
    AddAminityInspectionDialog, ViewAmenityInspectorDialog, DeleteAmenityDetailsDialog,
    EditAmenityDetailsDialog, AddAmenityDetailsDialog, DeleteMoreCityDetailsDialog,
    AddCityDetailsDialog, CropimagecityDialog, editCityDetailsDialog,
    CropimagecityeditDialog, ViewMoreCityDetailsDialog, PrivacyPolicyDialog, ForgotPasswordDialog,
    NewServicesDialog, MapServicesDialog, CombinedReportComponent, ViewCombinedReportComponent, 
    AddInspectionNoteComponent, ViewInspectionNoteComponent, ViewMapComponent,
    SentMailDialog, ViewMoreDialog, SentMailParkHistoryDialog, ViewParkReportDialog,
    DeleteRecordDialog, AddRecordDialog, ViewRecordDialog, ViewMoreAssessmentDialog, mailDialog,
    AddQuestionDetailsDialog, EditQuestionDetailsDialog, GeneralReportsComponent, ResetPasswordDialog,
    addQuestionSetDialog, EditQuestionSetDialog, DeleteQuestionSetDialog, AddCustomQuestionDialog,
    EditCustomQuestionDialog, DeleteCustomQuestionDialog, DeleteEmailDetailsDialog, EditEmailDetailsDialog,
    AddEmailDetailsDialog, DeclineDialog, ApproveDialog, EditRecurrenceDialog, DeleteRecurrenceDialog, AddRecurrenceDialog,
    pendingWorkOrderDetailsDialog, WorkOrderDetailsDialog, ViewNoteDialog, ReassignDialog, ViewParksUserDialog,
    DeleteUserDialog, EditUserDialog, CropimageusereditDialog, AddUserDialog, CropimageuseraddDialog, ViewMoreUserDialog,
    AddNewMailDialog, ParkAreaComponent, EditParkAreaComponent, DeleteParkAreaComponent, ParkCategoryComponent,
    UpdateParkCategoryComponent, DeleteParkCategoryComponent, VideoDialog, RegisterComplaintDialog, StripePaymentDialog,
    UpgradePlanDialog, CustomPaymentDialog, PlanMoreDetailsDialog, PurchaseComponent, SendMailComponent, viewCustDialog,
    viewCustomDialog, 

];
