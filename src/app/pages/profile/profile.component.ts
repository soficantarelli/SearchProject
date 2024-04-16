import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/api/models/i-user';
import { UserResourceService } from 'src/app/api/resources/user-resource.service';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formGroup: FormGroup;
  formPassword: FormGroup;
  user: IUser;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private api: UserResourceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });

    this.formGroup = this.formBuilder.group({
      idUser: [this.user.idUser],
      username: [this.user.username],
      name: [this.user.name],
      lastName: [this.user.lastName],
      company: [this.user.company],
      role: [this.user.role]
    });

    this.formPassword = this.formBuilder.group({
      idUser: [this.user.idUser],
      username: [this.user.username],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  update() {
    console.log(this.formGroup.value);

    this.api.update(this.formGroup.value).subscribe({
      complete: () => {
        console.log("Update");
      }
    });
  }

  updatePassword() {
    const password = this.password!.value;
    const passwordRepeat = this.repeatPassword!.value;

    if (password == passwordRepeat) {
      this.api.updatePass(this.formPassword.value).subscribe({
        complete: () => {
          console.log("Update");
        }
      });
    }
  }

  get idUser() {
    return this.formGroup?.get('idUser');
  }

  get username() {
    return this.formGroup.get('username');
  }

  get name() {
    return this.formGroup.get('name');
  }

  get lastName() {
    return this.formGroup.get('lastName');
  }

  get password() {
    return this.formPassword.get('password');
  }

  get repeatPassword() {
    return this.formPassword.get('repeatPassword');
  }

  get company() {
    return this.formGroup?.get('company');
  }

  get role() {
    return this.formGroup?.get('role');
  }
}
