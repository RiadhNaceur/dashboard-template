import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root',
})
export class PartnerPortalService {
  private http = inject(HttpClient);
  private apiUrl = 'https://mockanapi.com/s/67cc14553a2804e4806fa85d/mockpartners?mock_delay=3000';

  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl).pipe(
    map(response => Object.values(response)),
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw new Error('Failed to load data.');
      })
    );
  }
}
