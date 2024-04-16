import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth/auth.service';
import { faCheckCircle, faEdit, faTrashCan, faWindowClose, faSave } from '@fortawesome/free-regular-svg-icons';
import { IMetadata } from 'src/app/api/models/i-metadata';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MetadataResourceService } from 'src/app/api/resources/metadata-resource.service';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  formArray;

  idToEdit: number | null;
  editingControl: IMetadata | null;

  faWindowClose = faWindowClose;
  faCheckCircle = faCheckCircle;
  faEdit = faEdit;
  faTrashCan = faTrashCan;
  faSave = faSave;

  metadata: IMetadata[] = [];
  listMetadata: IMetadata[];

  checked: boolean = false;
  selectApproved = false;

  searchTerm = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api: MetadataResourceService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.metadata = data['metadata'];
      this.metadata = this.metadata.concat(data['approved']);
      this.listMetadata = this.metadata;
    })
    
    this.formArray = this.formBuilder.array([]);
    
    this.metadata.forEach((data) => {
      this.formArray.push(this.formBuilder.group({
        selected: [false],
        approved: [data.approved],
        id: [data.id],
        title: [data.title, [Validators.required]],
        tags: [data.tags == null ? [] : data.tags],
        filters: [data.filters == null ? [] : data.filters]
      }));
    })
  }

  selectAll(): void {
    if (this.checked) {
      /*if (this.selectApproved) {
        this.formArray.controls.filter(control => control.get('approved')!.value == true).map(control => control.get('selected')!.setValue(true));
      } else if (this.selectApproved === false) {
        this.formArray.controls.filter(control => control.get('approved')!.value == false).map(control => control.get('selected')!.setValue(true));
      } else{*/
        this.formArray.controls.map(control => control.get('selected')!.setValue(true));
      //}
    }
    else {
      this.formArray.controls.map(control => control.get('selected')!.setValue(false));
    }
  }

  countSelected(): number { 
    return this.formArray.controls.filter(control => control.get('selected')!.value == true).length;
  }

  edit(metadata: IMetadata) {
    console.log(metadata);
    this.idToEdit = this.getRealIndex(metadata.id);
    this.editingControl = this.formArray.controls[this.getRealIndex(metadata.id)].value;
  }

  cancel(reset: boolean) {
    if (this.editingControl != null && reset) {
      this.formArray.controls[this.idToEdit!].get('title')!.patchValue(this.editingControl.title);
      this.formArray.controls[this.idToEdit!].get('tags')!.patchValue(this.editingControl.tags);
      this.formArray.controls[this.idToEdit!].get('filters')!.patchValue(this.editingControl.filters);
    }
    this.editingControl = null;
    this.idToEdit = null;
  }

  delete(metadata: IMetadata): void {
    this.api.delete({id: metadata.id!}).subscribe({
      complete: () => {
        const index = this.getRealIndex(metadata.id);
        this.formArray.removeAt(index);
        this.metadata.splice(index, 1);
      }
    })
  }

  deleteBatch(): void {
    const selected: IMetadata[] = this.formArray.value.filter(control => control['selected'] == true);
    this.api.deleteBatch(selected).subscribe({
      complete: () => {
        console.log("delete batch");
        this.refreshDelete(selected)
      }
    })
  }

  refreshDelete(metadataL) {
    for (let metadata of metadataL) {
      const index = this.getRealIndex(metadata.id);
      this.formArray.removeAt(index);
      this.metadata.splice(index, 1);
    }
    
  }

  approve(data: IMetadata): void {
    const index = this.getRealIndex(data.id);
    let metadata = (this.formArray.controls[index].value as IMetadata);
    this.api.update(metadata).subscribe(
      () => {
        this.metadata[index].title = metadata.title;
        this.metadata[index].approved = true;
        this.formArray.controls[index].get('approved')!.setValue(true);
      }
    );
  }

  editSend(data: IMetadata): void {
    const index = this.getRealIndex(data.id);
    let metadata = (this.formArray.controls[index].value as IMetadata);
    this.api.update(metadata).subscribe(
      () => {
      }
    );
    this.editingControl = null;
    this.idToEdit = null;
  }

  updateBatch(): void {
    let selected: IMetadata[] = this.formArray.value.filter(control => control['selected'] == true);
    this.api.updateBatch(selected).subscribe(
      () => {
        selected.forEach((item) => {
          let index = this.getRealIndex(item.id);
          this.metadata[index].title = item.title;
          this.metadata[index].approved = true;
          this.formArray.controls[index].get('approved')!.setValue(true);
        })});
        this.formArray.controls.map(control => control.get('selected')!.setValue(false));
  }

  getRealIndex(id) {
    return this.metadata.findIndex(metadata => metadata.id == id);
  }
}