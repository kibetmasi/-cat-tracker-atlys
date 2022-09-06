import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  template: `
  <header>
    <a>
        <h1 id="title">Cat Tracker</h1>
    </a>
    <h5>Current time: {{time}}</h5>
</header>
  `
})
export class HeaderComponent implements OnInit {
  time:any = new Date().toUTCString()

  constructor() { }

  ngOnInit(): void {
  }
}
