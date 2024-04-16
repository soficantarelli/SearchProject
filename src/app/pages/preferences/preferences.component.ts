import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faMicrophone, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPreferences } from 'src/app/api/models/i-preferences';
import { IUser } from 'src/app/api/models/i-user';
import { PreferenceResourceService } from 'src/app/api/resources/preference-resource.service';
import { AuthService } from 'src/app/common/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  formGroup: FormGroup;

  faSearch = faSearch;
  faMic = faMicrophone;

  preferences: IPreferences;
  user: IUser;
  htmlExample: string;

  search_speech: string;

  recognition: any;

  isListening: boolean = false;

  
  constructor(
    private api: PreferenceResourceService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.preferences = data['preferences'];
      this.user = data['user'];
    });

    this.formGroup = this.formBuilder.group({
      borderRadius: [this.preferences.borderRadius],
      borderWith: [this.preferences.borderWith],
      iconUrl: [this.preferences.iconUrl],
      search: [this.preferences.search],
      color: [this.preferences.color],
      iconSize: [this.preferences.iconSize],
      timeMetadata: [this.preferences.timeMetadata],
      transcript: ['']
    });

    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;

      this.formGroup.get('transcript')!.setValue(transcript);
    };

    this.htmlExample = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <script src="./buscador.js"></script>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      </head>
      <body>
          <app-search-client token="${this.user.token}"></app-search-client>
      </body>
      </html>
  `
  }
  
  toggleRecognition() {
    console.log(this.isListening);
    if (this.isListening) {
      this.stopRecognition();
    } else {
      this.formGroup.get('transcript')!.setValue('');
      this.startRecognition();
    }
  }

  startRecognition() {
    this.recognition.start();
    this.isListening = true;
  }

  stopRecognition() {
    this.recognition.stop();
    this.isListening = false;
  }

  download(): void {
      this.api.getFile().subscribe({
        next: data => {
          this.downloadFile(data)
        }, 
        error: err =>  {
          err.error.msg;
        },
        complete: () => console.log("Download")
      });
  }

  downloadFile(data: Blob) {
    const blob = new Blob([data], { type: 'application/javascript' });
    const url = window.URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.download = "buscador.js";
    anchor.href = url;
    anchor.click();
  }


  update(): void {
    console.log(this.formGroup.value);
    this.api.update(this.formGroup.value).subscribe({
      complete: () => {
        console.log("update");
      }
    })
  }

  get borderWith() {
    return this.formGroup.get('borderWith')!.value;
  }

  get borderRadius() {
    return this.formGroup.get('borderRadius')!.value;
  }

  get iconUrl() {
    return this.formGroup.get('iconUrl')!.value;
  }

  get iconSize() {
    return this.formGroup.get('iconSize')!.value;
  }

  get color() {
    return this.formGroup.get('color')!.value;
  }

  get search() {
    return this.formGroup.get('search')!.value;
  }

  get timeMetadata() {
    return this.formGroup.get('timeMetadata')!.value;
  }

  

}
