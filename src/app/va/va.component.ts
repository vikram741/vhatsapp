import { Component, OnInit } from '@angular/core';
import { VaService } from '../services/va.service';
import { finalize, take } from 'rxjs/operators';

@Component({
	selector: 'app-va',
	templateUrl: './va.component.html',
	styleUrls: ['./va.component.scss']
})
export class VaComponent implements OnInit {

	loading = false;
	qrCode = '';
	loggedIn = false;

	message = '';
	list = '';
	sent = false
	sending = false;
	success = false;
	failedList = [];

	constructor(private va: VaService) { }

	ngOnInit(): void {
		this.loadSession();
	}

	loadSession() {
		this.loading = true;
		this.va.createSession()
			.pipe(take(1))
			.subscribe(resp => {
				console.log(resp)
				this.qrCode = resp.data.urlCode;
				// console.log(this.qrCode)
				this.loading = false;
			}, err => {
				console.log(err)
			})
	}

	sendMessage() {
		this.sending = true;
		this.va.sendMessages({ list: this.list, message: this.message })
			.pipe(take(1), finalize(() => { this.sending = false; this.sent = true; }))
			.subscribe(resp => {
				console.log(resp);
				if (resp.status) {
					this.success = resp.status;
					this.failedList = resp.data.failedList
				} else {
					alert(resp.message)
				}
			}, err => {
				console.log(err);
			})
	}

	copyMessage(arr: any) {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = arr.join('\r\n');
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}
}

