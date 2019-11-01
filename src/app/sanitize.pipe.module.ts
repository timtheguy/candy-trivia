import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { Sanitize } from "./sanitize.pipe"; // <---

@NgModule({
  declarations:[Sanitize], // <---
  imports:[CommonModule],
  exports:[Sanitize] // <---
})

export class SanitizePipe{}