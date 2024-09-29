import { Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { RegisterComponent } from './feature/auth/components/register/register.component';
import { AboutComponent } from './feature/about/about.component';
import { ContactComponent } from './feature/contact/contact.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard, loginRegisterGuard } from './core/guards';

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
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
