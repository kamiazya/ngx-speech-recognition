**This package has not been maintained for a long time.**

**Please use it by copying the code.**

---

[![Build Status](https://travis-ci.com/kamiazya/ngx-speech-recognition.svg?branch=master)](https://travis-ci.com/kamiazya/ngx-speech-recognition) [![Maintainability](https://api.codeclimate.com/v1/badges/08225ee2c02a584dca4f/maintainability)](https://codeclimate.com/github/kamiazya/ngx-speech-recognition/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/08225ee2c02a584dca4f/test_coverage)](https://codeclimate.com/github/kamiazya/ngx-speech-recognition/test_coverage) [![npm version](https://badge.fury.io/js/%40kamiazya%2Fngx-speech-recognition.svg)](https://badge.fury.io/js/%40kamiazya%2Fngx-speech-recognition) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/cd6714ceafe6438abf661fec1c3fe615)](https://www.codacy.com/app/kamiazya/go-dispatcher?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kamiazya/go-dispatcher&amp;utm_campaign=Badge_Grade) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-recognition.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-recognition?ref=badge_shield)

# NgxSpeechRecognition

[![NPM](https://nodei.co/npm/@kamiazya/ngx-speech-recognition.png?downloads=true)](https://nodei.co/npm/@kamiazya/ngx-speech-recognition/)

Angular 5+ speech recognition service (based on browser implementation such as Chrome).

## Demo

[![demo](./speech.gif)](https://ngx-speech-recognition.stackblitz.io/)

Run `ng serve` for a demo server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## See

[Support Browsers](https://caniuse.com/#feat=speech-recognition)

[Web Speech API -- MDN](https://developer.mozilla.org/ja/docs/Web/API/Web_Speech_API)

## API

### RxSpeechRecognitionService

```typescript
import { Component } from '@angular/core';
import {
  RxSpeechRecognitionService,
  resultList,
} from '@kamiazya/ngx-speech-recognition';

@Component({
  selector: 'demo-rx',
  template: `
  <p>RxCompoent.message: {{message}}</p>
  <button
    [disabled]="service.started$ | async"
    (click)="listen()"
  >listen</button>
  <p>lang: ja</p>
  <p>grammars: none</p>
  `,
  styleUrls: ['./rx.component.css'],
  providers: [
    RxSpeechRecognitionService,
  ],
})
export class RxComponent {

  message = '';

  constructor(
    public service: RxSpeechRecognitionService,
  ) { }

  listen() {
    this.service
      .listen()
      .pipe(resultList)
      .subscribe((list: SpeechRecognitionResultList) => {
        this.message = list.item(0).item(0).transcript;
        console.log('RxComponent:onresult', this.message, list);
      });
  }

}
```

### Settings Example

#### Module Pattern

```typescript
import {
  SpeechRecognitionModule,
} from '@kamiazya/ngx-speech-recognition';

@NgModule({
  imports: [
    // load with configs.
    SpeechRecognitionModule.withConfig({
      lang: 'en-US',
      interimResults: true,
      maxAlternatives: 10,
    }),
  ],
})
export class DemoModule { }
```

#### Provider Pattern

Dependency Inject to `SpeechRecognitionService`.

```typescript
import {
  SpeechRecognitionLang,
  SpeechRecognitionMaxAlternatives,
  SpeechRecognitionGrammars,
  SpeechRecognitionService,
} from '@kamiazya/ngx-speech-recognition';

@Component({
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css'],
  providers: [
    {
      provide: SpeechRecognitionLang,
      useValue: 'en-US',
    },
    {
      provide: SpeechRecognitionMaxAlternatives,
      useValue: 1,
    },
    SpeechRecognitionService,
  ],
})
export class SubComponent { }
```

## Doccumentation

See this [link](https://kamiazya.github.io/ngx-speech-recognition/).

It generated by [CompoDoc](https://compodoc.app/).

## Installation

### By Angular CLI 6+

You can install this library by using `ng add @kamiazya/ngx-speech-recognition` command on your Angular project.

```bash
$ ng add @kamiazya/ngx-speech-recognition
Installing packages for tooling via yarn.
yarn add v1.12.3
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 2 new dependencies.
info Direct dependencies
└─ @kamiazya/ngx-speech-recognition@x.y.z
info All dependencies
├─ @angular/cdk@7.3.7
└─ @kamiazya/ngx-speech-recognition@x.y.z
✨  Done in 4.75s.
Installed packages for tooling via yarn.
    ✅️ Added dependency: @kamiazya/ngx-speech-recognition@x.y.z
    ✅️ Dependencies installed
    ✅️ SpeechRecognitionModule Imported to /src/app/app.module.ts
UPDATE package.json (1360 bytes)
UPDATE src/app/app.module.ts (446 bytes)
```

### By Manual

```bash
# yarn
yarn add @kamiazya/ngx-speech-recognition
# npm
npm i -S @kamiazya/ngx-speech-recognition
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-recognition.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-speech-recognition?ref=badge_large)

## Author

[kamiazya(Yuki Yamazaki)](https://github.com/kamiazya)

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W5VDNO)
