import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  // tslint:disable-next-line: max-line-length
  template: '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ['./spinner.component.css']
})

export class SpinnerComponent {}
