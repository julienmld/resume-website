import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { map, Observable } from 'rxjs';
import { StatisticDTO } from '../models/StatisticDTO';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private http = inject(HttpClient);
  private readonly backendUrl = 'https://5h0w8bjqlg.execute-api.eu-west-3.amazonaws.com/prod/';
  private readonly key = '5WQWm1ON7T7WdudQzul6H2mmz816HyDT7v2MmY3J';

  contact(message: Message): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.key
    });
    return this.http.post<Message>(this.backendUrl + 'contact', message, { headers });
  }

  registerVisitor(information: any): Observable<string> {
    const headers = new HttpHeaders({
      'x-api-key': this.key,
      'Content-Type': 'application/json'
    });
    return this.http.post<string>(this.backendUrl + 'registerVisitor', information, { headers });
  }

  getStatistics(): Observable<StatisticDTO> {
    const headers = new HttpHeaders({
      'x-api-key': this.key,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.backendUrl + 'statistics', { headers }).pipe(
      map((data) => {
        const deviceStatisticsMap = new Map<number, number[]>(Object.entries(data.deviceStatistics).map(([key, value]) => [Number(key), value as number[]]));
        return new StatisticDTO(data.numberDeveloper, data.numberRecruiter, data.numberStudent, data.numberClient, data.numberCurious, data.numberOther, deviceStatisticsMap);
      }));
  }

}
