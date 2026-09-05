import { Component, inject } from '@angular/core';

import { RepositoryInputComponent } from '../../components/repository-input/repository-input.component';
import { AnalyzeRepositoryRequest } from '../../models/analyze-repository-request.model';
import { RepositoryAnalysisService } from '../../services/repository-analysis.service';

@Component({
  selector: 'app-repository-analysis',
  standalone: true,
  imports: [RepositoryInputComponent],
  templateUrl: './repository-analysis.component.html',
  styleUrl: './repository-analysis.component.scss',
})
export class RepositoryAnalysisComponent {
  private readonly repositoryAnalysisService = inject(
    RepositoryAnalysisService,
  );

  analyzeRepository(request: AnalyzeRepositoryRequest): void {
    this.repositoryAnalysisService.analyze(request).subscribe({
      next: (result) => {
        console.log('Repository analysis result:', result);
      },
      error: (error) => {
        console.error('Repository analysis error:', error);
      },
    });
  }
}