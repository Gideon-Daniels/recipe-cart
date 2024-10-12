import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() message = '';
  @Output() close = new EventEmitter<void>();
  constructor() {}

  onClose() {
    this.close.emit();
  }
}
