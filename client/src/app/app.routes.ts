import { Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { RegisterComponent } from './feature/auth/components/register/register.component';
import { AboutComponent } from './feature/about/about.component';
import { ContactComponent } from './feature/contact/contact.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard, loginRegisterGuard } from './core/guards';
import { UserPanelComponent } from './feature/auth/components/user-panel/user-panel.component';
import { AddUserDetailsComponent } from './feature/auth/components/add-user-details/add-user-details.component';
import { EditUserDetailsComponent } from './feature/auth/components/edit-user-details/edit-user-details.component';
import { CareerPageComponent } from './shared/footer-components/career-page/career-page.component';
import { PrivacyPolicyPageComponent } from './shared/footer-components/privacy-policy-page/privacy-policy-page.component';
import { FaqPageComponent } from './shared/footer-components/faq-page/faq-page.component';
import { HelpCentarPageComponent } from './shared/footer-components/help-centar-page/help-centar-page.component';
import { ProfesionalServicesPageComponent } from './shared/footer-components/profesional-services-page/profesional-services-page.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'add-post',
    loadComponent: () =>
      import('./feature/posts/components/add-post/add-post.component').then(
        (c) => c.AddPostComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-post/:id',
    loadComponent: () =>
      import('./feature/posts/components/edit-post/edit-post.component').then(
        (c) => c.EditPostComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'post-details/:id',
    loadComponent: () =>
      import(
        './feature/posts/components/post-details/post-details.component'
      ).then((c) => c.PostDetailsComponent),
  },
  {
    path: 'add-user-details',
    component: AddUserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-user-details',
    component: EditUserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-details',
    component: UserPanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginRegisterGuard],
  },
  {
    path: 'careers',
    component: CareerPageComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPageComponent,
  },
  {
    path: 'faq',
    component: FaqPageComponent,
  },
  {
    path: 'professional-services',
    component: ProfesionalServicesPageComponent,
  },
  {
    path: 'help-centar',
    component: HelpCentarPageComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
