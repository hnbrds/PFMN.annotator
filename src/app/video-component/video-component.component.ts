import { Component, ElementRef, EventEmitter, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { VideoJSPlayer, videojs } from 'video.js'

@Component({
  selector: 'video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css']
})
export class VideoComponentComponent implements OnInit {
  @ViewChild('vid') video : ElementRef
  private _elementRef: ElementRef
  private videoJSplayer : VideoJSPlayer

  private highLights : any
  private pixelX : any
  private pixelY : any

  constructor(elementRef: ElementRef) {
        this._elementRef = elementRef
  }
  ngOnInit() {
    this.pixelX = 0;
    this.pixelY = 0;
  }

  getElementCSSSize(element) {
    var cs = getComputedStyle(element);
    var w = parseInt(cs.getPropertyValue("width"), 10);
    var h = parseInt(cs.getPropertyValue("height"), 10);
    return {width: w, height: h}
  }

  onMouseClick(event : MouseEvent) {
    //console.log(this.video);
    let size = this.getElementCSSSize(event.target);
    var videodat = this.video.nativeElement;

    var videoWidth = videodat.videoWidth;
    var videoHeight = videodat.videoHeight;
    var scaleX = videoWidth / size.width;
    var scaleY = videoHeight / size.height;

    var offsetLeft = videodat.offsetLeft + videodat.offsetParent.offsetLeft;
    var offsetTop = videodat.offsetTop;
    var x = ((event.clientX - offsetLeft)*scaleX) + 0.5 | 0; // round to integer
    var y = ((event.clientY - offsetTop)*scaleY) + 0.5 | 0;

    this.pixelX = x;
    this.pixelY = y;
  }
}
