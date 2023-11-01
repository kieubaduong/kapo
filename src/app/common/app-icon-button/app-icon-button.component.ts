import { Component, Input, isDevMode } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './app-icon-button.component.html',
  styleUrls: ['./app-icon-button.component.css']
})
export class AppIconButtonComponent {
  @Input() iconUrl: string = '';
  @Input() buttonText: string = 'Default Button Text';
  @Input() backgroundColor: string = 'white';
  @Input() borderColor: string = 'black';
  @Input() borderRadius: number = 4;

  logMessage(): void {
    if (isDevMode())
    console.log('Click not implemented yet'); // Log your desired message
  }
}
