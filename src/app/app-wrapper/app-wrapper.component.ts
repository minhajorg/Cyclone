import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as Cropper from 'cropperjs';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.css']
})
export class AppWrapperComponent implements OnInit, AfterViewInit {

  cropper: Cropper;
  isImageLoaded = false;
  imagePreviewDiv: any;
  previewImg: any = undefined;
  baseImgWidth = 0;
  baseImgHeight = 0;

  @ViewChild('canvas') canvasRef: ElementRef;
  ctx: CanvasRenderingContext2D;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.imagePreviewDiv = this.elementRef.nativeElement.querySelector('.image_preview');
  }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.loadBaseImage();
  }

  loadBaseImage() {
    const img = new Image();
    img.onload = () => {
      this.ctx.canvas.width = img.width;
      this.ctx.canvas.height = img.height;
      this.ctx.drawImage(img, 0, 0);
    }
    img.src = 'assets/mt600.png';
  }

  readFile($event): void {
    // check if already img rendered, delete that.
    this.removeAlreadyPresentPreviewImg();

    // create an image for previewing.
    this.previewImg = this.renderer.createElement('img');
    this.renderer.setAttribute(this.previewImg, 'id', 'image');
    this.renderer.addClass(this.previewImg, 'imageToPreview');

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.isImageLoaded = true;
      this.renderer.setAttribute(this.previewImg, 'src', e.target.result);
      this.renderer.appendChild(this.imagePreviewDiv, this.previewImg);
      this.enableCropping();
    };
    console.log($event.target.files[0]);
    reader.readAsDataURL($event.target.files[0]);
  }

  enableCropping() {
    const image = this.elementRef.nativeElement.querySelector('#image');
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      scalable: false,
      preview: '.live_crop_preview_div',
      ready: (e) => {
        console.log(e.type);
      },
      cropstart: (e) => {
        console.log(e.type, e.detail.action);
      },
      cropmove: (e) => {
        console.log(e.type, e.detail.action);
      },
      cropend: (e) => {
        console.log(e.type, e.detail.action);
        this.cropImage();
      },
    });
  }

  removeAlreadyPresentPreviewImg(): void {
    if (this.previewImg !== undefined) {
      this.renderer.removeChild(this.imagePreviewDiv, this.previewImg);
      this.renderer.setProperty(this.imagePreviewDiv, 'innerHTML', '');
    }
  }

  cropImage() {
    const imgSrc = this.cropper.getCroppedCanvas({
      width: 178 // input value
    }).toDataURL();
    this.renderer.setAttribute(this.elementRef.nativeElement.querySelector('#cropped_img'), 'src', imgSrc);

    // draw in canvas
    this.drawCroppedImageInCanvas(imgSrc);

  }

  drawCroppedImageInCanvas(imgSrc) {
    const img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, 212, 280);
    }
    img.src = imgSrc;
  }

  downloadCanvas(link) {
    console.log('in downlaod');
    console.log(link);
    const filename = 'naveed.png';
    const canvasRef = <HTMLCanvasElement> document.getElementById('canvas');
    link.href = canvasRef.toDataURL();
    link.download = filename;
  }

}
