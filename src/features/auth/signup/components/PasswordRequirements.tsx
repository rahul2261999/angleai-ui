import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import styled from "styled-components";

interface PasswordRequirementProps {
  isMet: boolean;
}

const RequirementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RequirementItem = styled.li<PasswordRequirementProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.isMet ? 'var(--green-9)' : 'var(--gray-8)'};
  transition: color 0.2s ease;
`;

interface PasswordRequirementsProps {
  password: string;
  isVisible: boolean;
}

export const PasswordRequirements = ({ password, isVisible }: PasswordRequirementsProps) => {
  if (!isVisible) return null;

  const requirements = [
    {
      text: "At least 6 characters",
      isMet: password.length >= 6
    },
    {
      text: "Maximum 15 characters",
      isMet: password.length <= 15 && password.length > 0
    },
    {
      text: "At least one lowercase letter",
      isMet: /[a-z]/.test(password)
    },
    {
      text: "At least one uppercase letter",
      isMet: /[A-Z]/.test(password)
    },
    {
      text: "At least one number",
      isMet: /[0-9]/.test(password)
    },
    {
      text: "At least one special character",
      isMet: /[^a-zA-Z0-9]/.test(password)
    }
  ];

  return (
    <RequirementsList>
      {requirements.map((requirement, index) => (
        <RequirementItem key={index} isMet={requirement.isMet}>
          {requirement.isMet ? (
            <CheckIcon color="var(--green-9)" />
          ) : (
            <Cross1Icon color="var(--gray-8)" />
          )}
          {requirement.text}
        </RequirementItem>
      ))}
    </RequirementsList>
  );
}; 