export type RepositorySourceType = 'GITHUB' | 'ZIP';

export interface RepositorySource {
  type: RepositorySourceType;
  url: string;
}

export interface AnalyzeRepositoryRequest {
  source: RepositorySource;
}