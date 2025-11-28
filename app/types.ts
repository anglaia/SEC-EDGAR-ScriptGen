export interface ScriptConfig {
  developerName: string;
  developerEmail: string;
  targetData: string;
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

