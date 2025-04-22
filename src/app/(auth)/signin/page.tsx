'use client';

import { FC } from 'react';
import Link from 'next/link';
import { SigninForm } from '@/features/auth/components/signin/SigninForm';
import {
  SigninContainer,
  SigninCard,
  SigninHeader,
  SigninTitle,
  SigninSubtitle,
  SignupLink,
  LogoContainer,
  WelcomeText
} from '@/features/auth/components/signin/styles';

const SigninPage: FC = () => {
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
          <SigninSubtitle>
            Please sign in to continue
          </SigninSubtitle>
        </SigninHeader>
        
        <SigninForm />

        <SignupLink>
          Don&apos;t have an account?{' '}
          <Link href="/signup">Sign up</Link>
        </SignupLink>
      </SigninCard>
    </SigninContainer>
  );
};

export default SigninPage; 