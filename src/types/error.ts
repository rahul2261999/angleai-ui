export interface RagBaseError {
  tracingId: string,
  statusCode: number,
  message: string,
  error: [],
  timestamp: string,
  path: string
}