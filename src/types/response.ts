export interface RagBaseResponse<T = null> {
  message: string;
  statuCode: number,
  data: T
}