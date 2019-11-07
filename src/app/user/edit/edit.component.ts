import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              public userService: UserService) { }

  ngOnInit() {
    const user = this.userService.user;
    this.userForm = this.formBuilder.group({
      name: [user.name , Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      cpf: [user.cpf, Validators.required],
      password: [user.password]
    });
  }

  get f() { return this.userForm.controls; }

  saveUserData() {
    this.submitted = true;
    this.api.editUser(this.userForm.value, this.userService.user._id).subscribe(() => {
      this.userService.listUsers();
      this.userService.selectedScreen = 'list';
    });
  }

}
