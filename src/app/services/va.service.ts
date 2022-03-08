import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class VaService {

    private baseUrl = ''
    // private baseUrl = ''

    constructor(private apiService: ApiService) { }

    createSession() {
        return this.apiService.get(`${this.baseUrl}/api/createSession`);
    }

    sendMessages(data: any) {
        console.log(data)
        return this.apiService.post(`${this.baseUrl}/api/sendMessages`, data);
    }
}