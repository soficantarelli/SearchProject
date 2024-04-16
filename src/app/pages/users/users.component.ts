import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/api/models/i-user';
import { AuthService } from 'src/app/common/auth/auth.service';
import { faCheckCircle, faEdit, faTrashCan, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { UserResourceService } from 'src/app/api/resources/user-resource.service';
import { PreferenceResourceService } from 'src/app/api/resources/preference-resource.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  idToEdit!: number | null;
  listUser: IUser[];
  users: IUser[];

  faWindowClose = faWindowClose;
  faCheckCircle = faCheckCircle;
  faEdit = faEdit;
  faTrashCan = faTrashCan;

  formGroup: FormGroup;

  constructor(
    public authService: AuthService,
    private api: UserResourceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.users = data['users'];
    });

    this.listUser = this.users;

    this.formGroup = this.formBuilder.group({
      idUser: [null],
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: [''],
      company: ['']
    });
  }

  signup() {
    if (this.authService.isAdmin()) {
      const id = this.authService.getRole().idUser;
      this.formGroup.controls['role'].setValue("COMPANY");
      this.formGroup.controls['company'].setValue(id);

      this.api.signup(this.formGroup.value).subscribe({
        complete: () => {
          console.log("Signup");
          this.updateList();
          this.formGroup.reset();
        }
      })
    } else {
      const id = this.authService.getRole().idUser;
      this.formGroup.controls['role'].setValue("USER");
      this.formGroup.controls['company'].setValue(id);

      this.api.signup(this.formGroup.value).subscribe({
        complete: () => {
          console.log("Signup");
          this.updateList();
          this.formGroup.reset();
        }
      })
    }
  }

  impersonate(user: IUser) {
    const id = user.idUser!;
    this.api.impersonate({id}).subscribe({
      next: res => {
        this.authService.impersonate(res);
        this.router.navigate(['statistics']);
      }
    });
  }

  //openModal(modealConfig)
  //modalRef = this.modal.opne(ComponentModal, {centered true, backdrop: 'statis});
  //modealRef.componentInstance.modalCondig = modealConfig
  edit(user: IUser): void {
    console.log(user);
    this.idToEdit = user.idUser;
    this.idUser!.setValue(user.idUser);
    this.password!.setValue(user.password);
    this.password!.setValidators(null);
    this.lastName!.setValue(user.lastName);
    this.name!.setValue(user.name);
    this.username!.setValue(user.username);
    this.company!.setValue(user.company);
    this.role!.setValue(user.role);
  }

  delete(user: IUser): void {
    this.api.deleteUser({ id: user.idUser }).subscribe({
      complete: () => {
        this.updateList();
      } 
    })
  }

  update() {
    console.log(this.formGroup.value);

    this.api.update(this.formGroup.value).subscribe({
      complete: () => {
        this.updateList();
      }
    });
    this.cancel();
  }
  
  cancel() {
    this.idToEdit = null;
    this.formGroup.reset();
  }

  updateList() {
    if (this.authService.isAdmin()) {
      this.api.get().subscribe({
        next: res => {
          this.users = res;
          this.listUser = this.users;
        }
      });
    } else {
      this.api.getUserCompany().subscribe({
        next: res => {
          this.users = res;
          this.listUser = this.users;
        }
      });
    }
  }

  get idUser() {
    return this.formGroup?.get('idUser');
  }

  get name() {
    return this.formGroup?.get('name');
  }

  get lastName() {
    return this.formGroup?.get('lastName');
  }

  get username() {
    return this.formGroup?.get('username');
  }

  get password() {
    return this.formGroup?.get('password');
  }

  get company() {
    return this.formGroup?.get('company');
  }

  get role() {
    return this.formGroup?.get('role');
  }
}
