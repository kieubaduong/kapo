import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import HttpService from './http.service';
import ApiResponse from 'src/models/api.response';
import { ReportDTO } from 'src/DTO/report.dto';
import { ReportSummaryDTO } from 'src/DTO/report.summary.dto';
import { ReportUserDTO } from 'src/DTO/report.user.dto';
import { ReportQuestionDTO } from 'src/DTO/report.question.dto';
import { ReportQuestionDetailDTO } from 'src/DTO/report.question.detail.dto';

export class ReportService {
  public static getAllReports(): Observable<ApiResponse<ReportDTO[]>> {
    return from(HttpService.get<ApiResponse<ReportDTO[]>>('/reports')).pipe(
      map((response) =>
        ApiResponse.success<ReportDTO[]>(response.data.data ?? [])
      ),
      catchError((error) => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<ReportDTO[]>('Could not fetch reports'));
      })
    );
  }

  public static getReportSummary(gameId: number): Observable<ApiResponse<ReportSummaryDTO>> {
    return from(HttpService.get<ApiResponse<ReportSummaryDTO>>(`/report/games/${gameId}/summary`)).pipe(
      map((response) =>
        ApiResponse.success<ReportSummaryDTO>(response.data.data ?? new ReportSummaryDTO())
      ),
      catchError((error) => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<ReportSummaryDTO>('Could not fetch report summary'));
      })
    );
  }

  public static getPlayersReport(gameId: number, selectType: string): Observable<ApiResponse<ReportUserDTO[]>> {
    return from(HttpService.get<ApiResponse<ReportUserDTO[]>>(`/report/games/${gameId}/players?select_type=${selectType}`)).pipe(
      map((response) =>
        ApiResponse.success<ReportUserDTO[]>(response.data.data ?? [new ReportUserDTO()])
      ),
      catchError((error) => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<ReportUserDTO[]>('Could not fetch players report'));
      })
    );
  }

  public static getQuestionReports(gameId: number): Observable<ApiResponse<ReportQuestionDTO[]>> {
    return from(HttpService.get<ApiResponse<ReportQuestionDTO[]>>(`/report/games/${gameId}/questions`)).pipe(
      map((response) =>
        ApiResponse.success<ReportQuestionDTO[]>(response.data.data ?? [])
      ),
      catchError((error) => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<ReportQuestionDTO[]>('Could not fetch question reports'));
      })
    );
  }

  public static getQuestionDetailReport(gameId: number, questionId: number): Observable<ApiResponse<ReportQuestionDetailDTO>> {
    return from(HttpService.get<ApiResponse<ReportQuestionDetailDTO>>(`/report/games/${gameId}/questions/${questionId}`)).pipe(
      map((response) =>
        ApiResponse.success<ReportQuestionDetailDTO>(response.data.data ?? new ReportQuestionDetailDTO())
      ),
      catchError((error) => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<ReportQuestionDetailDTO>('Could not fetch question detail report'));
      })
    );
  }
}
