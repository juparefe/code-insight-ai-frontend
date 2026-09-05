import { Component, EventEmitter, Output } from '@angular/core';

import {
  AnalyzeRepositoryRequest,
} from '../../models/analyze-repository-request.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repository-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './repository-input.component.html',
  styleUrl: './repository-input.component.scss',
})
export class RepositoryInputComponent {
  @Output() analyze = new EventEmitter<AnalyzeRepositoryRequest>();

  repositoryUrl = '';

  submit(): void {
    const url = this.repositoryUrl.trim();

    if (!url) {
      return;
    }

    this.analyze.emit({
      source: {
        type: 'GITHUB',
        url,
      },
    });
  }
}