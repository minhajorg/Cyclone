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
    this.renderer.setProperty(this.elementRef.nativeElement.querySelector('#upload-file-info'), 'innerHTML', $event.target.files[0].name);
  }

  enableCropping() {
    const image = this.elementRef.nativeElement.querySelector('#image');
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      scalable: false,
      // preview: '.live_crop_preview_div',
      ready: (e) => {
        console.log(e.type);
        this.cropImage();
      },
      cropstart: (e) => {
        console.log(e.type, e.detail.action);
        this.cropImage();
      },
      cropmove: (e) => {
        console.log(e.type, e.detail.action);
        this.cropImage();
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

    /* only for debugging */
    // this.renderer.setAttribute(this.elementRef.nativeElement.querySelector('#cropped_img'), 'src', imgSrc);

    // draw in canvas
    this.drawCroppedImageInCanvas(imgSrc);

  }

  drawCroppedImageInCanvas(imgSrc) {
    const img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, 212, 278);
    }
    img.src = imgSrc;
  }

  downloadCanvas(link) {
    console.log(link);
    const filename = 'cyclone_' + new Date().getTime() + '.png';
    const canvasRef = <HTMLCanvasElement>document.getElementById('canvas');
    const canvasb64URL = canvasRef.toDataURL().replace(/^data:[a-z]*;,/, '');

    if (navigator.appVersion.toString().indexOf('.NET') > 0) { // for IE browser
      const contentType = 'image/png';
      window.navigator.msSaveBlob(this.b64toBlob(canvasb64URL, contentType), filename);
    } else {
      link.href = canvasb64URL;
      link.download = filename;
    }
  }
  /* hack for IE - https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
   */
  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    b64Data = b64Data.split(',')[1];
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
