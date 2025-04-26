import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color-dark-primary);
`;

const StyledInput = styled.input`
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--gray-7);
  }
`;

const ErrorMessage = styled.span`
  color: var(--red-9);
  font-size: 0.75rem;
`;

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  id,
  ...props 
}) => {
  return (
    <InputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput id={id} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input; 