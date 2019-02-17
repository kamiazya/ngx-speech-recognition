import {
  Observable,
  pipe,
  UnaryFunction,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Injectable, ApplicationRef, Inject, Optional } from '@angular/core';

import {
  SpeechRecognitionGrammars,
  SpeechRecognitionLang,
  SpeechRecognitionContinuous,
  SpeechRecognitionInterimResults,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionServiceUri,
} from './speech-recognition.token';

import {
  SpeechGrammarListType,
  SpeechRecognitionServiceEvent,
} from '../adapter';

import {
  SpeechRecognitionCommon,
} from './speech-recognition.common';

const onType = (type: string) => {
  return filter((e: SpeechRecognitionServiceEvent) => (e.type === type));
};

export const resultList: UnaryFunction<Observable<SpeechRecognitionEvent>, Observable<SpeechRecognitionResultList>> = pipe(
  onType('result'),
  map((e: SpeechRecognitionEvent): SpeechRecognitionResultList => e.results),
);

@Injectable()
export class RxSpeechRecognitionService extends SpeechRecognitionCommon {

  private proxy$: Subject<SpeechRecognitionServiceEvent> = new Subject();

  private _started$ = new BehaviorSubject<boolean>(false);

  get $(): Observable<SpeechRecognitionServiceEvent> {
    return this.proxy$ as Observable<SpeechRecognitionServiceEvent>;
  }

  get started$(): Observable<boolean> {
    return this._started$ as Observable<boolean>;
  }

  constructor(
    private ref: ApplicationRef,

    @Optional() @Inject(SpeechRecognitionGrammars)
    grammars: SpeechGrammarListType,

    @Optional() @Inject(SpeechRecognitionLang)
    lang: string,

    @Optional() @Inject(SpeechRecognitionContinuous)
    continuous: boolean,

    @Optional() @Inject(SpeechRecognitionInterimResults)
    interimResults: boolean,

    @Optional() @Inject(SpeechRecognitionMaxAlternatives)
    maxAlternatives: number,

    @Optional() @Inject(SpeechRecognitionServiceUri)
    serviceURI: string,
  ) {
    super(grammars, lang, continuous, interimResults, maxAlternatives, serviceURI);
    this.initInternal();
  }

  private initInternal() {
    // set handlers
    const handler = (e) => {
      this.proxy$.next(e);
      this.ref.tick();
    };
    const errHandler = (e) => {
      this.proxy$.error(e);
      this.ref.tick();
    };
    this.internal.onaudiostart = handler;
    this.internal.onsoundstart = handler;
    this.internal.onspeechstart = handler;

    this.internal.onspeechend = handler;
    this.internal.onsoundend = handler;
    this.internal.onaudioend = handler;

    this.internal.onresult = handler;
    this.internal.onnomatch = handler;
    this.internal.onerror = errHandler;

    this.internal.onstart = handler;
    this.internal.onend = handler;

    // see setter methods
    this.grammars = this._grammars;
    this.lang = this._lang;
    this.continuous = this._continuous;
    this.interimResults = this._interimResults;
    this.maxAlternatives = this._maxAlternatives;
    this.serviceURI = this._serviceURI;

    this.proxy$.subscribe((e) => {
      switch (e.type) {
        case 'start':
          this._started$.next(true);
          break;
        case 'end':
          this._started$.next(false);
          break;
      }
    });
  }

  // The listen() method aims to recognize the grammar associated with the current SpeechRecognition,
  // Observable is returned for handling voice recognition service listening to incoming voice.
  // When you subscrive the return value, listening begins and listening ends when an end event occurs.
  // Interrupt listening by unsubscribing in the middle.
  //
  // listen() メソッドは、現在のSpeechRecognitionに
  // 関連付けられた文法を認識することを目的として、
  // 着信音声を聴取する音声認識サービスを扱うためのObservableが返されます。
  // 返り値をsubscriveすると聴取が開始され、endのイベントが発生すると聴取を終了します。
  // 途中でunsbscriveすることで聴取を中断します。
  public listen(): Observable<SpeechRecognitionServiceEvent> {

    const listener = Observable.create((ovserver) => {
      // create subscriotion
      const subscriotion = this.proxy$.subscribe({
        next: (e) => {
          ovserver.next(e);

          if (e.type && e.type === 'end') {
            this.internal.stop();
            ovserver.complete();
            subscriotion.unsubscribe();
          }
        },
        error: (e) => ovserver.error(e),
      });

      // Speech Recognition start
      this.internal.start();

      return () => {
        this.internal.abort();
        subscriotion.unsubscribe();
      };
    });

    return listener;
  }

}
