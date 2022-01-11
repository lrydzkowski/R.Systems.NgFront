export interface ErrorInfo {
  errorKey: string;
  elementKey: string | null;
  data: {[key: string]: string};
}
