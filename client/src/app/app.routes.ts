import { Routes } from '@angular/router';
import { LoginComponent } from './feature/auth/components/login/login.component';
import { RegisterComponent } from './feature/auth/components/register/register.component';
import { AboutComponent } from './feature/about/about.component';
import { ContactComponent } from './feature/contact/contact.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './feature/home/home.component';
import { PostDetailsComponent } from './feature/posts/components/post-details/post-details.component';
import { AddPostComponent } from './feature/posts/components/add-post/add-post.component';
import { EditPostComponent } from './feature/posts/components/edit-post/edit-post.component';
import { AuthGuard, loginRegisterGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post-details/:id',
    component: PostDetailsComponent,
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
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
