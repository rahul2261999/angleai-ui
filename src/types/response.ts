export interface BaseResponse<T = null> {
  message: string;
  statuCode: number,
  data: T
}