import { Component, Input } from '@angular/core';

import { ArchitectureAnalysis } from '../../models/repository-analysis.model';

@Component({
  selector: 'app-architecture-card',
  standalone: true,
  imports: [],
  templateUrl: './architecture-card.component.html',
  styleUrl: './architecture-card.component.scss',
})
export class ArchitectureCardComponent {
  @Input({ required: true })
  architecture!: ArchitectureAnalysis;

  get confidencePercentage(): number {
    return Math.round(this.architecture.confidence * 100);
  }

  get architectureLabel(): string {
    const labels: Record<string, string> = {
      MONOLITH: 'Monolito',
      MVC: 'MVC',
      CLEAN_ARCHITECTURE: 'Clean Architecture',
      HEXAGONAL: 'Arquitectura Hexagonal',
      MICROSERVICES: 'Microservicios',
      N_LAYER: 'Arquitectura en capas',
    };

    return labels[this.architecture.pattern] ?? this.architecture.pattern;
  }
}