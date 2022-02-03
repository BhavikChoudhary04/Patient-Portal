import { TestBed } from '@angular/core/testing';

import { SnackbarActionsService } from './snackbar-actions.service';

describe('SnackbarActionsService', () => {
  let service: SnackbarActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
