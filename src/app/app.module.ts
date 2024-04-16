import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  
import { TagInputModule } from 'ngx-chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MetadataComponent } from './pages/metadata/metadata.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { WebSitesComponent } from './pages/web-sites/web-sites.component';

import { HeaderComponent } from './common/components/header/header.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { ErrorInterceptor } from './common/interceptor/error.interceptor';
import { JwtInterceptor } from './common/interceptor/jwt.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { I18n } from '@ngx-translate/i18n-polyfill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageDialogComponent } from './common/error/message-dialog/message-dialog.component';
import { MessagesErrorService } from './common/error/messages-error.service';
import { FiltrarPipe } from './common/validators/filtrar.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    WebSitesComponent,
    MetadataComponent,
    PreferencesComponent,
    DashboardComponent,
    MessageDialogComponent,
    FiltrarPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ResourceModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,
    TagInputModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: MessagesErrorService }
  ],
  entryComponents: [
    MessageDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
