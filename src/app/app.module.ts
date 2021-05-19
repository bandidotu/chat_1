import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
// compnentes
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component'
// NGmodel formularios
import { FormsModule} from '@angular/forms';
// servicios
import { ChatService} from "../app/providers/chat.service";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment),
    AngularFireStorageModule, 
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
