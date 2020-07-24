import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  readonly apiKey = 'dd44cf5b';
  readonly url = `https://www.omdbapi.com/?apikey=${this.apiKey}&type=movie&r=json`;

  constructor(private http: HttpClient) { }

  getMovies(title: any): Observable<any> {
    return this.http.get(`${this.url}&s=${title}*`);
  }

  getDetails(value: any): Observable<any> {
    return this.http.get(`${this.url}&i=${value}`);
  }

}
