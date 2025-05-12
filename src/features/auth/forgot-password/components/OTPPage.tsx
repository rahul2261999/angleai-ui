import React from "react";
import { OTPForm } from "./OTPForm";
import {
  ForgotPasswordContainer,
  ForgotPasswordCard,
  LogoContainer,
  ForgotPasswordHeader,
  WelcomeText,
  ForgotPasswordSubtitle,
  SigninLink,
} from "../styles";
import Link from "next/link";

export const OTPPage: React.FC = () => {
  return (
    <ForgotPasswordContainer>
      <ForgotPasswordCard>
        <LogoContainer>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M2 6H38V34H2V6Z" fill="var(--blue-9)" />
            <path d="M20 6H38V34H20V6Z" fill="var(--blue-11)" />
          </svg>
        </LogoContainer>
        <ForgotPasswordHeader>
          <WelcomeText>Enter Verification Code</WelcomeText>
          <ForgotPasswordSubtitle>Please enter the 6-digit code sent to your email</ForgotPasswordSubtitle>
        </ForgotPasswordHeader>

        <OTPForm />

        <SigninLink>
          Remember your password? <Link href="/signin">Sign in</Link>
        </SigninLink>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
}; 