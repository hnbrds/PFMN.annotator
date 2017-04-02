import { Component, ElementRef, Renderer2, EventEmitter, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { HttpService } from '../services/http-service/http.service'
import * as videojs from 'video.js'


@Component({
  selector: 'video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css']
})

export class VideoComponentComponent implements OnInit, AfterViewInit{
  // server
  private url : string = "http://localhost:17358/"
  videolist : string[] = []

  // video property
  //@ViewChild('vid') video : ElementRef
  private video : any
  private videoWidth : number = 0
  private videoHeight : number = 0
  videoId : string = 'video.mp4'
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


  constructor(private elementRef: ElementRef,
    private rd : Renderer2, private httpService : HttpService ) {
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
  }

  getVideoProperty() {
    this.videoWidth = this.video.videoWidth;
    this.videoHeight = this.video.videoHeight;
  }

  updateFrameCount(t : number) {
    var tmp = Math.floor(this.video.currentTime * this.fps);
    if(this.framecount != tmp){
      this.framecount = tmp;
      this.coordSequence.push({
        frame : this.framecount,
        coord : [this.pixelX, this.pixelY]
      });
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

  makeData() {
      return {
        vid : this.videoId,
        log : this.coordSequence,
        hl : this.highLights
      }
  }

  saveLog() {
    this.httpService.postJson('log/save', this.makeData())
    .subscribe(
      data => {
        console.log('data', data);
        console.log(document.getElementById('success'));
      },
      error => {
        console.log('error');
      }
    );
    this.coordSequence = [];
    this.highLights = [];
  }

  viewLog() {
    console.log(this.coordSequence);
  }

  getList() {
    this.httpService.getJson('list').subscribe(
      data => {
        console.log('data', data);
      }
    )
  }
}
