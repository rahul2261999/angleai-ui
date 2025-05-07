import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, signupSchema } from '@/features/auth/signup/schemas/signup.schema';
import { signupService } from '../../service/auth.service';
import { BaseError } from '@/types/error';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast/useToast';

export const useSignupForm = () => {
  const router = useRouter();
  const toast = useToast();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await signupService(data);

      toast.success({
        title: `Status: ${res.statuCode}`,
        description: res.message,
      });
      console.log('Form data:', data);

      form.reset();
      router.push("/signin");
    } catch (error) {
      const err = error as BaseError;

      toast.error({
        title: `Error (${err.statusCode})`,
        description: err.message,
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit)
  };
}; 