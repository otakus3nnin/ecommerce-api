export class ApiError extends Error {
  code: number;
  details: Record<string, unknown>;
  constructor({
    code,
    message,
    details = {},
  }: {
    code: number;
    message: string;
    details?: Record<string, unknown>;
  }) {
    super(message);
    this.code = code;
    this.details = details;
  }
}
