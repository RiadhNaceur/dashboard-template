import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PartnerPortalService, Partner } from '../../services/partner-portal.services'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    partners = signal<Partner[]>([]);
    loading = signal(true);
    displayedColumns: string[] = ['id', 'name', 'type', 'contract', 'grossSales', 'commissions', 'conversions'];
    dateRange = new FormGroup({
        start: new FormControl(new Date(2022, 6, 6)),
        end: new FormControl(new Date(2022, 7, 5))
    });

    constructor(
        private partnerPortalService: PartnerPortalService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer) {

        this.matIconRegistry.addSvgIcon(
            "message",
            this.domSanitizer.bypassSecurityTrustResourceUrl("/message.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "columns",
            this.domSanitizer.bypassSecurityTrustResourceUrl("/columns.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "export",
            this.domSanitizer.bypassSecurityTrustResourceUrl("/export.svg")
        );
    }

    ngOnInit(): void {
        this.partnerPortalService.getPartners().subscribe(data => {
            this.partners.set(data);
            this.loading.set(false);
        });
    }

    showMessage() { alert('Message Partners Clicked'); }
    exportList() { alert('Export List Clicked'); }
}
