import { Component, Input } from '@angular/core';

import { TechnologyAnalysis } from '../../models/repository-analysis.model';

@Component({
  selector: 'app-technologies-card',
  standalone: true,
  imports: [],
  templateUrl: './technologies-card.component.html',
  styleUrl: './technologies-card.component.scss',
})
export class TechnologiesCardComponent {
  @Input({ required: true })
  technologies: TechnologyAnalysis[] = [];
}