import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  template: `
    <div class="overlay">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
  `,
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
