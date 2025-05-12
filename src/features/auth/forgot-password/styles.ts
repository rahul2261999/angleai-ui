import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: #ffffff;
`;

export const ForgotPasswordCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  margin-bottom: 2rem;
`;

export const ForgotPasswordHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
`;

export const WelcomeText = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--gray-11);
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

export const ForgotPasswordSubtitle = styled.p`
  color: var(--gray-8);
  font-size: 0.875rem;
  letter-spacing: -0.01em;
`;

export const ForgotPasswordFormContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-11);
  letter-spacing: -0.01em;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0.5rem 2.5rem;
  border: 1px solid var(--gray-5);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--gray-12);
  background-color: var(--gray-2);
  transition: all 0.2s ease;
  letter-spacing: -0.01em;

  &:focus {
    outline: none;
    border-color: var(--blue-9);
    background-color: var(--contrast-primary);
  }

  &::placeholder {
    color: var(--gray-7);
  }

  /* Fix autofill styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: var(--gray-12) !important;
    -webkit-box-shadow: 0 0 0 30px var(--gray-2) inset !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* For Firefox */
  &:autofill {
    background-color: var(--gray-2) !important;
    color: var(--gray-12) !important;
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: var(--gray-9);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 40px;
  pointer-events: none;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--red-9);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  letter-spacing: -0.01em;
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: var(--blue-9);
  color: var(--contrast-primary);
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  letter-spacing: -0.01em;

  &:hover {
    background-color: var(--blue-10);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const SigninLink = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray-9);
  letter-spacing: -0.01em;

  a {
    color: var(--blue-9);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;