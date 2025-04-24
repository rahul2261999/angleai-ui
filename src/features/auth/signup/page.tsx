import React from "react";
import { SignupForm } from "./components/SignupForm";
import {
  SignupContainer,
  SignupCard,
  LogoContainer,
  SignupHeader,
  SignupTitle,
  SignupSubtitle,
  LoginLink,
} from "./styles";
import Link from "next/link";

export const Signup: React.FC = () => {
  return (
    <SignupContainer>
      <SignupCard>
        <LogoContainer>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M2 6H38V34H2V6Z" fill="var(--blue-9)" />
            <path d="M20 6H38V34H20V6Z" fill="var(--blue-11)" />
          </svg>
        </LogoContainer>
        <SignupHeader>
          <SignupTitle>Sign Up</SignupTitle>
          <SignupSubtitle>
            And lets get started with your free trial
          </SignupSubtitle>
        </SignupHeader>

        <SignupForm />

        <LoginLink>
          Already have an account? <Link href="/signin">Sign in</Link>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
};
