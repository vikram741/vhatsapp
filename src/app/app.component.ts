import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'VhatsApp';
	locked = false;
	password = "1234";
	inputText = "";
	wrongPassword = false;

	unlock() {
		if (this.password == this.inputText) {
			this.locked = false;
			return;
		}
		this.wrongPassword = true;
	}
}
