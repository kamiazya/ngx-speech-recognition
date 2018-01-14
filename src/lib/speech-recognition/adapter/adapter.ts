/* tslint:disable */

export var SpeechRecognition: SpeechRecognitionStatic;
if (webkitSpeechRecognition) {
  SpeechRecognition = webkitSpeechRecognition;
}

export type SpeechGrammarListType = SpeechGrammarList;

export var SpeechGrammarList: SpeechGrammarListStatic;
if (webkitSpeechGrammarList) {
  SpeechGrammarList = webkitSpeechGrammarList;
}
