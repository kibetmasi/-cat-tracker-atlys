import { Component, OnInit } from '@angular/core';
import { TimezoneService } from 'src/app/services/timezone.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  time:any = new Date().toUTCString()

  constructor(
    private mytime:TimezoneService
  ) { }

  ngOnInit(): void {
    this.getMyZone()
  }

  getMyZone(){

  }

}
