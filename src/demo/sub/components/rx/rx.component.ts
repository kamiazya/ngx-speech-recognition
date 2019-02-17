import { Component } from '@angular/core';
import {
  RxSpeechRecognitionService,
  resultList,
} from '../../../../../projects/ngx-speech-recognition/src/public_api';

@Component({
  selector: 'demo-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css'],
  providers: [
    RxSpeechRecognitionService,
  ],
})
export class RxComponent {

  message = '';

  constructor(
    public service: RxSpeechRecognitionService,
  ) { }

  listen() {
    this.service
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        console.log('RxComponent:onresult', this.message, list);
      });
  }

}
