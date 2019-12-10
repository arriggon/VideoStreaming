import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VideoResponseDTO} from '../domain/VideoResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private readonly http: HttpClient) { }

  public getVideos(): Observable<VideoResponseDTO> {
    return this.http.get<VideoResponseDTO>('http://localhost:3000/videos');
  }
}
