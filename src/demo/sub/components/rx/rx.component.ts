import { Component } from '@angular/core';

import { RxSpeechRecognitionService } from 'lib/speech-recognition/service';

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
    private service: RxSpeechRecognitionService,
  ) { }
  listen() {
    this.service
      .listen()
      .pipe(RxSpeechRecognitionService.resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        console.log('RxComponent:onresult', this.message, list);
      });
  }

}
