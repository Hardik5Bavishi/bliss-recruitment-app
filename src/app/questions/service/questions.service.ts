import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs/internal/Observable';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  url: string = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  getHealth(): Observable<any> {
    return this._http.get(`${this.url}/health`);
  }

  getQuestionsList(limit: number, offset: number, searchQuery: string = ''): Observable<any> {
    let url = `${this.url}/questions?limit=${limit}&offset=${offset}`;
    if (searchQuery) {
      url += `&filter=${searchQuery}`;
    }
    return this._http.get(`${url}`);
  }

  getQuestionDetail(id: number): Observable<any> {
    let url = `${this.url}/questions/${id}`;
    return this._http.get(url);
  }

  updateQuestion(postJson: any): Observable<any> {
    let url = `${this.url}/questions/${postJson.id}`;
    return this._http.post(url, postJson);
  }

  shareContent(email: string, contentUrl: string): Observable<any> {
    let url = `${this.url}/questions/share?destination_email=${email}&content_url=${contentUrl}`;
    return this._http.post(url, {});
  }
}
