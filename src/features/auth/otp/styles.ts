import styled from 'styled-components';

export const OTPContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: #ffffff;
`;

export const OTPContent = styled.div`
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

export const OTPHeader = styled.div`
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

export const OTPSubtitle = styled.p`
  color: var(--gray-8);
  font-size: 0.875rem;
  letter-spacing: -0.01em;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const OTPInputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
`;

export const OTPInput = styled.input<{ $hasError?: boolean }>`
  width: 48px;
  height: 48px;
  border: 1px solid ${props => props.$hasError ? 'var(--red-9)' : 'var(--gray-5)'};
  border-radius: 8px;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  background-color: var(--gray-2);
  color: var(--gray-12);
  transition: all 0.2s ease;
  letter-spacing: -0.01em;

  &:focus {
    outline: none;
    border-color: var(--blue-9);
    background-color: var(--contrast-primary);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.125rem;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--red-9);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  text-align: center;
  letter-spacing: -0.01em;
`;

export const SubmitButton = styled.button`
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

export const EmailText = styled.p`
  color: var(--gray-9);
  text-align: center;
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  margin: 0;
`;

export const ResendText = styled.p`
  color: var(--gray-9);
  text-align: center;
  font-size: 0.875rem;
  letter-spacing: -0.01em;
  margin: 0;

  button {
    color: var(--blue-9);
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`; 