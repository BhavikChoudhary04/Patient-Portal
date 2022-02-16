import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsDialogComponent } from './medications-dialog.component';

describe('MedicationsDialogComponent', () => {
  let component: MedicationsDialogComponent;
  let fixture: ComponentFixture<MedicationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
