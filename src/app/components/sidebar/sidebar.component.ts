import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatIconModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
      constructor(
          private matIconRegistry: MatIconRegistry,
          private domSanitizer: DomSanitizer) {
  
          this.matIconRegistry.addSvgIcon(
              "home",
              this.domSanitizer.bypassSecurityTrustResourceUrl("/home.svg")
          );
          this.matIconRegistry.addSvgIcon(
              "partners",
              this.domSanitizer.bypassSecurityTrustResourceUrl("/partners.svg")
          );
          this.matIconRegistry.addSvgIcon(
              "approvals",
              this.domSanitizer.bypassSecurityTrustResourceUrl("/approvals.svg")
          );
      }

  links = [
    { name: 'Dashboard', path: '', icon: 'home' },
    { name: 'Partners', path: '/partners', icon: 'partners' },
    { name: 'Approvals', path: '/approvals', icon: 'approvals' },
  ];
}
