import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { PartnerPortalService } from '../../services/partner-portal.services';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let partnerPortalService: PartnerPortalService;

  beforeEach(async () => {
    const mockPartnerPortalService = {
      getPartners: () => of([{
              id:1,
              partnerName:"Green Living",
              partnerType:"Influencer",
              conversions:7,
              commissions:420,
              grosssales:620,
              contract:"Partner Default"
          }])
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [DashboardComponent],
      providers: [
        { provide: PartnerPortalService, useValue: mockPartnerPortalService },
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    partnerPortalService = TestBed.inject(PartnerPortalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch partners on initialization', () => {
    spyOn(partnerPortalService, 'getPartners').and.returnValue(of([]));
    component.ngOnInit();
    expect(partnerPortalService.getPartners).toHaveBeenCalled();
  });
});