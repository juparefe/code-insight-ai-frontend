export type ArchitecturePattern =
  | 'MONOLITH'
  | 'MVC'
  | 'CLEAN_ARCHITECTURE'
  | 'HEXAGONAL'
  | 'MICROSERVICES'
  | 'N_LAYER';

export type Severity = 'HIGH' | 'MEDIUM' | 'LOW';

export type FindingCategory =
  | 'SECURITY'
  | 'RELIABILITY'
  | 'PERFORMANCE'
  | 'MAINTAINABILITY'
  | 'TESTING'
  | 'ARCHITECTURE'
  | 'DEPENDENCIES';

export interface ArchitectureAnalysis {
  pattern: ArchitecturePattern;
  confidence: number;
  evidence: string[];
}

export interface TechnologyAnalysis {
  name: string;
  role: string;
  evidence: string[];
}

export interface ComponentAnalysis {
  type: string;
  name: string;
  path: string;
  responsibility: string;
  evidence: string[];
}

export interface Finding {
  severity: Severity;
  category: FindingCategory;
  title: string;
  description: string;
  evidence: string[];
}

export interface Recommendation {
  priority: Severity;
  title: string;
  description: string;
  reason: string;
}

export interface RepositoryAnalysis {
  functionalDescription: string;
  architecture: ArchitectureAnalysis;
  technologies: TechnologyAnalysis[];
  components: ComponentAnalysis[];
  findings: Finding[];
  recommendations: Recommendation[];
}