export interface ScriptConfig {
  developerName: string;
  developerEmail: string;
  targetData: string; // e.g., "Apple 10-K filings", "Tesla Company Facts"
}

export interface GeneratedScript {
  code: string;
  explanation: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}