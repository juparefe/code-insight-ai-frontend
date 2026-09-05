import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-analysis-summary',
  standalone: true,
  styleUrl: './analysis-summary.component.scss',
  templateUrl: './analysis-summary.component.html',
})
export class AnalysisSummaryComponent {
  @Input({ required: true })
  functionalDescription!: string;
}
