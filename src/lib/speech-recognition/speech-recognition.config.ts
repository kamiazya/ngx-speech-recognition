
export interface SpeechRecognitionConfig {
  grammars?: SpeechGrammarList;
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  serviceURI?: string;
  onaudiostart?: (ev: Event) => any;
  onsoundstart?: (ev: Event) => any;
  onspeechstart?: (ev: Event) => any;
  onspeechend?: (ev: Event) => any;
  onsoundend?: (ev: Event) => any;
  onaudioend?: (ev: Event) => any;
  onresult?: (ev: SpeechRecognitionEvent) => any;
  onnomatch?: (ev: SpeechRecognitionEvent) => any;
  onerror?: (ev: SpeechRecognitionError) => any;
  onstart?: (ev: Event) => any;
  onend?: (ev: Event) => any;
}
