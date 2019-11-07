import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: LocalStorageService) { }

  ngOnInit() {
  }

  login() {
    this.api.login(this.email, this.password).subscribe(res => {
      this.storage.setObject('token', res.data.token);
      this.router.navigateByUrl('/profile');
    }, error => {
      this.error = 'Não é possível fazer login com as credenciais fornecidas.';
    });
  }

}
