import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StateService} from '../state.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  constructor(private readonly state: StateService) {
  }

  ngOnInit() {
  }
}
