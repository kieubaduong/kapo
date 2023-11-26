import { Directive, ElementRef } from '@angular/core';

@Directive({selector: '[appScrollable]'})
export class ScrollableDirective {
  constructor(private _el: ElementRef) {}
  set scrollTop(value: number) { this._el.nativeElement.scrollTop = value; }
}