import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { UtilityService } from '../utility/utility.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilityService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
