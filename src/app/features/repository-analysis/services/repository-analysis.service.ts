import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AnalyzeRepositoryRequest } from '../models/analyze-repository-request.model';
import { RepositoryAnalysis } from '../models/repository-analysis.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryAnalysisService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/api/v1/repositories/analyze';

  analyze(
    request: AnalyzeRepositoryRequest,
  ): Observable<RepositoryAnalysis> {
    return this.http.post<RepositoryAnalysis>(
      this.apiUrl,
      request,
    );
  }
}