import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  EyeOpenIcon, 
  EyeNoneIcon, 
  EnvelopeClosedIcon, 
  LockClosedIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons';
import {
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  ForgotPassword,
  Divider,
  SocialButtons,
  SocialButton,
  InputIcon,
  PasswordToggleButton
} from '../styles';
import Link from 'next/link';
import userMock from '@/utils/mock/user.mock.json'
import { useRouter } from 'next/navigation';

const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SigninFormData = z.infer<typeof signinSchema>;

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });
  const router = useRouter()

  const onSubmit = async (data: SigninFormData) => {
    try {
      const user = userMock.find(user => user.email === data.email);

      if(user) {
        router.replace('/dashboard/analytics')
      }
    } catch (error) {
      console.error('Signin error:', error);
    }
  };

  return (
    <>
      <SocialButtons>
        <SocialButton type="button">
          <GitHubLogoIcon />
        </SocialButton>
        <SocialButton type="button">
          <TwitterLogoIcon />
        </SocialButton>
        <SocialButton type="button">
          <LinkedInLogoIcon />
        </SocialButton>
      </SocialButtons>

      <Divider>
        <span>or continue with</span>
      </Divider>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <div style={{ position: 'relative' }}>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            <InputIcon className="left">
              <EnvelopeClosedIcon width={16} height={16} />
            </InputIcon>
          </div>
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <div style={{ position: 'relative' }}>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
            />
            <InputIcon className="left">
              <LockClosedIcon width={16} height={16} />
            </InputIcon>
            <PasswordToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeNoneIcon width={16} height={16} />
              ) : (
                <EyeOpenIcon width={16} height={16} />
              )}
            </PasswordToggleButton>
          </div>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </FormGroup>

        <ForgotPassword>
          <Link href="/forgot-password">Forgot Password?</Link>
        </ForgotPassword>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin"
                viewBox="0 0 24 24"
                width={16}
                height={16}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </SubmitButton>
      </Form>
    </>
  );
} 