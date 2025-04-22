'use client';

import Link from 'next/link';
import { SignupForm } from '@/features/auth/components/signup/SignupForm';
import {
  SignupContainer,
  SignupCard,
  SignupHeader,
  SignupTitle,
  SignupSubtitle,
  LoginLink,
  LogoContainer
} from '@/features/auth/components/signup/styles';

export default function SignupPage() {
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
          Already have an account?{' '}
          <Link href="/signin">Sign in</Link>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
} 