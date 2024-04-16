# SearchProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


------------

npm install @types/web-speech-api

import { Component } from '@angular/core';

declare const webkitSpeechRecognition: any;

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent {
  recognition: any;
  transcription: string = '';

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
  }

  startListening(): void {
    this.recognition.start();
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      this.transcription += transcript;
    };
  }

  stopListening(): void {
    this.recognition.stop();
  }
}


<div>
  <button (click)="startListening()">Start Listening</button>
  <button (click)="stopListening()">Stop Listening</button>
</div>

<div>
  <p>{{ transcription }}</p>
</div>

-----------

npm install --save @google-cloud/speech

import { Injectable } from '@angular/core';
import { SpeechClient } from '@google-cloud/speech';

@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {
  private client: SpeechClient;

  constructor() {
    this.client = new SpeechClient({
      keyFilename: 'path/to/your/credentials.json' // Path to your downloaded credentials JSON file
    });
  }

  async transcribeAudio(file: File): Promise<string> {
    const audio = {
      content: file
    };

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US'
    };

    const request = {
      audio: audio,
      config: config
    };

    const [response] = await this.client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    return transcription;
  }
}

import { Component } from '@angular/core';
import { SpeechToTextService } from './speech-to-text.service';

@Component({
  selector: 'app-speech-to-text',
  template: `
    <input type="file" (change)="onFileChange($event)" />
    <button (click)="transcribe()">Transcribe</button>
  `
})
export class SpeechToTextComponent {
  private selectedFile: File;

  constructor(private speechToTextService: SpeechToTextService) {}

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async transcribe(): Promise<void> {
    if (this.selectedFile) {
      const transcription = await this.speechToTextService.transcribeAudio(this.selectedFile);
      console.log('Transcription:', transcription);
    } else {
      console.error('No file selected.');
    }
  }
}

---------

BACK
To perform speech-to-text conversion using the Google Cloud Speech-to-Text API in Java, you need to follow these steps:

Step 1: Set up a Google Cloud project and enable the Speech-to-Text API. Obtain the API key or service account credentials.

Step 2: Add the required dependencies to your Java project. You'll need the Google Cloud Speech-to-Text client library for Java. You can include it in your Maven or Gradle configuration file, or manually add the JAR file to your project.

Step 3: Write the Java code to interact with the API. Here's an example that demonstrates how to perform speech-to-text conversion:


import com.google.api.gax.core.CredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class SpeechToTextExample {

    public static void main(String[] args) throws Exception {
        // Set up Google Cloud credentials
        CredentialsProvider credentialsProvider = () -> GoogleCredentials.fromStream(
                Files.newInputStream(Paths.get("path/to/service_account_key.json")));

        // Set up Speech-to-Text client
        try (SpeechClient speechClient = SpeechClient.create(SpeechSettings.newBuilder()
                .setCredentialsProvider(credentialsProvider)
                .build())) {

            // The path to the audio file to transcribe
            String audioFilePath = "path/to/audiofile.wav";

            // Read the audio file
            Path path = Paths.get(audioFilePath);
            byte[] audioData = Files.readAllBytes(path);
            ByteString audioBytes = ByteString.copyFrom(audioData);

            // Configure the audio settings
            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                    .setSampleRateHertz(16000)
                    .setLanguageCode("en-US")
                    .build();
        // Perform the speech recognition
            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(audioBytes)
                    .build();

            RecognizeResponse response = speechClient.recognize(config, audio);
            List<SpeechRecognitionResult> results = response.getResultsList();

            // Print the transcriptions
            for (SpeechRecognitionResult result : results) {
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                System.out.println("Transcription: " + alternative.getTranscript());
            }
        }
    }
}

Make sure to replace "path/to/service_account_key.json" with the actual path to your service account key JSON file, and "path/to/audiofile.wav" with the path to the audio file you want to transcribe.

Note that you will need to replace "en-US" with the appropriate language code for your audio if it's not in English.

------------------


https://github.com/yasserg/crawler4j/blob/master/crawler4j/src/main/java/edu/uci/ics/crawler4j/crawler/CrawlController.java#L104

https://github.com/yasserg/crawler4j



WARNING: Skipping URL: https://images.gameinfo.io/, StatusCode: 404, text/html; charset=UTF-8, Not Found
