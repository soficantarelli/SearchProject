import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from './api/models/roles';
import { IsAuthenticateGuard } from './common/guards/is-authenticate.guard';
import { RoleGuard } from './common/guards/role.guard';
import { MetadataApprovedResolver } from './common/resolvers/metadata-approved-resolver';
import { MetadataResolver } from './common/resolvers/metadata-resolver';
import { PreferencesResolver } from './common/resolvers/preferences-resolver';
import { ServicesResolver } from './common/resolvers/services-resolver';
import { StatisticsResolver } from './common/resolvers/statistics-resolver';
import { UserResolver } from './common/resolvers/user-resolver';
import { UsersResolver } from './common/resolvers/users-resolver';
import { WebsitesResolver } from './common/resolvers/websites-resolver';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MetadataComponent } from './pages/metadata/metadata.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ServicesComponent } from './pages/services/services.component';
import { UsersComponent } from './pages/users/users.component';
import { WebSitesComponent } from './pages/web-sites/web-sites.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [IsAuthenticateGuard],  resolve: {user: UserResolver} },
  { path: 'users', component: UsersComponent, canActivate: [IsAuthenticateGuard, RoleGuard],  resolve: {users: UsersResolver}, data: { roles: [Role.ADMIN, Role.COMPANY] }},
  { path: 'services', component: ServicesComponent, canActivate: [IsAuthenticateGuard],  resolve: {services: ServicesResolver} },
  { path: 'websites', component: WebSitesComponent, canActivate: [IsAuthenticateGuard],  resolve: {websites: WebsitesResolver} },
  { path: 'metadata', component: MetadataComponent, canActivate: [IsAuthenticateGuard],  resolve: {metadata: MetadataResolver, approved: MetadataApprovedResolver} },
  { path: 'statistics', component: DashboardComponent, canActivate: [IsAuthenticateGuard],  resolve: {statistics: StatisticsResolver}},
  { path: 'preferences', component: PreferencesComponent, canActivate: [IsAuthenticateGuard],  resolve: {preferences: PreferencesResolver, user: UserResolver} },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }