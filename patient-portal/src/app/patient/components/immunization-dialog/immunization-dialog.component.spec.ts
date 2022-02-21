import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationDialogComponent } from './immunization-dialog.component';

describe('ImmunizationDialogComponent', () => {
  let component: ImmunizationDialogComponent;
  let fixture: ComponentFixture<ImmunizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmunizationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmunizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
