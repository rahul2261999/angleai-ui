export interface BaseResponse<T = null> {
  message: string;
  statusCode: number,
  data: T
}