webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-wrapper/app-wrapper.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".image_preview {\n    margin-top: 30px;\n    max-width: 80%;\n    height: 400px;\n}\n\n.live_crop_preview_div {\n    height: 10rem;\n    width: 10rem;\n    overflow: hidden;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-wrapper/app-wrapper.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron bg-success text-white rounded-0\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md\">\n        <h1>Cyclone\n          <small class=\"h6\">v1.0.0</small>\n        </h1>\n        <p class=\"lead\">By PAT Social Media Team</p>\n      </div>\n    </div>\n  </div>\n</div>\n<!--  todo: add instructions -->\n<!-- Content -->\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n        <input type='file' id=\"uploadBannerImage\" (change)=\"readFile($event)\" />\n        <br>\n        <div class=\"image_preview\">\n        </div>\n        <hr/>\n        <div class=\"live_crop_preview_div\"></div>\n    </div>\n    <div class=\"col-md-6\">\n      <div>\n        <canvas id=\"canvas\" #canvas></canvas>\n      </div>\n      <br>\n      <hr/>\n      <span (click)=\"removeAlreadyPresentPreviewImg()\">remove</span>\n      <span (click)=\"cropImage()\">crop</span>\n      |\n      <a href=\"#\" target=\"_blank\" #downloadLink (click)=\"downloadCanvas(downloadLink)\">\n          <p>download</p>\n      </a>\n      \n      <hr/>\n      <div class=\"final_cropped_img_div\">\n        <img src=\"\" alt=\"\" id=\"cropped_img\" />\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app-wrapper/app-wrapper.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppWrapperComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cropperjs__ = __webpack_require__("../../../../cropperjs/dist/cropper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cropperjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cropperjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppWrapperComponent = (function () {
    function AppWrapperComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.isImageLoaded = false;
        this.previewImg = undefined;
        this.baseImgWidth = 0;
        this.baseImgHeight = 0;
    }
    AppWrapperComponent.prototype.ngOnInit = function () {
        this.imagePreviewDiv = this.elementRef.nativeElement.querySelector('.image_preview');
    };
    AppWrapperComponent.prototype.ngAfterViewInit = function () {
        this.ctx = this.canvasRef.nativeElement.getContext('2d');
        this.loadBaseImage();
    };
    AppWrapperComponent.prototype.loadBaseImage = function () {
        var _this = this;
        var img = new Image();
        img.onload = function () {
            _this.ctx.canvas.width = img.width;
            _this.ctx.canvas.height = img.height;
            _this.ctx.drawImage(img, 0, 0);
        };
        img.src = '../../assets/mt600.png';
    };
    AppWrapperComponent.prototype.readFile = function ($event) {
        var _this = this;
        // check if already img rendered, delete that.
        this.removeAlreadyPresentPreviewImg();
        // create an image for previewing.
        this.previewImg = this.renderer.createElement('img');
        this.renderer.setAttribute(this.previewImg, 'id', 'image');
        this.renderer.addClass(this.previewImg, 'imageToPreview');
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.isImageLoaded = true;
            _this.renderer.setAttribute(_this.previewImg, 'src', e.target.result);
            _this.renderer.appendChild(_this.imagePreviewDiv, _this.previewImg);
            _this.enableCropping();
        };
        console.log($event.target.files[0]);
        reader.readAsDataURL($event.target.files[0]);
    };
    AppWrapperComponent.prototype.enableCropping = function () {
        var _this = this;
        var image = this.elementRef.nativeElement.querySelector('#image');
        this.cropper = new __WEBPACK_IMPORTED_MODULE_1_cropperjs__(image, {
            aspectRatio: 1,
            scalable: false,
            preview: '.live_crop_preview_div',
            ready: function (e) {
                console.log(e.type);
            },
            cropstart: function (e) {
                console.log(e.type, e.detail.action);
            },
            cropmove: function (e) {
                console.log(e.type, e.detail.action);
            },
            cropend: function (e) {
                console.log(e.type, e.detail.action);
                _this.cropImage();
            },
        });
    };
    AppWrapperComponent.prototype.removeAlreadyPresentPreviewImg = function () {
        if (this.previewImg !== undefined) {
            this.renderer.removeChild(this.imagePreviewDiv, this.previewImg);
            this.renderer.setProperty(this.imagePreviewDiv, 'innerHTML', '');
        }
    };
    AppWrapperComponent.prototype.cropImage = function () {
        var imgSrc = this.cropper.getCroppedCanvas({
            width: 178 // input value
        }).toDataURL();
        this.renderer.setAttribute(this.elementRef.nativeElement.querySelector('#cropped_img'), 'src', imgSrc);
        // draw in canvas
        this.drawCroppedImageInCanvas(imgSrc);
    };
    AppWrapperComponent.prototype.drawCroppedImageInCanvas = function (imgSrc) {
        var _this = this;
        var img = new Image();
        img.onload = function () {
            _this.ctx.drawImage(img, 212, 280);
        };
        img.src = imgSrc;
    };
    AppWrapperComponent.prototype.downloadCanvas = function (link) {
        console.log('in downlaod');
        console.log(link);
        var filename = 'naveed.png';
        var canvasRef = document.getElementById('canvas');
        link.href = canvasRef.toDataURL();
        link.download = filename;
    };
    return AppWrapperComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('canvas'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], AppWrapperComponent.prototype, "canvasRef", void 0);
AppWrapperComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-app-wrapper',
        template: __webpack_require__("../../../../../src/app/app-wrapper/app-wrapper.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-wrapper/app-wrapper.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer2 */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer2 */]) === "function" && _c || Object])
], AppWrapperComponent);

var _a, _b, _c;
//# sourceMappingURL=app-wrapper.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-app-wrapper></app-app-wrapper>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_wrapper_app_wrapper_component__ = __webpack_require__("../../../../../src/app/app-wrapper/app-wrapper.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__app_wrapper_app_wrapper_component__["a" /* AppWrapperComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map