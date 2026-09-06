import { RepositoryAnalysis } from "./repository-analysis.model";

export type AnalysisJobStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export interface AnalysisJob {
  id: string;
  status: AnalysisJobStatus;
  createdAt: string;
  updatedAt: string;
  result?: RepositoryAnalysis;
  error?: {
    code: string;
    message: string;
  };
}

export interface AnalysisJobAccepted {
  jobId: string;
  status: 'PENDING' | 'PROCESSING';
}