import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { RepositoryAnalysisService } from './repository-analysis.service';
import { AnalyzeRepositoryRequest } from '../models/analyze-repository-request.model';
import { environment } from '../../../../environments/environment';
import { createMockAnalysis } from '../testing/mock-analysis';

describe('RepositoryAnalysisService', () => {
  const analyzeUrl = `${environment.apiBaseUrl}/repositories/analyze`;
  const request: AnalyzeRepositoryRequest = {
    source: { type: 'GITHUB', url: 'https://github.com/acme/tasks' },
  };

  let service: RepositoryAnalysisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RepositoryAnalysisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('GIVEN the service under test, WHEN it is injected, then the instance exists', () => {
    expect(service).toBeTruthy();
  });

  it('GIVEN a request, WHEN the API responds with COMPLETED, then the request is posted and the result is emitted', async () => {
    const analysis = createMockAnalysis();
    const emitted = firstValueFrom(service.analyze(request));

    const req = httpMock.expectOne(analyzeUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush({ status: 'COMPLETED', result: analysis });

    await expect(emitted).resolves.toEqual(analysis);
  });

  it('GIVEN the API accepts the job asynchronously, WHEN the job endpoint is polled, then the result is emitted once the job is COMPLETED', async () => {
    vi.useFakeTimers();
    try {
      const analysis = createMockAnalysis();
      const emitted = firstValueFrom(service.analyze(request));

      httpMock
        .expectOne(analyzeUrl)
        .flush({ jobId: 'job-123', status: 'PENDING' });

      // Primer tick del poll (timer arranca a los 30s).
      await vi.advanceTimersByTimeAsync(30_000);
      httpMock
        .expectOne(`${analyzeUrl}/job-123`)
        .flush({ id: 'job-123', status: 'PROCESSING' });

      // Segundo tick (cada 10s) ya devuelve COMPLETED.
      await vi.advanceTimersByTimeAsync(10_000);
      httpMock
        .expectOne(`${analyzeUrl}/job-123`)
        .flush({ id: 'job-123', status: 'COMPLETED', result: analysis });

      await expect(emitted).resolves.toEqual(analysis);
    } finally {
      vi.useRealTimers();
    }
  });

  it('GIVEN an accepted job, WHEN its status becomes FAILED, then the stream errors with the job message', async () => {
    vi.useFakeTimers();
    try {
      const emitted = firstValueFrom(service.analyze(request));

      httpMock
        .expectOne(analyzeUrl)
        .flush({ jobId: 'job-123', status: 'PENDING' });

      await vi.advanceTimersByTimeAsync(30_000);
      httpMock.expectOne(`${analyzeUrl}/job-123`).flush({
        id: 'job-123',
        status: 'FAILED',
        error: { code: 'CLONE_FAILED', message: 'No se pudo clonar el repo' },
      });

      await expect(emitted).rejects.toThrow('No se pudo clonar el repo');
    } finally {
      vi.useRealTimers();
    }
  });

  it('GIVEN an accepted job, WHEN it completes without a result, then the stream errors', async () => {
    vi.useFakeTimers();
    try {
      const emitted = firstValueFrom(service.analyze(request));

      httpMock
        .expectOne(analyzeUrl)
        .flush({ jobId: 'job-123', status: 'PENDING' });

      await vi.advanceTimersByTimeAsync(30_000);
      httpMock
        .expectOne(`${analyzeUrl}/job-123`)
        .flush({ id: 'job-123', status: 'COMPLETED' });

      await expect(emitted).rejects.toThrow(
        'The analysis completed without a result.',
      );
    } finally {
      vi.useRealTimers();
    }
  });
});
