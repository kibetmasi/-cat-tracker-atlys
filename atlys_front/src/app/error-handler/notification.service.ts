import { Injectable, NgZone } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private zone:NgZone,
        private snack:MatSnackBar
  ) { }

  showSuccess(message:string){
    this.zone.run(()=> {
      this.snack.open(message, 'X', {
        duration: 5000
      });
    })
  }

  showError(message:string){
    this.zone.run(()=> {
      this.snack.open(message, 'X', {
        duration: 5000
      })
    })
  }
}
