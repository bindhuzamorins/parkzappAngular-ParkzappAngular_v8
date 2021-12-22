/*
import { AboutUsComponent } from './components/page/aboutUs/aboutUs.component';
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParksComponent } from './components/page/parks/parks.component';
import { AboutUsComponent } from './components/page/aboutUs/aboutUs.component';
import { AmenitiesComponent } from './components/page/amenities/amenities.component';
import { CityComponent } from './components/page/city/city.component';
import { LoginComponent } from './components/page/login/login.component';
import { CombinedReportComponent } from './components/page/combined-report/combined-report.component';
import { InspectionReportComponent } from './components/page/inspectionReport/inspectionReport.component';
import { ParkHistoryComponent } from './components/page/parkHistory/parkHistory.component';
import { RecordsComponent } from './components/page/records/records.component';
import { AssessmentReportComponent } from './components/page/assessmentReport/assessmentReport.component';
import { QuestionsComponent } from './components/page/questions/questions.component';
import { GeneralReportsComponent } from './components/page/general-reports/general-reports.component';
import { HomeComponent } from './components/page/home/home.component';
import { QuestionSetComponent } from './components/page/customizedQuestion/QuestionSet/QuestionSet.component';
import { CustomQuestionComponent } from './components/page/customizedQuestion/customQuestion/customQuestion.component';
import { CustomizedQuestionComponent } from './components/page/customizedQuestion/customizedQuestion.component';
import { EmailsComponent } from './components/page/emails/emails.component';
import { InspectionRequestComponent } from './components/page/reports/inspectionRequest/inspectionRequest.component';
import { InspectionDueComponent } from './components/page/reports/inspectionDue/inspectionDue.component';
import { ReportsComponent } from './components/page/reports/reports.component';
import { RecurrenceComponent } from './components/page/recurrence/recurrence.component';
import { PendingWorkordersComponent } from './components/page/workOrder/pendingWorkorders/pendingWorkorders.component';
import { FinishedWorkordersComponent } from './components/page/workOrder/finishedWorkorders/finishedWorkorders.component';
import { GenerateWorkorderComponent } from './components/page/workOrder/generateWorkorder/generateWorkorder.component';
import { WorkOrderComponent } from './components/page/workOrder/workOrder.component';
import { UsersComponent } from './components/page/users/users.component';
import { UserComplaintsComponent } from './components/page/userComplaints/userComplaints.component';
import { SetupComponent } from './components/page/setup/setup.component';
import { ParkAreaComponent } from './components/page/park-area/park-area.component';
import { ParkCategoryComponent } from './components/park-category/park-category.component';
import { HelpComponent } from './components/page/help/help.component';
import { HelpVideoComponent } from './components/page/helpVideo/helpVideo.component';
import { HelpDocumentsComponent } from './components/page/helpDocuments/helpDocuments.component';
import { ContactUsComponent } from './components/page/contactUs/contactUs.component';
import { FreeTrialRegistrationComponent } from './components/page/freeTrialRegistration/freeTrialRegistration.component';
import { PageNotFoundComponent } from './components/page/pageNotFound/pageNotFound.component';
import { PlanListComponent } from './components/page/planList/planList.component';
import { PurchaseComponent } from './components/page/purchase/purchase.component';

/** INCLUDE PATH IN ROUTES */
const routes: Routes = [
    { path: 'parks', component: ParksComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },
    // { path: 'reports', component: GeneralReportsComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'amenities', component: AmenitiesComponent },
    { path: 'city', component: CityComponent },
    { path: 'combinedReport', component: CombinedReportComponent },
    { path: 'inspectionReport', component: InspectionReportComponent },
    { path: 'parkHistory', component: ParkHistoryComponent },
    { path: 'records', component: RecordsComponent },
    { path: 'assessmentReport', component: AssessmentReportComponent },
    { path: 'questions', component: QuestionsComponent },
    { path: 'generalReport', component: GeneralReportsComponent },
    { path: 'home', component: HomeComponent },
    { path: 'QuestionSet', component: QuestionSetComponent },
    { path: 'CustomQuestion', component: CustomQuestionComponent },
    { path: 'customizedQuestion', component: CustomizedQuestionComponent },
    { path: 'emails', component: EmailsComponent },
    { path: 'inspectionRequest', component: InspectionRequestComponent },
    { path: 'due', component: InspectionDueComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'recurrence', component: RecurrenceComponent },
    { path: 'workOrder', component: WorkOrderComponent },
    { path: 'users', component: UsersComponent },
    { path: 'usercomplaints', component: UserComplaintsComponent },
    { path: 'setup', component: SetupComponent },
    { path: 'area', component: ParkAreaComponent },
    { path: 'category', component: ParkCategoryComponent },
    { path: 'help', component: HelpComponent },
    { path: 'video', component: HelpVideoComponent },
    { path: 'helpDocuments', component: HelpDocumentsComponent },
    { path: 'contactUs', component: ContactUsComponent },
    { path: 'freeTrialRegistration', component: FreeTrialRegistrationComponent },
    { path: 'planList', component: PlanListComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: '**', component: PageNotFoundComponent },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }

/**ADD COMPONENTS IN routingComponents */
//export const routingComponents = [AmenitiesComponent, AboutUsComponent, ParksComponent];
export const routingComponents = [ParksComponent, AboutUsComponent, AmenitiesComponent, CityComponent, LoginComponent, InspectionReportComponent, ParkHistoryComponent, RecordsComponent, AssessmentReportComponent, QuestionsComponent, HomeComponent, QuestionSetComponent, CustomQuestionComponent, CustomizedQuestionComponent, EmailsComponent, InspectionRequestComponent, InspectionDueComponent, ReportsComponent, RecurrenceComponent,
                                  PendingWorkordersComponent, FinishedWorkordersComponent, GenerateWorkorderComponent, WorkOrderComponent, UsersComponent, UserComplaintsComponent, SetupComponent, HelpComponent, HelpVideoComponent, HelpDocumentsComponent, ContactUsComponent, FreeTrialRegistrationComponent, PageNotFoundComponent, PlanListComponent, PurchaseComponent];
