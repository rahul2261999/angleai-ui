"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import {
  FormContainer,
  OTPInputContainer,
  OTPInput,
  ErrorMessage,
  SubmitButton,
  EmailText,
  ResendText,
} from '../styles';
import { resendOTPService, verifyOTPService } from '../../service/auth.service';
import { useToast } from '@/components/ui/toast';
import { BaseError } from '@/types/error';

export const OTPForm: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { user, otpToken, authenticate, resendOTP, resendTimer, updateResendTimer } = useAuth();
  const toast = useToast();

  // Format timer to show minutes and seconds
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get email from auth context
  const email = user?.email || '';

  useEffect(() => {
    // Initialize refs
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        updateResendTimer(resendTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer, updateResendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Only proceed if the pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      setError('');
      
      // Focus the last input after pasting
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    if (!otpToken) {
      toast.error({
        title: 'Error resending OTP',
        description: 'OTP token is not available',
      });

      return;
    }

    setResendDisabled(true);
    
    try {
      const res = await resendOTPService(otpToken);
      resendOTP(res.data.token);
      toast.success({
        title: 'OTP resent successfully',
        description: 'A new OTP has been sent to your email',
      });

    } catch (error) {
      const err = error as BaseError;
      toast.error({
        title: 'Error resending OTP',
        description: err.message,
      });
      setResendDisabled(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    try {
      if (!otpToken) {
        toast.error({
          title: 'Error verifying OTP',
          description: 'OTP token is not available',
        });

        router.replace('/signin');

        return;
      }

      const res = await verifyOTPService({
        body: { otp },
        headers: { otpToken },
      });

      authenticate(res.data.token);

      toast.success({
        title: 'OTP verified successfully',
        description: 'You can now access your account',
      });
    } catch (error) {
      const err = error as BaseError;

      toast.error({
        title: 'Error verifying OTP',
        description: err.message,
      }); 
    } 
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.some(digit => !digit)) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }

    setIsSubmitting(true);
    const otpString = otp.join('');
    
    try {
      await handleVerifyOTP(otpString);
    } catch (error) {
      const err = error as BaseError;

      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <EmailText>
        One-time passcode has been sent to: <strong>{email}</strong>
      </EmailText>
      
      <OTPInputContainer>
        {otp.map((digit, index) => (
          <OTPInput
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={handlePaste}
            $hasError={!!error}
            disabled={isSubmitting}
          />
        ))}
      </OTPInputContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
      </SubmitButton>

      <ResendText>
        Didn&apos;t receive the code?{' '}
        <button 
          type="button" 
          onClick={handleResendOTP}
          disabled={resendDisabled}
        >
          {resendDisabled ? `Resend in ${formatTimer(resendTimer)}` : 'Resend OTP'}
        </button>
      </ResendText>
    </FormContainer>
  );
}; 