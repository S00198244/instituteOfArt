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

  artIds!: number[];

  public artPieces: Art[] = [];

  message: string = "";

  galleryForm = new FormGroup({
    query: new FormControl([''], Validators.required)
  })

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.artPieces = [];

    console.log(this.galleryForm.value.query);

    this.galleryService.getArtIds(this.galleryForm.value.query).subscribe({
      next: value => {
        this.artIds = value.objectIDs; // Returns an array of objectIDs that match the query
      },
      complete: () => {
        console.log('Retrieved objectIDs'),
        console.log(this.artIds);

        // retrieving information for each objectID (10)

        for (let i = 0; i < 10; i++) {

          this.galleryService.getArt(this.artIds[i]).subscribe({
            next: value => this.artPieces.push(value)
          })

        } 

      },
      error: (err) => this.message = err
    });
  }
}
