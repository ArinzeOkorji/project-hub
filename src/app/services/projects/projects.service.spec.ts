import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { UtilityService } from '../utility/utility.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilityService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
