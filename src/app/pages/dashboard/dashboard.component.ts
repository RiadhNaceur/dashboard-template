import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerPortalService } from '../../services/partner-portal.services';
import { Partner } from '../../models/partner.model';
import { SortConfig } from '../../models/sort.model';
import { downloadCSV, sortData } from '../../utils/dashboard.utils';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
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
    displayedColumns: string[] = ['id', 'name', 'type', 'contract', 'grossSales', 'commissions', 'conversions', 'details'];
    dateRange = new FormGroup({
        start: new FormControl(new Date(2022, 6, 6)),
        end: new FormControl(new Date(2022, 7, 5))
    });

    itemsPerPage = 15;
    currentPage = 1;
    totalPages = 1;
    totalItems = 0;
    paginatedData = signal<Partner[]>([]);
    sortConfig: SortConfig  = { column: '', descending: false };
    filterInput = '';

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
        this.matIconRegistry.addSvgIcon(
            "arrow",
            this.domSanitizer.bypassSecurityTrustResourceUrl("/next.svg")
        );
        this.matIconRegistry.addSvgIcon(
            "details",
            this.domSanitizer.bypassSecurityTrustResourceUrl("/details.svg")
        );
    }

    ngOnInit(): void {
        this.partnerPortalService.getPartners().subscribe(data => {
            this.partners.set(data);
            this.totalItems = data.length;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.currentPage = 1;
            this.updatePaginatedData();
            this.loading.set(false);
        });

    }

    updatePaginatedData(): void {
        let data = [...this.partners()];
        if (this.sortConfig.column) {
            data = sortData(data, this.sortConfig.column, this.sortConfig.descending);
        }
        if (this.filterInput) {
            data = this.filterData(data, this.filterInput);
        }
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedData.set(data.slice(start, end));
    }

    onSort(column: string): void {
        if (this.sortConfig.column === column) {
            this.sortConfig.descending = !this.sortConfig.descending;
        } else {
            this.sortConfig = { column, descending: false };
        }
        this.updatePaginatedData();
    }

    filterData(data: Partner[], filterInput: string): Partner[] {
        return data.filter(partner => {
            return (
                partner.partnerName.toLowerCase().includes(filterInput.toLowerCase()) ||
                partner.partnerType.toLowerCase().includes(filterInput.toLowerCase()) ||
                partner.contract.toLowerCase().includes(filterInput.toLowerCase())
            );
        });
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedData();
        }
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePaginatedData();
        }
    }

    getItemsStart(): number {
        return (this.currentPage - 1) * this.itemsPerPage + 1;
    }

    getItemsEnd(): number {
        const end = this.currentPage * this.itemsPerPage;
        return Math.min(end, this.totalItems);
    }

    alertButton(): void {
        alert('Details');
    }

    showMessage() { alert('Message Partners Clicked'); }

    exportList(): void {
        const data = this.partners();
        downloadCSV(data, 'partners');
    }

}