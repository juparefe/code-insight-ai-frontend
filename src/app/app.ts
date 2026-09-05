import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepositoryAnalysisComponent } from './features/repository-analysis/pages/repository-analysis/repository-analysis.component';

@Component({
  selector: 'app-root',
  imports: [RepositoryAnalysisComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('code-insight-ai-frontend');
}
