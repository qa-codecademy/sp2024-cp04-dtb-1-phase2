import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private themeService = inject(ThemeService);

  toogleTheme = signal<boolean>(false);

  currentUser = this.authService.currentUser;

  constructor() {
    effect(() => {
      if (this.toogleTheme()) {
        console.log(this.toogleTheme());
        this.themeService.changeToDarkTheme();
      }
      if (!this.toogleTheme()) {
        this.themeService.changeToLightTheme();
      }
    });
  }
  //Hamburger manu:
  menuValue: boolean = false;
  menu_icon: string = 'fa-solid fa-bars';
  openMenu() {
    this.menuValue = !this.menuValue;
    this.menu_icon = this.menuValue ? 'fa-solid fa-bars' : 'fa-solid fa-bars';
  }
  closeMenu() {
    this.menuValue = false;
    this.menu_icon = 'fa-solid fa-bars';
  }

  onLogOutClick() {
    this.authService.logOutUser();
  }

  onToogleClick() {
    this.toogleTheme.update((prev) => !prev);
  }

  onSubscribeClick(subscription: 'subscribe' | 'unsubscribe') {
    this.authService.updateUserSubcription(this.currentUser().id, subscription);
  }
}
