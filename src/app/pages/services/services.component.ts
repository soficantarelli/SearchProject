import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth/auth.service';
import { faCheckCircle, faEdit, faTrashCan, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { IService } from 'src/app/api/models/i-services';
import { ServiceResourceService } from 'src/app/api/resources/service-resource.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  idToEdit!: number | null;

  formGroup: FormGroup;
  
  pingTest!: boolean | null;

  services: IService[];
  listServices: IService[];

  faWindowClose = faWindowClose;
  faCheckCircle = faCheckCircle;
  faEdit = faEdit;
  faTrashCan = faTrashCan;

  searchTerm = '';

  regex = new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*((\\.([a-z]{2,5}))(:[0-9]{1,5})?|(:[0-9]{1,5}))(\\/.*)?$");

  constructor(
    public authService: AuthService,
    private api: ServiceResourceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.pingTest = null;

    this.route.data.subscribe((data) => {
      this.services = data['services'];
    });

    this.listServices = this.services;

    this.formGroup = this.formBuilder.group({
      idService: [null],
      url: ['', [Validators.required, Validators.pattern(this.regex)]],
      protocol: ['', [Validators.required]],
      token: ['', [Validators.required]],
      ping: [false],
      checkingPing: [false]
    });
  }

  addService(): void { 
    if ((this.url!.value.toLocaleLowerCase().includes("?wsdl") && this.protocol!.value == "REST")
    || (!this.url!.value.toLocaleLowerCase().includes("?wsdl") && this.protocol!.value == "SOAP")) {
      console.log("Error")
      return;
    } else {
      console.log(this.formGroup.value);
      this.api.post(this.formGroup.value).subscribe({
        complete: () => {
          this.cancel();
          this.updateList();
        }
      });
    }
    this.pingTest = null;
  }


  edit(service: IService): void {
    this.idToEdit = service.idService;
    this.idService!.setValue(service.idService);
    this.url!.setValue(service.url);
    this.protocol!.setValue(service.protocol);
    this.ping!.setValue(false);
    this.token!.setValue(service.token);
  }

  delete(service: IService): void {
    //ver de mantener las paginas
    this.api.delete(service, { keepWebsites: false }, { id: service.idService }).subscribe({
      complete: () => {
          this.cancel();
          this.updateList();
      }
    })
  }

  update() {
    if ((this.url!.value.toLocaleLowerCase().includes("?wsdl") && this.protocol!.value == "REST")
    || (!this.url!.value.toLocaleLowerCase().includes("?wsdl") && this.protocol!.value == "SOAP")) {
      console.log("Error")
      return;
    } else {

      this.api.update(this.formGroup.value, null, { id: this.idService!.value }).subscribe({
        complete: () => {
          this.cancel();
          this.updateList();
        }
      });
    }
  }
  
  cancel() {
    this.idToEdit = null;
    this.formGroup.reset();
  }

  reindex(service: IService): void {
    this.api.reindex(this.formGroup.value, null, { id: service.idService }).subscribe({
      complete: () => {
        this.cancel();
        this.updateList();
      }
    })
  }

  updateList() {
    this.api.getServicesByUser().subscribe({
      next: res => {
        this.services = res;
        this.listServices = this.services;
      }
    });

    this.pingTest = null;
  }

  pingService() {
    this.pingTest = null;

    this.api.pingService(this.formGroup.value).subscribe({
      next: (res) => {
        this.pingTest = true;
      },
      error: (err) => {
        this.pingTest = false;
      }
    });
  }

  pingServiceAdded(service: IService) {
    this.pingTest = null;

    this.api.pingService(this.formGroup.value).subscribe({
      error: err => {
        this.ping?.setValue(false);
        service.up = false;
      }, 
      complete: () => {
        this.ping?.setValue(true);
        service.up = true;
      }
    });
  }

  get idService() {
    return this.formGroup?.get('idService');
  }

  get url() {
    return this.formGroup?.get('url');
  }

  get protocol() {
    return this.formGroup?.get('protocol');
  }

  get ping() {
    return this.formGroup?.get('ping');
  }

  get up() {
    return this.formGroup?.get('up');
  }

  get token() {
    return this.formGroup?.get('token');
  }
}
