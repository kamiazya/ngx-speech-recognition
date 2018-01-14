import { NgModule } from '@angular/core';

import {
  SubComponent,
  RxComponent,
} from './components';

@NgModule({
  declarations: [
    SubComponent,
    RxComponent,
  ],
  exports: [
    SubComponent,
    RxComponent,
  ],
})
export class SubModule { }
