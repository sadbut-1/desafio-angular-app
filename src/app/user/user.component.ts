import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userProfile: any;
  error: string;

  constructor(private api: ApiService, public userService: UserService) { }

  ngOnInit() {
    this.api.me().subscribe(res => {
      this.userProfile = res.data;
    }, err => {
      this.api.logout();
    });
    this.userService.selectedScreen = 'list';
  }

}
