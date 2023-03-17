import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from './comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  postComment(commentDto: any, videoId: String): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/videos/"+ videoId +"/comment", commentDto);
  }

  getComments(videoId: String): Observable<Array<CommentDto>> {
    return this.httpClient.get<Array<CommentDto>>("http://localhost:8080/api/videos/"+ videoId +"/comment");
  }
}
