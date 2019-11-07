import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() user: any;

  constructor(private router: Router, private storage: LocalStorageService) { }

  ngOnInit() {
  }

  sair() {
    this.storage.remove('token');
    this.router.navigateByUrl('/login');
  }
}
