/* tslint:disable */

export type SpeechGrammarListType = SpeechGrammarList;

if (window['webkitSpeechRecognition']) {
  window['SpeechRecognition'] = window['webkitSpeechRecognition'];
}
if (window['webkitSpeechGrammarList']) {
  window['SpeechGrammarList'] = window['webkitSpeechGrammarList'];
}
