export interface Error {
  code: number;
  message: string;
}

export interface Data {
  loading: boolean;
  error: Error | null;
}
