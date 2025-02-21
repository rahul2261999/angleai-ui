import React from "react";
import styled from "styled-components";

interface IButtonStyle {
  width?: string;
  height?: string;

  disabled?: boolean;

  color?: string;

  backgroundColor?: string;
  backgroundColorHover?: string;
  backgroundColorActive?: string;

  icon?: React.ReactNode;
}

export interface IButton extends IButtonStyle {
  children?: React.ReactNode;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Root = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["width", "height", "backgroundColor", "backgroundColorHover", "backgroundColorActive", "color"].includes(prop),
})<IButtonStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border: 0;
  border-radius: var(--border-radius);
  text-align: center;
  font-weight: 600;
  box-sizing: border-box;
  cursor: pointer;

  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "40px"};
  background-color: ${(props) => props.backgroundColor || "var(--bg-color-solid-secondary)"};
  color: ${(props) => props.color || "var(--contrast-primary)"};

  &:hover {
    background-color: ${(props) => props.backgroundColorHover || "var(--bg-color-solid-hover-secondary)"};
  }

  &:active {
    background-color: ${(props) => props.backgroundColorActive || props.backgroundColorHover || "var(--bg-color-solid-hover-secondary)"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button: React.FC<IButton> = (props: IButton) => {
  return (
    <Root
      width={props.width}
      height={props.height}
      disabled={props.disabled}
      color={props.color}
      backgroundColor={props.backgroundColor}
      backgroundColorHover={props.backgroundColorHover}
      backgroundColorActive={props.backgroundColorActive}
      onClick={props.onClick}
    >
      {props.icon}
      {props.text}
    </Root>
  );
};

export default Button;
