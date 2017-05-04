import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ng2-bootstrap/modal';

import { AppComponent } from './app.component';
import { VideoComponentComponent } from './video-component/video-component.component';
import { FooterComponent } from './footer/footer.component';
import { TitleComponent } from './title/title.component';

import { HttpService } from './services/http-service/http.service';


@NgModule({
  declarations: [
    AppComponent,
    VideoComponentComponent,
    FooterComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  providers: [ HttpService ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
