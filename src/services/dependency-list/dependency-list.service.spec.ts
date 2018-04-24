import { TestBed, inject } from '@angular/core/testing';

import { DependencyListService } from './dependency-list.service';

describe('DependencyListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DependencyListService]
    });
  });

  it('should be created', inject([DependencyListService], (service: DependencyListService) => {
    expect(service).toBeTruthy();
  }));
});
