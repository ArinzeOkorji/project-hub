import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Location,
        MatDialog
      ]
    });
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
