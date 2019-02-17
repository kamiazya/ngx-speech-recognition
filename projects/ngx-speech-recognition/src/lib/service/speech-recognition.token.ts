import { InjectionToken } from '@angular/core';

import {
  SpeechGrammarListType,
} from '../adapter';

export const SpeechRecognitionGrammars = new InjectionToken<SpeechGrammarListType>('speech-recognition.grammars');
export const SpeechRecognitionLang = new InjectionToken<string>('speech-recognition.lang');
export const SpeechRecognitionContinuous = new InjectionToken<boolean>('speech-recognition.continuous');
export const SpeechRecognitionInterimResults = new InjectionToken<boolean>('speech-recognition.interimResults');
export const SpeechRecognitionMaxAlternatives = new InjectionToken<number>('speech-recognition.maxAlternatives');
export const SpeechRecognitionServiceUri = new InjectionToken<string>('speech-recognition.serviceURI');
export const SpeechRecognitionAudiostartHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onaudiostart');
export const SpeechRecognitionSoundstartHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onsoundstart');
export const SpeechRecognitionSpeechstartHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onspeechstart');
export const SpeechRecognitionSpeechendHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onspeechend');
export const SpeechRecognitionSoundendHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onsoundend');
export const SpeechRecognitionAudioendHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onaudioend');
export const SpeechRecognitionResultHandler = new InjectionToken<(ev: SpeechRecognitionEvent) => any>('speech-recognition.onresult');
export const SpeechRecognitionNomatchHandler = new InjectionToken<(ev: SpeechRecognitionEvent) => any>('speech-recognition.onnomatch');
export const SpeechRecognitionErrorHandler = new InjectionToken<(ev: SpeechRecognitionError) => any>('speech-recognition.onerror');
export const SpeechRecognitionStartHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onstart');
export const SpeechRecognitionEndHandler = new InjectionToken<(ev: Event) => any>('speech-recognition.onend');
