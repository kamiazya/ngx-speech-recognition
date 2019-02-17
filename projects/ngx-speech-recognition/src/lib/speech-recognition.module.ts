import {
  NgModule,
  ModuleWithProviders,
  Provider,
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
  SpeechRecognitionService,
  RxSpeechRecognitionService,
} from './service';

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

  static buildProvidersFromConfig(config: SpeechRecognitionConfig): Provider[] {
    const providers: Provider[] = [];
    if (config.grammars !== undefined && config.grammars != null) {
      providers.push({
        useValue: config.grammars,
        provide: SpeechRecognitionGrammars,
      });
    }
    if (config.lang !== undefined && config.lang != null) {
      providers.push({
        useValue: config.lang,
        provide: SpeechRecognitionLang,
      });
    }
    if (config.continuous !== undefined && config.continuous != null) {
      providers.push({
        useValue: config.continuous,
        provide: SpeechRecognitionContinuous,
      });
    }
    if (config.interimResults !== undefined && config.interimResults != null) {
      providers.push({
        useValue: config.interimResults,
        provide: SpeechRecognitionInterimResults,
      });
    }
    if (config.maxAlternatives !== undefined && config.maxAlternatives != null) {
      providers.push({
        useValue: config.maxAlternatives,
        provide: SpeechRecognitionMaxAlternatives,
      });
    }
    if (config.serviceURI !== undefined && config.serviceURI != null) {
      providers.push({
        useValue: config.serviceURI,
        provide: SpeechRecognitionServiceUri,
      });
    }
    if (typeof config.onaudiostart === 'function') {
      providers.push({
        useValue: config.onaudiostart,
        provide: SpeechRecognitionAudiostartHandler,
      });
    }
    if (typeof config.onsoundstart === 'function') {
      providers.push({
        useValue: config.onsoundstart,
        provide: SpeechRecognitionSoundstartHandler,
      });
    }
    if (typeof config.onspeechstart === 'function') {
      providers.push({
        useValue: config.onspeechstart,
        provide: SpeechRecognitionSpeechstartHandler,
      });
    }
    if (typeof config.onspeechend === 'function') {
      providers.push({
        useValue: config.onspeechend,
        provide: SpeechRecognitionSpeechendHandler,
      });
    }
    if (typeof config.onsoundend === 'function') {
      providers.push({
        useValue: config.onsoundend,
        provide: SpeechRecognitionSoundendHandler,
      });
    }
    if (typeof config.onaudioend === 'function') {
      providers.push({
        useValue: config.onaudioend,
        provide: SpeechRecognitionAudioendHandler,
      });
    }
    if (typeof config.onresult === 'function') {
      providers.push({
        useValue: config.onresult,
        provide: SpeechRecognitionResultHandler,
      });
    }
    if (typeof config.onnomatch === 'function') {
      providers.push({
        useValue: config.onnomatch,
        provide: SpeechRecognitionNomatchHandler,
      });
    }
    if (typeof config.onerror === 'function') {
      providers.push({
        useValue: config.onerror,
        provide: SpeechRecognitionErrorHandler,
      });
    }
    if (typeof config.onstart === 'function') {
      providers.push({
        useValue: config.onstart,
        provide: SpeechRecognitionStartHandler,
      });
    }
    if (typeof config.onend === 'function') {
      providers.push({
        useValue: config.onend,
        provide: SpeechRecognitionEndHandler,
      });
    }
  
    return providers;
  }


  static forRoot(config: SpeechRecognitionConfig): ModuleWithProviders {
    const providers: Provider[] = SpeechRecognitionModule.buildProvidersFromConfig(config);
    providers.push({
      useClass: SpeechRecognitionService,
      provide: SpeechRecognitionService,
    });
    providers.push({
      useClass: RxSpeechRecognitionService,
      provide: RxSpeechRecognitionService,
    });
    return {
      ngModule: SpeechRecognitionModule,
      providers: providers,
    };
  }

  static withConfig(config: SpeechRecognitionConfig): ModuleWithProviders {
    return {
      ngModule: SpeechRecognitionModule,
      providers: SpeechRecognitionModule.buildProvidersFromConfig(config),
    };
  }
}
