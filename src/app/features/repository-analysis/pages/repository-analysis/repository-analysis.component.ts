import { Component, inject, signal } from '@angular/core';

import { RepositoryInputComponent } from '../../components/repository-input/repository-input.component';
import { AnalyzeRepositoryRequest } from '../../models/analyze-repository-request.model';
import { RepositoryAnalysisService } from '../../services/repository-analysis.service';
import { AnalysisStatus, RepositoryAnalysis } from '../../models/repository-analysis.model';
import { AnalysisSummaryComponent } from '../../components/analysis-summary/analysis-summary.component';
import { ArchitectureCardComponent } from '../../components/architecture-card/architecture-card.component';
import { TechnologiesCardComponent } from '../../components/technologies-card/technologies-card.component';
import { ComponentsCardComponent } from '../../components/components-card/components-card.component';
import { FindingsCardComponent } from '../../components/findings-card/findings-card.component';
import { RecommendationsCardComponent } from '../../components/recommendations-card/recommendations-card.component';

@Component({
  selector: 'app-repository-analysis',
  standalone: true,
  imports: [
    RepositoryInputComponent,
    AnalysisSummaryComponent,
    ArchitectureCardComponent,
    TechnologiesCardComponent,
    ComponentsCardComponent,
    FindingsCardComponent,
    RecommendationsCardComponent,
  ],
  templateUrl: './repository-analysis.component.html',
  styleUrl: './repository-analysis.component.scss',
})
export class RepositoryAnalysisComponent {
  private readonly repositoryAnalysisService = inject(RepositoryAnalysisService);

  readonly status = signal<AnalysisStatus>(AnalysisStatus.IDLE);
  analysisResult: RepositoryAnalysis | null = null;
  errorMessage: string | null = null;

  analyzeRepository(request: AnalyzeRepositoryRequest): void {
    this.status.set(AnalysisStatus.LOADING);
    this.analysisResult = null;
    this.errorMessage = null;
    this.repositoryAnalysisService.analyze(request).subscribe({
      next: (result) => {
        this.analysisResult = result;
        this.status.set(AnalysisStatus.SUCCESS);
      },
      error: (error) => {
        this.status.set(AnalysisStatus.ERROR);
        this.errorMessage = this.getErrorMessage(error);
        console.error('Repository analysis error:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          body: error.error,
        });
      },
    });
  }

  private getErrorMessage(error: {
    status?: number;
    error?: unknown;
  }): string {
    const body = error.error;

    if (typeof body === 'string' && body.trim()) {
      return body;
    }

    if (body && typeof body === 'object') {
      const payload = body as Record<string, unknown>;
      const nestedError = payload['error'];

      if (typeof payload['message'] === 'string') {
        return payload['message'];
      }

      if (
        nestedError &&
        typeof nestedError === 'object' &&
        typeof (nestedError as Record<string, unknown>)['message'] === 'string'
      ) {
        return (nestedError as Record<string, string>)['message'];
      }
    }

    return error.status
      ? `El backend respondió con el estado ${error.status}.`
      : 'No fue posible analizar el repositorio.';
  }
}
