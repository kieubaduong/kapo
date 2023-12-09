import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppIconButtonComponent } from './common/app-icon-button/app-icon-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './common/error-dialog/error-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import {
  OffsetTopDirective,
  QuizComponent,
  ScrollableDirective,
} from './quiz/quiz.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PointsTooltipComponent } from './common/custom-tooltip/points-tooltip.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { QuizStructurePreviewComponent } from './common/preview-container/quiz-structure-preview/quiz-structure-preview.component';
import { SlideStructurePreviewComponent } from './common/preview-container/slide-structure-preview/slide-structure-preview.component';
import { TrueFalseQuizStructurePreviewComponent } from './common/preview-container/true-false-quiz-structure-preview/true.false.quiz.preview.component';
import { QuizFieldComponent } from './common/combine-select-field/quiz-field/quiz.field.component';
import { TrueFasleQuizFieldComponent } from './common/combine-select-field/true-fasle-quiz-field/true.fasle.quiz.field.component';
import { AnswerOptionsComponent } from './common/select-field/answer-options-component/answer.options.component';
import { PointsComponent } from './common/select-field/points-component/points.component';
import { TimeLimitComponent } from './common/select-field/time-limit-component/time.limit.component';
import { AnswerComponent } from './common/answer/answer.component';
import { TofAnswerComponent } from './common/tof-answer/tof-answer.component';
import { TextAnswerComponent } from './common/text-answer/text-answer.component';
import { AddQuestionDialogComponent } from './common/add-question-dialog/add.question.dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuizValidationErrorDialogComponent } from './common/quiz-validation-error-dialog/quiz-validation-error-dialog.component';
import { FinalizeKapoDialogComponent } from './common/finalize-kapo-dialog/finalize-kapo-dialog.component';
import { DeleteKapoDialogComponent } from './common/delete-kapo-dialog/delete-kapo-dialog.component';
import { ReportComponent } from './report/report.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlayersReportComponent } from './players-report/players-report.component';
import { QuestionsReportComponent } from './questions-report/questions-report.component';
import { ShapeComponent } from './shape/shape.component';
import { QuestionReportDetailDialogComponent } from './question-report-detail-dialog/question-report-detail-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppIconButtonComponent,
    RegisterComponent,
    ErrorDialogComponent,
    QuizComponent,
    PointsTooltipComponent,
    QuizStructurePreviewComponent,
    SlideStructurePreviewComponent,
    TrueFalseQuizStructurePreviewComponent,
    TimeLimitComponent,
    PointsComponent,
    AnswerOptionsComponent,
    QuizFieldComponent,
    TrueFasleQuizFieldComponent,
    AnswerComponent,
    TofAnswerComponent,
    TextAnswerComponent,
    AddQuestionDialogComponent,
    ScrollableDirective,
    OffsetTopDirective,
    QuizValidationErrorDialogComponent,
    FinalizeKapoDialogComponent,
    DeleteKapoDialogComponent,
    ReportComponent,
    ReportDetailComponent,
    SummaryReportComponent,
    PlayersReportComponent,
    QuestionsReportComponent,
    ShapeComponent,
    QuestionReportDetailDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    OverlayModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [importProvidersFrom(HttpClientModule)],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
