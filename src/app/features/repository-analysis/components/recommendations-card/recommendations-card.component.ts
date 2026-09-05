import { Component, Input } from '@angular/core';

import { Recommendation } from '../../models/repository-analysis.model';

@Component({
  selector: 'app-recommendations-card',
  standalone: true,
  imports: [],
  templateUrl: './recommendations-card.component.html',
  styleUrl: './recommendations-card.component.scss',
})
export class RecommendationsCardComponent {
  @Input({ required: true })
  recommendations: Recommendation[] = [];

  getPriorityLabel(priority: string): string {
    const labels: Record<string, string> = {
      HIGH: 'Alta',
      MEDIUM: 'Media',
      LOW: 'Baja',
    };

    return labels[priority] ?? priority;
  }
}