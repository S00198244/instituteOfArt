import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Art } from 'src/app/interfaces/art';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public artPieces: Art[] = [];

  message: string = "";

  galleryForm = new FormGroup({
    query: new FormControl([''], Validators.required)
  })

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    console.log(this.galleryForm.value.query);

    this.galleryService.getArt(this.galleryForm.value.query).subscribe({
      next: value => {
        this.artPieces = value; // Returns an array of objectIDs that match parameter, not the details of the piece that matches the query
      },
      complete: () =>
        console.log('Retrieved art pieces')
      ,
      error: (err) => this.message = err
    });
  }
}
