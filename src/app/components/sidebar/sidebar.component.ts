import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatIconModule, RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  links = [
    { name: 'Dashboard', path: '', icon: 'home' },
    { name: 'Partners', path: '/partners', icon: 'partners' },
    { name: 'Approvals', path: '/approvals', icon: 'approvals' },
  ];
  isSidebarOpen = false;
  isMobile = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
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

  ngOnInit(): void {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkMobile.bind(this));
  }

  checkMobile(): void {
    this.isMobile = window.innerWidth < 800;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
  }
}