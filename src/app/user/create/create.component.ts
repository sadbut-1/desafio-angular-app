import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              public userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.userForm.controls; }

  saveUserData() {
    this.submitted = true;
    this.api.createUser(this.userForm.value).subscribe(() => {
      this.userService.listUsers();
      this.userService.selectedScreen = 'list';
    });
  }

}
