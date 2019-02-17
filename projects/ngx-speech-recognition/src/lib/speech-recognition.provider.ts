import { Provider } from '@angular/core';

import {
  SpeechRecognitionContinuous,
  SpeechRecognitionInterimResults,
  SpeechRecognitionMaxAlternatives,
} from './service';

// tslint:disable-next-line:class-name
export const SPEECH_RECOGNITION_DEFAULT: Provider[] = [
  {
    provide: SpeechRecognitionContinuous,
    useValue: false,
  },
  {
    provide: SpeechRecognitionInterimResults,
    useValue: false,
  },
  {
    provide: SpeechRecognitionMaxAlternatives,
    useValue: 1,
  },
];
