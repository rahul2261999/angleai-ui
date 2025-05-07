'use client';

import { useState, useEffect } from 'react';
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useSignupForm } from '@/features/auth/signup/hooks/useSignupForm';
import { PasswordRequirements } from './PasswordRequirements';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignupFormData } from '../schemas/signup.schema';
import {
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  PasswordInputWrapper,
  VisibilityToggle
} from '../styles';

// Types
interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<SignupFormData>;
  error?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
  onFocus: () => void;
  onBlur: () => void;
  watchValue: string;
  showRequirements?: boolean;
}

interface EmailFieldProps {
  register: UseFormRegister<SignupFormData>;
  error?: string;
}

// Components
const PasswordField = ({
  id,
  label,
  placeholder,
  register,
  error,
  showPassword,
  onToggleVisibility,
  onFocus,
  onBlur,
  watchValue,
  showRequirements = false
}: PasswordFieldProps) => (
  <FormGroup>
    <Label htmlFor={id}>{label}</Label>
    <PasswordInputWrapper>
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="new-password"
        {...register(id as keyof SignupFormData)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <VisibilityToggle
        type="button"
        onClick={onToggleVisibility}
      >
        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </VisibilityToggle>
    </PasswordInputWrapper>
    {showRequirements && (
      <PasswordRequirements 
        password={watchValue} 
        isVisible={showRequirements}
      />
    )}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormGroup>
);

const EmailField = ({ register, error }: EmailFieldProps) => (
  <FormGroup>
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      placeholder="Email"
      autoComplete="off"
      {...register('email')}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormGroup>
);

// Custom hooks
const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return {
    showPassword,
    showConfirmPassword,
    togglePassword: () => setShowPassword(prev => !prev),
    toggleConfirmPassword: () => setShowConfirmPassword(prev => !prev)
  };
};

const usePasswordFocus = (errors: FieldErrors<SignupFormData>) => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  useEffect(() => {
    const checkAutoFill = () => {
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      const isFilled = passwordInput?.matches(':-webkit-autofill') ?? false;
      setIsAutoFilled(isFilled);
      if (isFilled) {
        setIsPasswordFocused(true);
      }
    };

    checkAutoFill();
    const timeoutId = setTimeout(checkAutoFill, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleFocus = () => setIsPasswordFocused(true);
  const handleBlur = () => {
    if (!errors.password) {
      setIsPasswordFocused(false);
    }
  };

  return {
    isPasswordFocused,
    hasAttemptedSubmit,
    isAutoFilled,
    setHasAttemptedSubmit,
    handleFocus,
    handleBlur
  };
};

// Main Component
export const SignupForm = () => {
  const { form, onSubmit } = useSignupForm();
  const { register, formState: { errors, isSubmitting }, watch } = form;
  const password = watch('password', '');
  
  const {
    showPassword,
    showConfirmPassword,
    togglePassword,
    toggleConfirmPassword
  } = usePasswordVisibility();

  const {
    isPasswordFocused,
    hasAttemptedSubmit,
    isAutoFilled,
    setHasAttemptedSubmit,
    handleFocus,
    handleBlur
  } = usePasswordFocus(errors);

  const shouldShowRequirements = 
    isPasswordFocused || 
    (hasAttemptedSubmit && Boolean(errors.password)) ||
    (password.length > 0 && isAutoFilled);

  const handleSubmit = async (e: React.FormEvent) => {
    setHasAttemptedSubmit(true);
    await onSubmit(e);
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <EmailField 
        register={register} 
        error={errors.email?.message} 
      />

      <PasswordField
        id="password"
        label="Password"
        placeholder="Password"
        register={register}
        error={errors.password?.message}
        showPassword={showPassword}
        onToggleVisibility={togglePassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        watchValue={password}
        showRequirements={shouldShowRequirements}
      />

      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
        register={register}
        error={errors.confirmPassword?.message}
        showPassword={showConfirmPassword}
        onToggleVisibility={toggleConfirmPassword}
        onFocus={() => {}}
        onBlur={() => {}}
        watchValue={password}
      />

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing up...' : 'Sign Up'}
      </SubmitButton>
    </Form>
  );
}; 