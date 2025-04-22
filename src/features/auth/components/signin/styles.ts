import styled from 'styled-components';

export const SigninContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: var(--gray-2);
`;

export const SigninCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  background: var(--contrast-primary);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  margin-bottom: 2rem;
`;

export const SigninHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
`;

export const WelcomeText = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--gray-11);
  margin-bottom: 0.5rem;
`;

export const SigninTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--gray-12);
  margin-bottom: 0.75rem;
`;

export const SigninSubtitle = styled.p`
  color: var(--gray-8);
  font-size: 0.875rem;
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

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-11);
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

  &:focus {
    outline: none;
    border-color: var(--blue-9);
    background-color: var(--contrast-primary);
  }

  &::placeholder {
    color: var(--gray-7);
  }

  &[type="password"] {
    padding-right: 2.5rem;
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-9);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  pointer-events: none;

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--gray-9);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--gray-11);
  }
`;

export const ErrorMessage = styled.span`
  color: var(--red-9);
  font-size: 0.75rem;
  margin-top: 0.25rem;
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

  &:hover {
    background-color: var(--blue-10);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ForgotPassword = styled.div`
  text-align: right;
  width: 100%;
  margin-top: -0.5rem;
  
  a {
    color: var(--blue-9);
    font-size: 0.875rem;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  gap: 1rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--gray-5);
  }

  span {
    color: var(--gray-8);
    font-size: 0.875rem;
  }
`;

export const SocialButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const SocialButton = styled.button`
  flex: 1;
  height: 40px;
  background-color: var(--gray-2);
  border: 1px solid var(--gray-5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--gray-11);

  &:hover {
    background-color: var(--gray-3);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--gray-8);

  a {
    color: var(--blue-9);
    font-weight: 500;
    text-decoration: none;
    margin-left: 0.25rem;

    &:hover {
      text-decoration: underline;
    }
  }
`; 