import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root',
})
export class PartnerPortalService {
  private http = inject(HttpClient);
  private apiUrl = 'https://mockanapi.com/s/67ae1b3403f9ffca6f47eb79/partners?mock_delay=5000';

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
