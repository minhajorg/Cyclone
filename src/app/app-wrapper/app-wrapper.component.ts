import { Component, ElementRef, OnInit } from '@angular/core';
import * as Cropper from 'cropperjs';

/*  - reset on again choosing
    - preview while cropping
    - show preview in placeholder
    - generate canvas of 2
    - downlaod 
*/

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.css']
})
export class AppWrapperComponent implements OnInit {

  cropper: Cropper;
  isImageLoaded = false;
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {

  }

  readFile($event): void {
    const reader = new FileReader();
    const imageToPreview = this.elementRef.nativeElement.querySelector('.imageToPreview');
    reader.onload = (e: any) => {
      this.isImageLoaded = true;
      imageToPreview.src = e.target.result;
      this.enableCropping();
    };
    console.log($event.target.files[0]);
    reader.readAsDataURL($event.target.files[0]);
  }

  enableCropping() {
    const image = this.elementRef.nativeElement.querySelector('#image');
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      scalable: false
    });
  }

}
