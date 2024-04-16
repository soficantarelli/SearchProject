import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/api/models/i-user';
import { IWebsite } from 'src/app/api/models/i-website';
import { AuthService } from 'src/app/common/auth/auth.service';
import { faCheckCircle, faEdit, faTrashCan, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { WebsiteResourceService } from 'src/app/api/resources/website-resource.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-web-sites',
  templateUrl: './web-sites.component.html',
  styleUrls: ['./web-sites.component.css']
})
export class WebSitesComponent implements OnInit {

  idToEdit: number | null;

  websites: IWebsite[];
  listWebsites: IWebsite[];

  formGroup: FormGroup;
  searchTerm = '';

  faWindowClose = faWindowClose;
  faCheckCircle = faCheckCircle;
  faEdit = faEdit;
  faTrashCan = faTrashCan;

  regex = new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*((\\.([a-z]{2,5}))(:[0-9]{1,5})?|(:[0-9]{1,5})?)(\\/.*)?$");

  pingTest!: boolean | null;

  pingTestNew!: boolean | null;

  constructor(
    public authService: AuthService,
    private api: WebsiteResourceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.pingTest = null;
    this.pingTestNew = null;

    this.route.data.subscribe((data) => {
      this.websites = data['websites'];
    });

    this.listWebsites = this.websites;

    this.formGroup = this.formBuilder.group({
      idWebSite: [null],
      url: ['', [Validators.required, Validators.pattern(this.regex)]]
    });
  }

  addWebsite() {
    this.api.post(this.formGroup.value).subscribe({
      complete: () => {
        this.updateList();
        this.formGroup.reset();
      }
    })
  }

  edit(website: IWebsite): void {
    this.idToEdit = website.idWebSite!;
    this.idWebSite!.setValue(website.idWebSite);
    this.url!.setValue(website.url);
  }

  delete(website: IWebsite): void {
    const id = website.idWebSite!;
    this.api.delete({id}).subscribe({
      complete: () => {
        this.updateList();
      }
    })
  }

  update() {
    this.api.update(this.formGroup.value).subscribe({
      complete: () => {
        this.cancel();
        this.updateList();
      }
    })
  }
  
  cancel() {
    this.idToEdit = null;
    this.formGroup.reset();
  }

  reindex(website: IWebsite): void {
    const id = website.idWebSite!;
    this.api.reindex({id}).subscribe({
      complete: () => {
        this.cancel();
        this.updateList();
      }
    })
  }

  updateList() {
    this.api.getOwn().subscribe({
      next: res => {
        this.websites = res;
        this.listWebsites = this.websites;
      }
    });

    this.pingTest = null;
  }

  validate(website: IWebsite) {
    this.pingTest = null;

    const url = website.url!;
    const id = website.idWebSite!;


    this.api.validate({url}).subscribe({
      next: (res) => {
        this.pingTest = true;

        const up = true;
        website.up = true;

        this.api.up(website).subscribe({
          complete: () => {
            this.updateList();
          }
        })

      },
      error: (err) => {
        this.pingTest = false;
      }
    })
  }

  validateNew() {
    this.pingTestNew = null;

    this.api.validate(this.formGroup.value).subscribe({
      next: (res) => {
        this.pingTestNew = true;
      },
      error: (err) => {
        this.pingTestNew = false;
      }
    })
  }

  get idWebSite() {
    return this.formGroup?.get('idWebSite');
  }

  get url() {
    return this.formGroup?.get('url');
  }

}
