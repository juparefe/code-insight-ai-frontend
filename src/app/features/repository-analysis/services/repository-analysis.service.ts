import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { defer, filter, Observable, switchMap, take, timer } from 'rxjs';

import { AnalyzeRepositoryRequest } from '../models/analyze-repository-request.model';
import { RepositoryAnalysis } from '../models/repository-analysis.model';
import { AnalysisJob, AnalysisJobAccepted } from '../models/analysis-job.model';
import { environment } from '../../../../environments/environment';

interface AnalyzeRepositoryResponse {
  status: 'COMPLETED';
  result: RepositoryAnalysis;
}

@Injectable({
  providedIn: 'root',
})
export class RepositoryAnalysisService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/repositories/analyze`;
  private readonly jobsUrl = `${environment.apiBaseUrl}/repositories/analyze`;

  analyze(request: AnalyzeRepositoryRequest): Observable<RepositoryAnalysis> {
    return defer(() =>
      this.http.post<AnalyzeRepositoryResponse | AnalysisJobAccepted>(this.apiUrl, request),
    ).pipe(
      switchMap((response) => {
        if (response.status === 'COMPLETED') {
          return [response.result];
        }

        return this.pollJob(response.jobId);
      }),
    );
  }

  private pollJob(jobId: string): Observable<RepositoryAnalysis> {
    return timer(30000, 10000).pipe(
      switchMap(() => this.http.get<AnalysisJob>(`${this.jobsUrl}/${jobId}`)),
      filter((job) => job.status === 'COMPLETED' || job.status === 'FAILED'),
      take(1),
      switchMap((job) => {
        if (job.status === 'FAILED') {
          throw new Error(job.error?.message ?? 'Repository analysis failed');
        }

        if (!job.result) {
          throw new Error('The analysis completed without a result.');
        }

        return [job.result];
      }),
    );
  }
}
