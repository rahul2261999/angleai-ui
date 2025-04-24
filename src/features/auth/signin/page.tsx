import React from "react";
import { SigninForm } from "./components/SigninForm";
import {
  SigninContainer,
  SigninCard,
  LogoContainer,
  SigninHeader,
  WelcomeText,
  SigninTitle,
  SigninSubtitle,
  SignupLink,
} from "./styles";
import Link from "next/link";

export const SignIn: React.FC = () => {
  return (
    <SigninContainer>
      <SigninCard>
        <LogoContainer>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M2 6H38V34H2V6Z" fill="var(--blue-9)" />
            <path d="M20 6H38V34H20V6Z" fill="var(--blue-11)" />
          </svg>
        </LogoContainer>
        <SigninHeader>
          <WelcomeText>Welcome back!</WelcomeText>
          <SigninTitle>Sign In</SigninTitle>
          <SigninSubtitle>Please sign in to continue</SigninSubtitle>
        </SigninHeader>

        <SigninForm />

        <SignupLink>
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </SignupLink>
      </SigninCard>
    </SigninContainer>
  );
};
