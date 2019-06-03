import {
  NgModule,
  ModuleWithProviders,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

import {
  isPlatformBrowser,
} from '@angular/common';

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
} from './service/speech-recognition.token';

import {
  RxSpeechRecognitionService,
} from './service/rx-speech-recognition.service';
import {
  SpeechRecognitionService,
} from './service/speech-recognition.service';

import { SpeechRecognitionConfig } from './speech-recognition.config';
import { SPEECH_RECOGNITION_DEFAULT } from './speech-recognition.provider';

@NgModule({
  providers: [
    SPEECH_RECOGNITION_DEFAULT,
  ],
})
export class SpeechRecognitionModule {

  constructor(
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId) === false) {
      throw new Error('SpeechRecognitionModule: it run on PlatformBrowser.');
    }
  }

  static forRoot(config: SpeechRecognitionConfig): ModuleWithProviders {
    return {
      ngModule: SpeechRecognitionModule,
      providers: [
        // tslint:disable:max-line-length
        ...(config.grammars !== undefined && config.grammars != null ? [{ useValue: config.grammars, provide: SpeechRecognitionGrammars }] : []),
        ...(config.lang !== undefined && config.lang != null ? [{ useValue: config.lang, provide: SpeechRecognitionLang }] : []),
        ...(config.continuous !== undefined && config.continuous != null ? [{ useValue: config.continuous, provide: SpeechRecognitionContinuous }] : []),
        ...(config.interimResults !== undefined && config.interimResults != null ? [{ useValue: config.interimResults, provide: SpeechRecognitionInterimResults }] : []),
        ...(config.maxAlternatives !== undefined && config.maxAlternatives != null ? [{ useValue: config.maxAlternatives, provide: SpeechRecognitionMaxAlternatives }] : []),
        ...(config.serviceURI !== undefined && config.serviceURI != null ? [{ useValue: config.serviceURI, provide: SpeechRecognitionServiceUri }] : []),
        ...(config.onaudiostart instanceof Function ? [{ useValue: config.onaudiostart, provide: SpeechRecognitionAudiostartHandler }] : []),
        ...(config.onsoundstart instanceof Function ? [{ useValue: config.onsoundstart, provide: SpeechRecognitionSoundstartHandler }] : []),
        ...(config.onspeechstart instanceof Function ? [{ useValue: config.onspeechstart, provide: SpeechRecognitionSpeechstartHandler }] : []),
        ...(config.onspeechend instanceof Function ? [{ useValue: config.onspeechend, provide: SpeechRecognitionSpeechendHandler }] : []),
        ...(config.onsoundend instanceof Function ? [{ useValue: config.onsoundend, provide: SpeechRecognitionSoundendHandler }] : []),
        ...(config.onaudioend instanceof Function ? [{ useValue: config.onaudioend, provide: SpeechRecognitionAudioendHandler }] : []),
        ...(config.onresult instanceof Function ? [{ useValue: config.onresult, provide: SpeechRecognitionResultHandler }] : []),
        ...(config.onnomatch instanceof Function ? [{ useValue: config.onnomatch, provide: SpeechRecognitionNomatchHandler }] : []),
        ...(config.onerror instanceof Function ? [{ useValue: config.onerror, provide: SpeechRecognitionErrorHandler }] : []),
        ...(config.onstart instanceof Function ? [{ useValue: config.onstart, provide: SpeechRecognitionStartHandler }] : []),
        ...(config.onend instanceof Function ? [{ useValue: config.onend, provide: SpeechRecognitionEndHandler }] : []),
        { useClass: SpeechRecognitionService, provide: SpeechRecognitionService },
        { useClass: RxSpeechRecognitionService, provide: RxSpeechRecognitionService }
      ],
    };
  }

  static withConfig(config: SpeechRecognitionConfig): ModuleWithProviders {
    return {
      ngModule: SpeechRecognitionModule,
      providers: [
        // tslint:disable:max-line-length
        ...(config.grammars !== undefined && config.grammars != null ? [{ useValue: config.grammars, provide: SpeechRecognitionGrammars }] : []),
        ...(config.lang !== undefined && config.lang != null ? [{ useValue: config.lang, provide: SpeechRecognitionLang }] : []),
        ...(config.continuous !== undefined && config.continuous != null ? [{ useValue: config.continuous, provide: SpeechRecognitionContinuous }] : []),
        ...(config.interimResults !== undefined && config.interimResults != null ? [{ useValue: config.interimResults, provide: SpeechRecognitionInterimResults }] : []),
        ...(config.maxAlternatives !== undefined && config.maxAlternatives != null ? [{ useValue: config.maxAlternatives, provide: SpeechRecognitionMaxAlternatives }] : []),
        ...(config.serviceURI !== undefined && config.serviceURI != null ? [{ useValue: config.serviceURI, provide: SpeechRecognitionServiceUri }] : []),
        ...(config.onaudiostart instanceof Function ? [{ useValue: config.onaudiostart, provide: SpeechRecognitionAudiostartHandler }] : []),
        ...(config.onsoundstart instanceof Function ? [{ useValue: config.onsoundstart, provide: SpeechRecognitionSoundstartHandler }] : []),
        ...(config.onspeechstart instanceof Function ? [{ useValue: config.onspeechstart, provide: SpeechRecognitionSpeechstartHandler }] : []),
        ...(config.onspeechend instanceof Function ? [{ useValue: config.onspeechend, provide: SpeechRecognitionSpeechendHandler }] : []),
        ...(config.onsoundend instanceof Function ? [{ useValue: config.onsoundend, provide: SpeechRecognitionSoundendHandler }] : []),
        ...(config.onaudioend instanceof Function ? [{ useValue: config.onaudioend, provide: SpeechRecognitionAudioendHandler }] : []),
        ...(config.onresult instanceof Function ? [{ useValue: config.onresult, provide: SpeechRecognitionResultHandler }] : []),
        ...(config.onnomatch instanceof Function ? [{ useValue: config.onnomatch, provide: SpeechRecognitionNomatchHandler }] : []),
        ...(config.onerror instanceof Function ? [{ useValue: config.onerror, provide: SpeechRecognitionErrorHandler }] : []),
        ...(config.onstart instanceof Function ? [{ useValue: config.onstart, provide: SpeechRecognitionStartHandler }] : []),
        ...(config.onend instanceof Function ? [{ useValue: config.onend, provide: SpeechRecognitionEndHandler }] : []),
      ]
    };
  }
}
