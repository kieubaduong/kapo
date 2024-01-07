import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import HttpService from './http.service';
import ApiResponse from 'src/models/api.response';

export class GameService {
  public static createGame(templateId: string): Observable<ApiResponse<any>> {
    const data = { templateId };
    return from(HttpService.post<ApiResponse<any>>('/games', data)).pipe(
      map((response) =>
        ApiResponse.success<any>(response.data.data ?? {})
      ),
      catchError((error) => {
        console.error('Error occurred:', error);
        return of(ApiResponse.fail<any>('Could not create game'));
      })
    );
  }
}