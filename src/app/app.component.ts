import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'doc-extractor-tool-frontend';

  private router = inject(Router);

  // Track current route
  currentRoute$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => (event as NavigationEnd).url),
    startWith(this.router.url)
  );

  /**
   * Check if the current route matches the given path
   */
  isActiveRoute(path: string): boolean {
    return this.router.url === path;
  }
}
