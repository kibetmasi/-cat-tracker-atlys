import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/error-handler/notification.service';
import { CatService } from 'src/app/services/cat.service';
import { TimezoneService } from 'src/app/services/timezone.service';
import { environment } from 'src/environments/environment';
import { HomepageComponent } from '../homepage/homepage.component';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form!:FormGroup;
  cat_u:any;
  time_z:any;

  data1:any;
  data2:any;

  constructor(
    private e:HttpClient,
    private cat: CatService,
    private d:MatDialog,
    private formBuilder: FormBuilder,
    private time:TimezoneService,
    private m:NotificationService
  ) {}

  ngOnInit(): void {
    this.getTimezones()
    this.fillForm()
  }

  initializeForm(){
    this.form = this.formBuilder.group({
      name: [this.data2, [Validators.required]],
      color: [this.data1, [Validators.required]],
      timezone: ['', [Validators.required]]
    })
  }

  getTimezones(){
    this.time.getTimezones().subscribe({
      next: (res:any) => { 
        this.time_z = res.zones
      },
      error: (err:any) => {throw new Error(JSON.stringify(err))}
    })
  }

  setCatUpdate(){
    const data = this.form.getRawValue()
    const id:any = localStorage.getItem("uuid")
    this.cat.updateCatDetails(data, id).subscribe({
      next: (res:any) => {
        this.cat_u = res[id]
        this.d.closeAll()
        window.location.reload()
        this.m.showSuccess("Successfully updated cat details")
      },
      error: (err:any) => {
        throw new Error(err)
      }
    })
  }

  fillForm(){
    const x:any = localStorage.getItem("id")
    this.e.get(`${environment.Endpoint}/list`).subscribe({
      next: (res:any) => {
        this.data1 = res[x].color
        this.data2 = res[x].name
        this.initializeForm()
      },
      error: (err:any) => { throw new Error(err)}
    })
  }
}
