import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit {
  changeToDarkTheme() {
    document.body.classList.replace('light-theme', 'dark-theme');
  }

  changeToLightTheme() {
    document.body.classList.replace('dark-theme', 'light-theme');
  }

  ngOnInit(): void {
    this.changeToDarkTheme();
  }
}
