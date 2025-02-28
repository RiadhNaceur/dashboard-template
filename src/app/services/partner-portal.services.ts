import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

export interface Partner {
  id: number;
  partnerName: string;
  partnerType: string;
  contract: string;
  grosssales: number;
  commissions: number;
  conversions: number;
}

@Injectable({
  providedIn: 'root',
})
export class PartnerPortalService {
  private http = inject(HttpClient);
  private apiUrl = 'https://mockanapi.com/s/67ae1b3403f9ffca6f47eb79/partners';

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl).pipe(
    map(response => Object.values(response)),
      catchError(() => {
        console.error('Error fetching data');
        return of([]);
      })
    );
  }
}
