'use client';

import { useSignupForm } from '@/features/auth/hooks/useSignupForm';
import {
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton
} from './styles';

export const SignupForm = () => {
  const { form, onSubmit } = useSignupForm();
  const { register, formState: { errors, isSubmitting } } = form;

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="fullName">User name</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="User Name"
          {...register('fullName')}
        />
        {errors.fullName && (
          <ErrorMessage>{errors.fullName.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        )}
      </FormGroup>

      <SubmitButton type="submit" disabled={isSubmitting}>
        Sign Up
      </SubmitButton>
    </Form>
  );
}; 