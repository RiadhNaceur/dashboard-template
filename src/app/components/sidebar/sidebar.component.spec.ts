import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     declarations: [],
     providers: [provideHttpClient() ],
     imports: [ MatIconModule, RouterTestingModule, CommonModule, SidebarComponent ],
   })
   .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar on window resize 1', fakeAsync(() => {

    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(500);
    window.dispatchEvent(new Event('resize'));

    tick();

    expect(component.isMobile).toBeTrue();

  }));

  it('should toggle sidebar on window resize 2', fakeAsync(() => {

    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(800);
    window.dispatchEvent(new Event('resize'));

    tick();

    expect(component.isMobile).toBeFalse();
  }));

});