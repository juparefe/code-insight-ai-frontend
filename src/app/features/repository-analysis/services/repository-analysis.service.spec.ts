import { TestBed } from '@angular/core/testing';
import { RepositoryAnalysisService } from './repository-analysis.service';

describe('RepositoryAnalysisService', () => {
  let service: RepositoryAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositoryAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
