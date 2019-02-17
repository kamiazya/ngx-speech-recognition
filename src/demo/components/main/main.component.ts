import { Component } from '@angular/core';
import {
  SpeechRecognitionService,
} from '../../../../projects/ngx-speech-recognition/src/public_api';

@Component({
  selector: 'demo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    SpeechRecognitionService,
  ],
})
export class MainComponent {

  public started = false;

  public message = '';

  constructor(
    private service: SpeechRecognitionService
  ) {
    // You can see Dependency Injected service in Console.
    // DI resolved from DemoModule with SpeechRecognitionModuke::withConfig.
    console.log('MainComponent', this.service);


    this.service.onstart = (e) => {
      console.log('onstart');
    };
    this.service.onresult = (e) => {
      this.message = e.results[0].item(0).transcript;
      console.log('MainComponent:onresult', this.message, e);
    };
  }

  start() {
    this.started = true;
    this.service.start();
  }

  stop() {
    this.started = false;
    this.service.stop();
  }
}
