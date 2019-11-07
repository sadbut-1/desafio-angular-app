import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  constructor(private api: ApiService, public userService: UserService) { }

  ngOnInit() {
    this.userService.listUsers();
  }

  pages(n: number): any[] {
    return Array(n);
  }

}
