import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../../api/models/i-user';
import { AuthService } from '../../common/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	formGroup: FormGroup;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder
	) { }

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	login() {
		this.authService.login(this.formGroup.value as IUser);
	}

	get username() {
		return this.formGroup.get('username')?.value;
	  }
	
	  get password() {
		return this.formGroup.get('password')?.value;
	  }
}
