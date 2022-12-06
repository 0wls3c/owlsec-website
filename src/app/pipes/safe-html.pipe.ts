import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string) {
    // console.log('transform value from tab', value);
    this.sanitized.bypassSecurityTrustStyle(value);
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

