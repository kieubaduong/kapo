import { Observable, from, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import HttpService from './http.service';
import ApiResponse from 'src/models/api.response';
import { TemplateDTO } from 'src/DTO/template.dto';
import SettingData from 'src/models/setting.data';
import { QuestionDTO } from 'src/DTO/question.dto';

export class TemplateService {
  public static getAllTemplates(selectType: string): Observable<ApiResponse<TemplateDTO[]>> {
    return from(HttpService.get<ApiResponse<TemplateDTO[]>>(`/templates?selectType=${selectType}`)).pipe(
      map(response => ApiResponse.success<TemplateDTO[]>(response.data.data ?? [])),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<TemplateDTO[]>('Could not fetch templates'));
      })
    );
  }

  public static getTemplateById(id: number): Observable<ApiResponse<TemplateDTO>> {
    return from(HttpService.get<ApiResponse<TemplateDTO>>(`/templates/${id}`)).pipe(
      map(response => ApiResponse.success<TemplateDTO>(response.data.data ?? TemplateDTO.null())),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<TemplateDTO>('Could not fetch template'));
      })
    );
  }

  public static createTemplate(settingData: SettingData): Observable<ApiResponse<TemplateDTO>> {
    return from(HttpService.post<ApiResponse<TemplateDTO>>(`/templates`, settingData)).pipe(
      map(response => ApiResponse.success<TemplateDTO>(response.data.data ?? TemplateDTO.null())),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<TemplateDTO>('Could not create template'));
      })
    );
  }

  public static updateTemplate(templateId: string, settingData: SettingData): Observable<ApiResponse<TemplateDTO>> {
    return from(HttpService.put<ApiResponse<TemplateDTO>>(`/templates/${templateId}`, settingData)).pipe(
      map(response => ApiResponse.success<TemplateDTO>(response.data.data ?? TemplateDTO.null())),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<TemplateDTO>('Could not update template'));
      })
    );
  }

  public static patchTemplate(templateId: string, questionDTOs: QuestionDTO[]): Observable<any> {
    const data = {
      questions: questionDTOs
    };
    return from(HttpService.patch<any>(`/templates/${templateId}/questions`, data)).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return of('Could not patch template');
      })
    );
  }

  public static deleteTemplate(templateId: string): Observable<any> {
    return from(HttpService.delete<any>(`/templates/${templateId}`)).pipe(
      tap(response => console.log(JSON.stringify(response))),
      catchError(error => {
        console.error('Error occurred:', error);
        return of('Could not delete template');
      })
    );
  }

  public static getQuestionsByTemplateId(templateId: string): Observable<ApiResponse<QuestionDTO[]>> {
    return from(HttpService.get<ApiResponse<QuestionDTO[]>>(`/templates/${templateId}/questions`)).pipe(
      map(response => ApiResponse.success<QuestionDTO[]>(response.data.data ?? [])),
      catchError(error => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<QuestionDTO[]>('Could not fetch questions'));
      })
    );
  }

}
