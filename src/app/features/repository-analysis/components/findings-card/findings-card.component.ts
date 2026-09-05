import { Component, Input } from '@angular/core';

import { Finding } from '../../models/repository-analysis.model';

@Component({
  selector: 'app-findings-card',
  standalone: true,
  imports: [],
  templateUrl: './findings-card.component.html',
  styleUrl: './findings-card.component.scss',
})
export class FindingsCardComponent {
  @Input({ required: true })
  findings: Finding[] = [];

  getSeverityLabel(severity: string): string {
    const labels: Record<string, string> = {
      HIGH: 'Alta',
      MEDIUM: 'Media',
      LOW: 'Baja',
    };

    return labels[severity] ?? severity;
  }

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      SECURITY: 'Seguridad',
      RELIABILITY: 'Confiabilidad',
      PERFORMANCE: 'Rendimiento',
      MAINTAINABILITY: 'Mantenibilidad',
      TESTING: 'Testing',
      ARCHITECTURE: 'Arquitectura',
      DEPENDENCIES: 'Dependencias',
    };

    return labels[category] ?? category;
  }
}