import { Component, Input } from '@angular/core';

import { ComponentAnalysis } from '../../models/repository-analysis.model';

@Component({
  selector: 'app-components-card',
  standalone: true,
  imports: [],
  templateUrl: './components-card.component.html',
  styleUrl: './components-card.component.scss',
})
export class ComponentsCardComponent {
  @Input({ required: true })
  components: ComponentAnalysis[] = [];

  getComponentTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      ENTRY_POINT: 'Entry Point',
      APPLICATION: 'Aplicación',
      ROUTE: 'Ruta',
      MIDDLEWARE: 'Middleware',
      DATABASE_CONNECTION: 'Conexión de base de datos',
      VALIDATION_SCHEMA: 'Esquema de validación',
      SERVICE: 'Servicio',
      REPOSITORY: 'Repositorio',
      CONTROLLER: 'Controlador',
    };

    return labels[type] ?? type;
  }
}