import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicsPageComponent } from './demographics-page.component';

describe('DemographicsPageComponent', () => {
  let component: DemographicsPageComponent;
  let fixture: ComponentFixture<DemographicsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographicsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
