import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedScreen: string;
  users: any;
  user: any;
  filterName: string;
  error: string;

  constructor(private api: ApiService) { }

  listUsers(page = 1) {
    this.error = '';
    this.api.listUsers(page).subscribe(res => {
      this.users = res.data;
    }, err => {
      this.showError();
    });
  }

  change(screen, user = null) {
    this.selectedScreen = screen;
    this.user = user;
  }

  delete(user) {
    this.api.deleteUser(user._id).subscribe(() => {
      this.listUsers();
    });
  }

  find() {
    this.api.findUser(this.user._id).subscribe(user => {
      this.users = user;
    });
  }

  filter(page = 1) {
    this.error = '';
    if (this.filterName) {
      this.api.filterUsers(this.filterName, page).subscribe(res => {
        this.users = res.data;
        this.filterName = '';
      }, err => {
        this.showError();
      });
    } else {
      this.listUsers();
    }
  }

  showError() {
    if (this.users) {
      this.users.docs = [];
    }
    this.error = 'Não foi possível obter os dados do usuário.';
  }
}
