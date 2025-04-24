import styled from 'styled-components';

export const SignupContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: #ffffff;
`;

export const SignupCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const SignupHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const SignupTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--gray-12);
  margin-bottom: 0.5rem;
`;

export const SignupSubtitle = styled.p`
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
  padding: 0.5rem 1rem;
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

  &:hover {
    background-color: var(--blue-10);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LoginLink = styled.div`
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