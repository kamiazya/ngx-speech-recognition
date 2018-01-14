import { Observable } from 'rxjs/Observable';
import { Injectable, ApplicationRef, Inject, Optional } from '@angular/core';

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
} from '../adapter';


@Injectable()
/**
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 */
export class SpeechRecognitionService {
  private internal: SpeechRecognition;


  private initHandlers() {
    const _ = () => { };
    if (!this.audiostartHandler) { this.audiostartHandler = _; }
    if (!this.soundstartHandler) { this.soundstartHandler = _; }
    if (!this.speechstartHandler) { this.speechstartHandler = _; }
    if (!this.speechendHandler) { this.speechendHandler = _; }
    if (!this.soundendHandler) { this.soundendHandler = _; }
    if (!this.audioendHandler) { this.audioendHandler = _; }
    if (!this.resultHandler) { this.resultHandler = _; }
    if (!this.nomatchHandler) { this.nomatchHandler = _; }
    if (!this.errorHandler) { this.errorHandler = _; }
    if (!this.startHandler) { this.startHandler = _; }
    if (!this.endHandler) { this.endHandler = _; }
  }

  private initInternal() {
    this.internal = new SpeechRecognition();

    // see setter methods
    this.grammars = this._grammars;
    this.lang = this._lang;
    this.continuous = this._continuous;
    this.interimResults = this._interimResults;
    this.maxAlternatives = this._maxAlternatives;
    this.serviceURI = this._serviceURI;

    this.internal.onaudiostart = (e: Event) => {
      this.audiostartHandler(e);
      this.ref.tick();
    };
    this.internal.onsoundstart = (e: Event) => {
      this.soundstartHandler(e);
      this.ref.tick();
    };
    this.internal.onspeechstart = (e: Event) => {
      this.speechstartHandler(e);
      this.ref.tick();
    };
    this.internal.onspeechend = (e: Event) => {
      this.speechendHandler(e);
      this.ref.tick();
    };
    this.internal.onsoundend = (e: Event) => {
      this.soundendHandler(e);
      this.ref.tick();
    };
    this.internal.onaudioend = (e: Event) => {
      this.audioendHandler(e);
      this.ref.tick();
    };
    this.internal.onresult = (e: SpeechRecognitionEvent) => {
      this.resultHandler(e);
      this.ref.tick();
    };
    this.internal.onnomatch = (e: SpeechRecognitionEvent) => {
      this.nomatchHandler(e);
      this.ref.tick();
    };
    this.internal.onerror = (e: SpeechRecognitionError) => {
      this.errorHandler(e);
      this.ref.tick();
    };
    this.internal.onstart = (e: Event) => {
      this.startHandler(e);
      this.ref.tick();
    };
    this.internal.onend = (e: Event) => {
      this.endHandler(e);
      this.ref.tick();
    };
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

    @Optional() @Inject(SpeechRecognitionAudiostartHandler)
    private audiostartHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSoundstartHandler)
    private soundstartHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSpeechstartHandler)
    private speechstartHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSpeechendHandler)
    private speechendHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionSoundendHandler)
    private soundendHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionAudioendHandler)
    private audioendHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionResultHandler)
    private resultHandler: (ev: SpeechRecognitionEvent) => any,

    @Optional() @Inject(SpeechRecognitionNomatchHandler)
    private nomatchHandler: (ev: SpeechRecognitionEvent) => any,

    @Optional() @Inject(SpeechRecognitionErrorHandler)
    private errorHandler: (ev: SpeechRecognitionError) => any,

    @Optional() @Inject(SpeechRecognitionStartHandler)
    private startHandler: (ev: Event) => any,

    @Optional() @Inject(SpeechRecognitionEndHandler)
    private endHandler: (ev: Event) => any
  ) {
    this.initHandlers();

    this.initInternal();
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


  // The onaudiostart property of the SpeechRecognition interface
  // represents an event handler that will run
  // when the user agent has started to capture audio
  // (when the audiostart event fires.)
  //
  // SpeechRecognitionインターフェイスのonaudiostartプロパティは、
  // ユーザーエージェントがオーディオのキャプチャを開始したとき
  // （audiostartイベントが発生したとき）に実行されるイベントハンドラを
  // 表します。
  set onaudiostart(handler: (ev: Event) => any) {
    this.audiostartHandler = handler;
  }

  // The onsoundstart property of the SpeechRecognition interface represents
  // an event handler that will run when any sound
  // — recognisable speech or not
  // — has been detected (when the soundstart event fires.)
  //
  // SpeechRecognitionインターフェイスのonsoundstartプロパティは、
  // サウンド認識可能な音声が検出されたときに実行されるイベントハンドラを表します
  // （サウンドスタートイベントが発生したとき）。
  set onsoundstart(handler: (ev: Event) => any) {
    this.soundstartHandler = handler;
  }

  // The onspeechstart property of the SpeechRecognition interface represents
  // an event handler that will run when sound recognised
  // by the speech recognition service as speech has been detected
  // (when the speechstart event fires.)
  //
  // SpeechRecognitionインターフェイスのonspeechstartプロパティは、
  // スピーチが検出されたとき（スピーチ開始イベントが発生したとき）に
  // 音声認識サービスによって認識されたサウンドが実行されるイベントハンドラを表します。
  set onspeechstart(handler: (ev: Event) => any) {
    this.speechstartHandler = handler;
  }

  // The onspeechend property of the SpeechRecognition interface represents
  // an event handler that will run when speech recognised
  // by the speech recognition service has stopped being detected
  // (when the speechend event fires.)
  //
  // SpeechRecognitionインターフェイスのonspeechendプロパティは、
  // 音声認識サービスによって認識された音声が検出されなくなったとき
  // （Speechendイベントが発生したとき）に実行されるイベントハンドラを表します。
  set onspeechend(handler: (ev: Event) => any) {
    this.speechendHandler = handler;
  }

  // The onsoundend property of the SpeechRecognition interface represents
  // an event handler that will run when any sound
  // — recognisable speech or not — has stopped being detected
  // (when the soundend event fires.)
  //
  // SpeechRecognitionインターフェイスのonsoundendプロパティは、
  // サウンド認識可能な音声が検出されなくなったときに実行されるイベントハンドラを表します
  // （サウンドエンドイベントが発生したとき）。
  set onsoundend(handler: (ev: Event) => any) {
    this.soundendHandler = handler;
  }

  // The onaudioend property of the SpeechRecognition interface represents
  // an event handler that will run
  // when the user agent has finished capturing audio
  // (when the audioend event fires.)
  //
  // SpeechRecognitionインターフェイスのonaudioendプロパティは、
  // ユーザーエージェントがオーディオのキャプチャを終了したとき
  // （オーディオエンドイベントが発生したとき）に実行されるイベントハンドラを表します。
  set onaudioend(handler: (ev: Event) => any) {
    this.audioendHandler = handler;
  }

  // The onresult property of the SpeechRecognition interface represents
  // an event handler that will run
  // when the speech recognition service returns a result
  // — a word or phrase has been positively recognized
  // and this has been communicated back to the app
  // (when the result event fires.)
  //
  // SpeechRecognitionインターフェイスのonresultプロパティは、
  // 音声認識サービスが結果を返すときに実行されるイベントハンドラを表します。
  // 単語やフレーズが確実に認識され、結果イベントが発生したときにアプリに返されます。
  set onresult(handler: (ev: SpeechRecognitionEvent) => any) {
    this.resultHandler = handler;
  }

  // The onnomatch property of the SpeechRecognition interface represents
  // an event handler that will run
  // when the speech recognition service returns
  // a final result with no significant recognition
  // (when the nomatch event fires.)
  //
  // This may involve some degree of recognition
  //  which doesn't meet or exceed the confidence threshold.
  //
  //
  // SpeechRecognitionインターフェイスのonnomatchプロパティは、
  // 音声認識サービスが重要な認識なしに（nomatchイベントが発生したとき）
  // 最終結果を返すときに実行されるイベントハンドラを表します。
  //
  // これには、ある程度の認識が必要であり、これは信頼限界を満たさないか、
  // 超えている。
  set onnomatch(handler: (ev: SpeechRecognitionEvent) => any) {
    this.nomatchHandler = handler;
  }

  // The onerror property of the SpeechRecognition interface represents
  // an event handler that will run
  // when a speech recognition error occurs
  // (when the error event fires.)
  //
  // SpeechRecognitionインターフェイスのonerrorプロパティは、
  // 音声認識エラーが発生したとき（エラーイベントが発生したとき）に
  // 実行されるイベントハンドラを表します。
  set onerror(handler: (ev: SpeechRecognitionError) => any) {
    this.errorHandler = handler;
  }

  // The onstart property of the SpeechRecognition interface represents
  // an event handler that will run when the speech
  // recognition service has begun listening
  // to incoming audio with intent to recognize grammars
  // associated with the current SpeechRecognition
  // (when the start event fires.)
  //
  //
  // SpeechRecognitionインターフェイスのonstartプロパティは、
  // 音声認識サービスが現在のSpeechRecognitionに関連付けられている文法を
  // 認識することを目的として着信オーディオを聴き始めたときに実行される
  // イベントハンドラを表します（開始イベントが発生したとき）。
  set onstart(handler: (ev: Event) => any) {
    this.startHandler = handler;
  }

  // The onend property of the SpeechRecognition interface represents
  // an event handler that will run when the speech recognition
  // service has disconnected (when the end event fires.)
  //
  // SpeechRecognitionインターフェイスのonendプロパティは、
  // 音声認識サービスが切断されたとき（終了イベントが発生したとき）に
  // 実行されるイベントハンドラを表します。
  set onend(handler: (ev: Event) => any) {
    this.endHandler = handler;
  }

  // The start() method of the Web Speech API starts the speech recognition service
  // listening to incoming audio with intent to recognize grammars
  // associated with the current SpeechRecognition.
  //
  // Web Speech APIのstart（）メソッドは、現在のSpeechRecognitionに
  // 関連付けられた文法を認識することを目的として、
  // 着信音声を聴取する音声認識サービスを開始します。
  public start(): void {
    this.internal.start();
    this.ref.tick();
  }

  // The stop() method of the Web Speech API stops the speech recognition service
  // from listening to incoming audio, and attempts to return a SpeechRecognitionResult
  // using the audio captured so far.
  //
  // Web Speech APIのstop（）メソッドは、音声認識サービスが着信音声を聴取するのを停止し、
  // これまでに取得した音声を使用してSpeechRecognitionResultを返そうとします。
  public stop(): void {
    this.internal.stop();
    this.ref.tick();
  }

  // The abort() method of the Web Speech API stops the speech recognition service
  // from listening to incoming audio, and doesn't attempt to return
  // a SpeechRecognitionResult.
  //
  // Web Speech APIのabort（）メソッドは、音声認識サービスが着信オーディオを聴くのをやめ、
  // SpeechRecognitionResultを返そうとしません。
  public abort(): void {
    this.internal.abort();
    this.ref.tick();
  }


}
