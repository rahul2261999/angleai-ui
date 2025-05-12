import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  EyeOpenIcon, 
  EyeClosedIcon, 
  EnvelopeClosedIcon, 
  LockClosedIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
  LinkedInLogoIcon
} from '@radix-ui/react-icons';
import { LoaderCircle } from 'lucide-react';
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
import { signinService } from '../../service/auth.service';
import { useToast } from '@/components/ui/toast';
import { BaseError } from '@/types/error';
import { useAuth } from '@/contexts/authContext';

const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SigninFormData = z.infer<typeof signinSchema>;
type UseFormRegister = ReturnType<typeof useForm<SigninFormData>>['register'];
type FormErrors = ReturnType<typeof useForm<SigninFormData>>['formState']['errors'];

const useSigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { signin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const input = passwordInputRef.current;
    if (!input) return;
    
    const start = input.selectionStart;
    const end = input.selectionEnd;
    
    const originalType = input.type;
    input.type = 'text';
    const value = input.value;
    input.type = originalType;
    
    setShowPassword(prev => !prev);
    
    requestAnimationFrame(() => {
      input.value = value;
      input.setSelectionRange(start, end);
      input.focus();
    });
  };

  const onSubmit = async (data: SigninFormData) => {
    try {
      const user = await signinService(data);

      if (user) {
        toast.success({
          title: `Status: ${user.statusCode}`,
          description: user.message,
        });

        signin(user.data.user, user.data.otpToken);
      }


    } catch (error) {
      const err = error as BaseError;
      
      toast.error({
        title: `Status: ${err.statusCode}`,
        description: err.message,
      });
    }
  };

  return {
    showPassword,
    passwordInputRef,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  };
};

const SocialLogin = () => (
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
  </>
);

const EmailInput = ({ register, errors }: { register: UseFormRegister; errors: FormErrors }) => (
  <FormGroup>
    <Label htmlFor="email">Email</Label>
    <div style={{ position: 'relative' }}>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        autoComplete="off"
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
);

const PasswordInput = ({ 
  register, 
  errors, 
  showPassword, 
  togglePasswordVisibility, 
  passwordInputRef 
}: { 
  register: UseFormRegister; 
  errors: FormErrors; 
  showPassword: boolean; 
  togglePasswordVisibility: (e: React.MouseEvent) => void; 
  passwordInputRef: React.RefObject<HTMLInputElement | null>;
}) => (
  <FormGroup>
    <Label htmlFor="password">Password</Label>
    <div style={{ position: 'relative' }}>
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        autoComplete="current-password"
        {...register('password')}
        ref={(e) => {
          const { ref } = register('password');
          if (typeof ref === 'function') {
            ref(e);
          }
          passwordInputRef.current = e;
        }}
      />
      <InputIcon className="left">
        <LockClosedIcon width={16} height={16} />
      </InputIcon>
      <PasswordToggleButton
        type="button"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOpenIcon width={16} height={16} />
        ) : (
          <EyeClosedIcon width={16} height={16} />
        )}
      </PasswordToggleButton>
    </div>
    {errors.password && (
      <ErrorMessage>{errors.password.message}</ErrorMessage>
    )}
  </FormGroup>
);

export function SigninForm() {
  const {
    showPassword,
    passwordInputRef,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  } = useSigninForm();

  return (
    <>
    {/* TODO: implement social login later */}
      {false && <SocialLogin />}
      
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <EmailInput register={register} errors={errors} />
        
        <PasswordInput
          register={register}
          errors={errors}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          passwordInputRef={passwordInputRef}
        />

        <ForgotPassword>
          <Link href="/forgot-password">Forgot Password?</Link>
        </ForgotPassword>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" size={16} />
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