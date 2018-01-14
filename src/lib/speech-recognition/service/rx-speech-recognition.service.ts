import { Observable } from 'rxjs/Observable';
import { UnaryFunction } from 'rxjs/interfaces';
import { Subject } from 'rxjs/Subject';
import { Injectable, ApplicationRef, Inject, Optional } from '@angular/core';

import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { pipe } from 'rxjs/util/pipe';

import {
  SpeechRecognitionGrammars,
  SpeechRecognitionLang,
  SpeechRecognitionContinuous,
  SpeechRecognitionInterimResults,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionServiceUri,
  SpeechRecognitionAudiostartHandler,
  SpeechRecognitionSoundstartHandler,
  SpeechRecognitionSpeechstartHandler,
  SpeechRecognitionSpeechendHandler,
  SpeechRecognitionSoundendHandler,
  SpeechRecognitionAudioendHandler,
  SpeechRecognitionResultHandler,
  SpeechRecognitionNomatchHandler,
  SpeechRecognitionErrorHandler,
  SpeechRecognitionStartHandler,
  SpeechRecognitionEndHandler,
} from './speech-recognition.token';

import {
  SpeechRecognition,
  SpeechGrammarListType,
  SpeechRecognitionServiceEvent,
} from '../adapter';



@Injectable()
export class RxSpeechRecognitionService {

  static resultList: UnaryFunction<Observable<SpeechRecognitionEvent>, Observable<SpeechRecognitionResultList>> = pipe(
    RxSpeechRecognitionService.on('result'),
    map((e: SpeechRecognitionEvent): SpeechRecognitionResultList => e.results)
  );


  private internal: SpeechRecognition;

  private proxy$: Subject<SpeechRecognitionServiceEvent> = new Subject();


  get $(): Observable<SpeechRecognitionServiceEvent> {
    return this.proxy$ as Observable<SpeechRecognitionServiceEvent>;
  }


  static on(type: string) {
    return filter((e: SpeechRecognitionServiceEvent) => (e.type === type));
  }

  constructor(
    private ref: ApplicationRef,

    @Optional() @Inject(SpeechRecognitionGrammars)
    private _grammars: SpeechGrammarListType,

    @Optional() @Inject(SpeechRecognitionLang)
    private _lang: string,

    @Optional() @Inject(SpeechRecognitionContinuous)
    private _continuous: boolean,

    @Optional() @Inject(SpeechRecognitionInterimResults)
    private _interimResults: boolean,

    @Optional() @Inject(SpeechRecognitionMaxAlternatives)
    private _maxAlternatives: number,

    @Optional() @Inject(SpeechRecognitionServiceUri)
    private _serviceURI: string,
  ) {
    this.initInternal();
  }

  private initInternal() {
    this.internal = new SpeechRecognition();

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

  }




  /**
   * Property
   */

  // The grammars property of the SpeechRecognition interface returns and sets
  // a collection of SpeechGrammar objects
  // that represent the grammars that will be understood
  // by the current SpeechRecognition.
  //
  // SpeechRecognitionインターフェイスのgrammarsプロパティは、
  // 現在のSpeechRecognitionで認識される文法を表す
  // SpeechGrammarオブジェクトのコレクションを返して設定します。
  get grammars(): SpeechGrammarListType {
    return this._grammars;
  }

  set grammars(grammars: SpeechGrammarListType) {
    this._grammars = grammars;
    if (this._grammars !== undefined && this._grammars != null && this.internal) {
      this.internal.grammars = this._grammars;
    }
  }

  // The lang property of the SpeechRecognition interface returns
  // and sets the language of the current SpeechRecognition.
  // If not specified, this defaults to the HTML lang attribute value,
  // or the user agent's language setting if that isn't set either.
  //
  // SpeechRecognitionインターフェイスのlangプロパティは、
  // 現在のSpeechRecognitionの言語を返して設定します。
  // 指定されていない場合、これはデフォルトでHTMLのlang属性の値、
  // またはユーザエージェントの言語設定が設定されていない場合は
  // その値になります。
  get lang(): string {
    return this._lang;
  }

  set lang(lang: string) {
    this._lang = lang;
    if (this._lang !== undefined && this._lang != null && this.internal) {
      this.internal.lang = this._lang;
    }
  }

  // The continuous property of the SpeechRecognition interface controls
  // whether continuous results are returned for each recognition, or only a single result.
  //
  // SpeechRecognitionインターフェイスの連続プロパティは、
  // 認識結果ごとに連続した結果を返すか、単一の結果のみを返すかを制御します。
  get continuous(): boolean {
    return this._continuous;
  }

  set continuous(continuous: boolean) {
    this._continuous = continuous;
    if (this._continuous !== undefined && this._continuous != null && this.internal) {
      this.internal.continuous = this._continuous;
    }
  }

  // The interimResults property of the SpeechRecognition interface controls
  // whether interim results should be returned (true)
  // or not (false.) Interim results are results that are not yet final
  // (e.g. the SpeechRecognitionResult.isFinal property is false.)
  //
  // SpeechRecognitionインターフェイスのinterimResultsプロパティは、
  // 中間結果を返すかどうか（true）、そうでないか（false）を制御します。
  // 中間結果は、最終段階ではない結果です（SpeechRecognitionResult.isFinalプロパティはfalseです）。
  get interimResults(): boolean {
    return this._interimResults;
  }
  set interimResults(interimResults: boolean) {
    this._interimResults = interimResults;
    if (this._interimResults !== undefined && this._interimResults != null && this.internal) {
      this.internal.interimResults = this._interimResults;
    }
  }

  // The maxAlternatives property of the SpeechRecognition interface sets
  // the maximum number of SpeechRecognitionAlternatives
  // provided per SpeechRecognitionResult.
  //
  // SpeechRecognitionインターフェイスのmaxAlternativesプロパティは、
  // SpeechRecognitionResultごとに提供される
  // SpeechRecognitionAlternativesの最大数を設定します。
  get maxAlternatives(): number {
    return this._maxAlternatives;
  }
  set maxAlternatives(maxAlternatives: number) {
    this._maxAlternatives = maxAlternatives;
    if (this._maxAlternatives !== undefined && this._maxAlternatives != null && this.internal) {
      this.internal.maxAlternatives = this._maxAlternatives;
    }
  }

  // The serviceURI property of the SpeechRecognition interface specifies
  // the location of the speech recognition service
  // used by the current SpeechRecognition to handle
  // the actual recognition. The default is the user agent's
  // default speech service.
  //
  // SpeechRecognitionインターフェイスのserviceURIプロパティは、
  // 現在のSpeechRecognitionが実際の認識を処理するために使用する
  // 音声認識サービスの場所を指定します。
  // デフォルトはユーザエージェントのデフォルト音声サービスです。
  get serviceURI(): string {
    return this._serviceURI;
  }
  set serviceURI(serviceURI: string) {
    this._serviceURI = serviceURI;
    if (this._serviceURI !== undefined && this._serviceURI != null && this.internal) {
      this.internal.serviceURI = this._serviceURI;
    }
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
