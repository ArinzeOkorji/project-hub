import { TestBed } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientInMemoryWebApiModule, InMemoryDbService } from 'angular-in-memory-web-api';
import { importProvidersFrom } from '@angular/core';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        importProvidersFrom(
          HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            delay: 500,
          })
        )
      ]
    });
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
