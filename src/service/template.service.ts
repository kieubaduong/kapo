import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import HttpService from './http.service';
import ApiResponse from 'src/models/api.response';
import { TemplateDTO } from 'src/DTO/template.dto';

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
}