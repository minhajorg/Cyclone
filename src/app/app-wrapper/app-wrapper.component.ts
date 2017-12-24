import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as Cropper from 'cropperjs';

/*  - reset on again choosing
    - preview while cropping
    - show preview in placeholder
    - generate canvas of 2
    - downlaod
    - get coordinate of placeholder from base image
    - canvas drag & drop
    - canvas draw dynamically from image height
*/

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.css']
})
export class AppWrapperComponent implements OnInit {

  cropper: Cropper;
  isImageLoaded = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

  }

  readFile($event): void {
    const reader = new FileReader();
    const imagePreviewDiv = this.elementRef.nativeElement.querySelector('.image_preview');
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'id', 'image');
    this.renderer.addClass(img, 'imageToPreview');

    reader.onload = (e: any) => {
      this.isImageLoaded = true;
      this.renderer.setAttribute(img, 'src', e.target.result);
      this.renderer.appendChild(imagePreviewDiv, img);
      // imageToPreview.src = e.target.result;
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
