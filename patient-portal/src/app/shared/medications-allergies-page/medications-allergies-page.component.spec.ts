import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsAllergiesPageComponent } from './medications-allergies-page.component';

describe('MedicationsAllergiesPageComponent', () => {
  let component: MedicationsAllergiesPageComponent;
  let fixture: ComponentFixture<MedicationsAllergiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationsAllergiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsAllergiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
