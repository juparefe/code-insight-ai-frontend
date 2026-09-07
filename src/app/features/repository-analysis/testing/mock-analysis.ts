import { AnalysisJob } from '../models/analysis-job.model';
import { RepositoryAnalysis } from '../models/repository-analysis.model';

/**
 * Datos de ejemplo reutilizables por los tests de la feature. Cada helper
 * devuelve una copia nueva para que un test no pueda mutar el estado de otro.
 */
export function createMockAnalysis(
  overrides: Partial<RepositoryAnalysis> = {},
): RepositoryAnalysis {
  return {
    functionalDescription: 'API REST para gestionar tareas de usuarios.',
    architecture: {
      pattern: 'CLEAN_ARCHITECTURE',
      confidence: 0.8123,
      evidence: ['Carpeta domain/ separada de infrastructure/'],
    },
    technologies: [
      {
        name: 'NestJS',
        role: 'Framework backend',
        evidence: ['nest-cli.json', '@nestjs/core en package.json'],
      },
      {
        name: 'PostgreSQL',
        role: 'Base de datos',
        evidence: [],
      },
    ],
    components: [
      {
        type: 'CONTROLLER',
        name: 'TasksController',
        path: 'src/tasks/tasks.controller.ts',
        responsibility: 'Expone los endpoints HTTP de tareas.',
        evidence: ['@Controller("tasks")'],
      },
      {
        type: 'WIDGET',
        name: 'UnknownThing',
        path: 'src/unknown.ts',
        responsibility: 'Tipo no mapeado.',
        evidence: [],
      },
    ],
    findings: [
      {
        severity: 'HIGH',
        category: 'SECURITY',
        title: 'Credenciales en el repositorio',
        description: 'El archivo .env está versionado.',
        evidence: ['.env en git'],
      },
      {
        severity: 'LOW',
        category: 'TESTING',
        title: 'Cobertura baja',
        description: 'Pocos tests unitarios.',
        evidence: [],
      },
    ],
    recommendations: [
      {
        priority: 'HIGH',
        title: 'Remover secretos versionados',
        description: 'Sacar .env del control de versiones.',
        reason: 'Evita filtrar credenciales.',
      },
    ],
    ...overrides,
  };
}

export function createMockJob(overrides: Partial<AnalysisJob> = {}): AnalysisJob {
  return {
    id: 'job-123',
    status: 'COMPLETED',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:05:00.000Z',
    result: createMockAnalysis(),
    ...overrides,
  };
}
