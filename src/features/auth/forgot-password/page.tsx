import React from "react";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import {
  ForgotPasswordContainer,
  ForgotPasswordCard,
  LogoContainer,
  ForgotPasswordHeader,
  WelcomeText,
  ForgotPasswordSubtitle,
  SigninLink,
} from "./styles";
import Link from "next/link";

export const ForgotPassword: React.FC = () => {
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
          <WelcomeText>Forgot Password?</WelcomeText>
          <ForgotPasswordSubtitle>Enter your email to reset your password</ForgotPasswordSubtitle>
        </ForgotPasswordHeader>

        <ForgotPasswordForm />

        <SigninLink>
          Remember your password? <Link href="/signin">Sign in</Link>
        </SigninLink>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
}; 