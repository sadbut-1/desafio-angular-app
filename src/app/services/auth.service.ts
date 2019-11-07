import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;

  constructor(private storage: LocalStorageService) { }

  isLogado() {
    this.token = this.storage.getObject('token');
    return this.token ? true : false;
  }

}
