import {
  Injectable,
  ApplicationRef,
  Inject,
  Optional,
} from '@angular/core';

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
  SpeechGrammarListType,
} from '../adapter';

import {
  SpeechRecognitionCommon,
} from './speech-recognition.common';

// @dynamic
@Injectable()
/**
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 */
export class SpeechRecognitionService extends SpeechRecognitionCommon {

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
    super(grammars, lang, continuous, interimResults, maxAlternatives, serviceURI);

    this.initHandlers();

    this.initInternal();
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
