import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private selected = '';

  set selectedVideo(selected: string) {
    this.selected = selected;
  }

  get selectedVideo(): string {
    return this.selected;
  }

  constructor() { }
}
