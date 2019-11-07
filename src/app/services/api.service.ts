import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: HttpHeaders;
  token: any;
  user: any;

  constructor(private http: HttpClient,
              private storage: LocalStorageService,
              private router: Router) { }

  getHeaders() {
    this.token = this.storage.getObject('token');
    return new HttpHeaders({ 'content-type': 'application/json', 'x-access-token': this.token });
  }

  login(email, password) {
    return this.http.post<any>(environment.url + '/login/', { email, password },
      { headers: new HttpHeaders({ 'content-type': 'application/json' }) });
  }

  logout() {
    this.storage.remove('token');
    this.router.navigateByUrl('/login');
  }

  me() {
    return this.http.get<any>(environment.url + '/users/me', { headers: this.getHeaders() });
  }

  listUsers(page) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    return this.http.get<any>(environment.url + '/users/', { params, headers: this.getHeaders() });
  }

  findUser(id) {
    return this.http.get(environment.url + `/users/user/${id}`, { headers: this.getHeaders() });
  }

  filterUsers(query, page = 1) {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('filter', query);
    return this.http.get<any>(environment.url + `/users/filter/`, { params, headers: this.getHeaders() });
  }

  deleteUser(id) {
    return this.http.delete(environment.url + `/users/${id}`, { headers: this.getHeaders() });
  }

  createUser(userData) {
    return this.http.post<any>(environment.url + '/users/', { userData }, { headers: this.getHeaders() });
  }

  editUser(userData, id) {
    return this.http.patch<any>(environment.url + `/users/${id}`, { userData }, { headers: this.getHeaders() });
  }

  getUser() {
    return this.user;
  }
}
