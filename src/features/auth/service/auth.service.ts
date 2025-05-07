import { errorHandler } from "@/utils/helper";
import { SignInRequest, SignInResponse, SignupRequest } from "../auth.type.";
import { axiosMain } from "@/lib/axiosMain";
import { BaseResponse } from "@/types/response";

export const signupService = async (data: SignupRequest) => {
  try {
    const res = await axiosMain.post<BaseResponse<null>>(`/v1/authentication/signup`, data);

    return res.data;
  } catch (error) {

    throw errorHandler(error);
  }
};

export const signinService = async (data: SignInRequest) => {
  try {
    const res = await axiosMain.post<BaseResponse<SignInResponse>>(`/v1/authentication/signin`, data);

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
}
