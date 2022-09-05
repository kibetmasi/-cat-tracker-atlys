import { Component, Injectable, OnInit } from '@angular/core';
import { CatService } from 'src/app/services/cat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/error-handler/notification.service';
import {MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { TimezoneService } from 'src/app/services/timezone.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  form!:FormGroup;
  show_form:boolean = false

  // variables
  all_cats:any = []
  time_z:any;
  search:any;

  constructor(
    private cat: CatService,
    private formBuilder: FormBuilder,
    private message:NotificationService,
    private dialog:MatDialog,
    private time:TimezoneService
  ) { 
    this.getTimezones()
  }

  getTimezones(){
    this.time.getTimezones().subscribe({
      next: (res:any) => { 
        this.time_z = res.zones
      },
      error: (err:any) => {throw new Error(JSON.stringify(err))}
    })
  }

  ngOnInit(): void {
    this.setCatList()
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]],
      timezone: ['', [Validators.required]]
    })
  }

  addCat(){
    const form = this.form.getRawValue()
    this.cat.PostCatDetails(form).subscribe({
      next: (res:any) => { 
        this.message.showSuccess("You have added a new cat!🎆") 
        this.show_form = false
        this.form.reset()
        this.setCatList()
      },
      error: (error:any) => { throw new Error(error)}
    })
  }

  setCatList(){
    this.cat.getCatDetails().subscribe({
      next: (res:any) => {
        this.all_cats = res
      },
      error: (err:any) => {
        throw new Error(err)
      }
    })
  }

  deleteCatDetails(id:any){
    this.cat.DeleteCatDetails(id).subscribe({
      next: (res) => { 
        this.message.showSuccess("Successfully deleted Cat")
        this.setCatList()
      },
      error: (error) => {
        throw new Error(error)
      }
    })
  }

  updateCatDetails(id:any ,uuid:any){
    localStorage.setItem("uuid", uuid)
    localStorage.setItem("id", id)
    this.dialog.open(UpdateComponent)
  }

  showForm(){
    this.show_form = true
  }

  hideForm(){
    this.show_form = false
  }

  nameHolder(text:any){
    if (
      this.form.controls['name'].touched
       ){
      return 'cat name is required'
    }
    return 'cat name'
  }

  colorHolder(text:any){
    if (
      this.form.controls['color'].touched
       ){
      return 'cat color is required'
    }
    return 'Color'
  }
}
