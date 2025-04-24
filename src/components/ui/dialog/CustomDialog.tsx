"use client";

import React from "react";
import Button, { IButton } from "../button/button";
import styled from "styled-components";
import { CloseButton } from "../button/CloseButton";

interface ICustomDialog {
  title: string;
  open: boolean;
  buttons: IButton[];
  children?: React.ReactNode;

  close: () => void;
}

const Root = styled.div<{ open: boolean }>`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: visibility 0.2s ease;
`;

const DialogOverlay = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color-solid-primary);
  opacity: ${props => props.$open ? 0.2 : 0};
  transition: opacity 0.2s ease;
`;

const DialogContainer = styled.div<{ $open: boolean }>`
  position: relative;
  width: 500px;
  padding: 1.5rem;
  background-color: var(--contrast-primary);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: var(--shadow-lg-primary);
  
  opacity: ${props => props.$open ? 1 : 0};
  transform: scale(${props => props.$open ? 1 : 0.95});
  transition: all 0.2s ease;
`;

const DialogHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DialogTitle = styled.h2`
  font-size: 24px;
  color: var(--text-color-dark-primary);
  font-weight: 600;
`;

const DialogBody = styled.div`
  margin: 0.75rem 0;
  width: 100%;
`;

const DialogFooter = styled.div`
  width: 100%;
  padding: 0.75rem;

  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const CustomDialog: React.FC<ICustomDialog> = (props) => {
  const actionButton = props.buttons.map((btn, index) => {
    // For cancel/close buttons, ensure hover color stays gray
    if (btn.text.toLowerCase() === "cancel") {
      return (
        <Button
          key={index}
          {...btn}
          backgroundColorHover="var(--gray-6)"
          backgroundColorActive="var(--gray-7)"
        />
      );
    }
    return <Button key={index} {...btn} />;
  });

  return (
    <Root open={props.open}>
      <DialogOverlay $open={props.open} />
      <DialogContainer $open={props.open}>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <CloseButton onClick={props.close} />
        </DialogHeader>
        <DialogBody>{props.children}</DialogBody>
        <DialogFooter>{actionButton}</DialogFooter>
      </DialogContainer>
    </Root>
  );
};

export default CustomDialog;
