import { Component } from '@angular/core';
import {
  ColorGrammar,
} from './sub.component.grammar';
import {
  SpeechRecognitionLang,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionGrammars,
  SpeechRecognitionService,
} from '../../../../../projects/ngx-speech-recognition/src/public_api';

@Component({
  selector: 'demo-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css'],
  providers: [
    // Dependency Inject to SpeechRecognitionService
    // like this.
    //
    // こんな感じで依存解決できます。
    {
      provide: SpeechRecognitionLang,
      useValue: 'en-US',
    },
    {
      provide: SpeechRecognitionMaxAlternatives,
      useValue: 1,
    },
    {
      provide: SpeechRecognitionGrammars,
      useValue: ColorGrammar,
    },
    SpeechRecognitionService,
  ],
})
export class SubComponent {

  public started = false;

  public message = '';

  constructor(
    private service: SpeechRecognitionService,
  ) {
    // Dependency The injected services are displayed on the console.
    // Dependence was resolved from SubComponent's provider.
    //
    // 依存関係注入されたサービスがコンソールに表示されます。
    // SubComponentのプロバイダから依存解決されました。
    console.log('SubComponent', this.service);

    this.service.onstart = (e) => {
      console.log('onstart');
    };
    this.service.onresult = (e) => {
      this.message = e.results[0].item(0).transcript;
      console.log('SubComponent:onresult', this.message, e);
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
