import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() qrCode: string = '';

  @Output() goto = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  next() {
    this.goto.emit({ next: true });
  }

}
