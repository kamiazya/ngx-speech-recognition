import {
  SpeechGrammarListType,
} from '../adapter';

export class SpeechRecognitionCommon {

  protected internal: SpeechRecognition = new SpeechRecognition();

  constructor(
    protected _grammars: SpeechGrammarListType,
    protected _lang: string,
    protected _continuous: boolean,
    protected _interimResults: boolean,
    protected _maxAlternatives: number,
    protected _serviceURI: string,
  ) { }


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

}
