import { Component, OnInit } from '@angular/core';
import {VideoService} from '../services/video.service';
import {StateService} from '../state.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video-select',
  templateUrl: './video-select.component.html',
  styleUrls: ['./video-select.component.scss']
})
export class VideoSelectComponent implements OnInit {
  videos: string[];
  notSelectedError = false;

  constructor(private readonly state: StateService, private readonly videoService: VideoService, private router: Router) { }

  ngOnInit() {
  }

  getVideos() {
    this.videoService.getVideos().subscribe(value => {
      this.videos = this.sanitizeNames(value.files);
    });
  }

  sanitizeNames(names: string[]) {
    return names.map(name => name.replace('.mp4', ''));
  }

  watch() {
    if (this.state.selectedVideo.length > 0) {
      this.notSelectedError = false;
      this.router.navigate(['/video']);
    } else {
      this.notSelectedError = true;
    }
  }
}
