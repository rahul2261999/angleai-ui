import { OTPForm } from "./components/OTPForm";
import {
  OTPContainer,
  OTPContent,
  LogoContainer,
  OTPHeader,
  WelcomeText,
  OTPSubtitle,
} from "./styles";

export const Otp: React.FC = () => {
  return (
    <OTPContainer>
      <OTPContent>
        <LogoContainer>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M2 6H38V34H2V6Z" fill="var(--blue-9)" />
            <path d="M20 6H38V34H20V6Z" fill="var(--blue-11)" />
          </svg>
        </LogoContainer>
        <OTPHeader>
          <WelcomeText>Enter Verification Code</WelcomeText>
          <OTPSubtitle>Please enter the 6-digit code sent to your email</OTPSubtitle>
        </OTPHeader>

        <OTPForm />
      </OTPContent>
    </OTPContainer>
  );
}; 