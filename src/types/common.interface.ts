export interface ErrorInterface {
  [key: string]: string | null;
}

export interface CommonInitialInterface {
  errors: ErrorInterface;
}
