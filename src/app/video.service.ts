import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { FileSystemFileEntry } from "ngx-file-drop"
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) {
  }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    //HTTP POST Call to backend
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name)
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData);
  }

  uploadThumbnail(file: File, videoId: string): Observable<string> {
    //HTTP POST Call to backend
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('videoId', videoId);
    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail", formData, {
      responseType: 'text'
    });
  }

  getVideo(videoId: string): Observable<VideoDto>{
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/videos/"+videoId);
  }

  
  saveVideoMetadata(videoData: VideoDto): Observable<VideoDto>{
    
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/videos", videoData);

  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/videos");
  }

  getSubscribedVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/videos");
  }

  getLikedVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/videos");
  }

  getHistoryVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/videos");
  }

  likeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/videos/"+videoId+"/like", null);
  }
  dislikeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/videos/"+videoId+"/dislike", null);
  }
}
