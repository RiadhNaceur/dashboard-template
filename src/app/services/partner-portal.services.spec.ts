import { TestBed } from '@angular/core/testing';
import { PartnerPortalService } from './partner-portal.services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PartnerPortalService', () => {
  let service: PartnerPortalService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PartnerPortalService]
    });

    service = TestBed.inject(PartnerPortalService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch partners', () => {

    service.getPartners().subscribe(partners => {
      expect(partners).toBeTruthy();
    });

    const req = httpTestingController.expectOne('https://mockanapi.com/s/67ae1b3403f9ffca6f47eb79/partners?mock_delay=5000');
    expect(req.request.method).toEqual('GET');
  });
});