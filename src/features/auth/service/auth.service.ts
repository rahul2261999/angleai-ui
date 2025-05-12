import { errorHandler } from "@/utils/helper";
import { SignInRequest, SignInResponse, SignupRequest, VerifyOTPRequest } from "../auth.type.";
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

export const resendOTPService = async (token: string) => {
  try {
    const res = await axiosMain.post<BaseResponse<{ token: string }>>(`/v1/authentication/otp/resend`, undefined, {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
}

export const verifyOTPService = async (data: VerifyOTPRequest) => {
  try {
    const res = await axiosMain.post<BaseResponse<{ token: string }>>(`/v1/authentication/verify`, data.body, {
      headers: {
        Authorization: data.headers.otpToken,
        'Content-Type': undefined
      },
    });

    return res.data;
  } catch (error) {
    throw errorHandler(error);
  }
}
