import { Component, ElementRef, Renderer2, EventEmitter, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Rx'
import * as videojs from 'video.js'

@Component({
  selector: 'video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css']
})
export class VideoComponentComponent implements OnInit, AfterViewInit{
  // video property
  //@ViewChild('vid') video : ElementRef
  private video : any
  private videoWidth : number = 0
  private videoHeight : number = 0
  // Mouse coords
  highLights : any[] = []
  private coordSequence : any[] = []
  pixelX : number = 0
  pixelY : number = 0
  // Frame counter
  private startframe : number = 0
  framecount : number = 0
  private fps : number = 30

  // canvas property
  //@ViewChild("draw") canvas : ElementRef
  private canvas : any
  private context : any


  constructor(private elementRef: ElementRef, private rd : Renderer2) {
  }

  ngOnInit() {
    let timer = Observable.timer(0,20);
    timer.subscribe(t=> {
      this.updateFrameCount(t);
    });
  }

  ngAfterViewInit() {
    this.canvasInit();
    this.video = document.getElementById('vid');
  }

  canvasInit() {
    this.canvas = document.getElementById('draw');
    this.context = this.canvas.getContext('2d');

    console.log(document.getElementById('draw'));
    console.log(this.context);
    /*
    this.video.nativeElement.addEventListener('play', function() {
      if(this.video.nativeElement.paused || this.video.nativeElement.ended)
        return false;
      this.canvas.drawImage(3, 0, 0, 5, 1);
    }, false);*/
  }

  getVideoProperty() {
    this.videoWidth = this.video.videoWidth;
    this.videoHeight = this.video.videoHeight;
  }

  updateFrameCount(t : number) {
    var tmp = Math.floor(this.video.currentTime * this.fps);
    if(this.framecount != tmp){
      if(this.framecount != tmp+1) {
        this.framecount = tmp;
      }
      this.coordSequence.push([tmp, this.pixelX, this.pixelY]);
    }
  }

  cutOff(x, y, width, height) {
    x = Math.max(Math.min(x, width-1), 0);
    y = Math.max(Math.min(y, height-1), 0);
    return {posX: x, posY:y}
  }

  onMouse(event : MouseEvent) {
    //var videodat = this.video.nativeElement;
    var videoWidth = this.video.videoWidth;
    var videoHeight = this.video.videoHeight;
    var clientWidth = this.video.clientWidth;
    var clientHeight = this.video.clientHeight;
    var scaleX = videoWidth / clientWidth;
    var scaleY = videoHeight / clientHeight;

    let pos = this.cutOff(event.offsetX, event.offsetY, clientWidth, clientHeight);
    this.pixelX = (pos.posX * scaleX) + 0.5 | 0;
    this.pixelY = (pos.posY * scaleY) + 0.5 | 0;
    if(event.type == "mousemove"){
    }
    if(event.type == "click") {
      console.log(event);
      console.log(this.video);
      this.highLights.push([this.pixelX, this.pixelY]);
      this.context.rect(event.offsetX-10, event.offsetX-10, 20, 20);
    }
  }
}
