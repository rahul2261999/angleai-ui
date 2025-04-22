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
  z-index: 21;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogOverlay = styled.div`
  position: absolute;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: var(--bg-color-solid-primary);
  opacity: 0.2;
`;

const DialogContainer = styled.div`
  position: absolute;

  width: 500px;
  padding: 1.5rem;

  background-color: var(--contrast-primary);
  border-radius: var(--border-radius);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  box-shadow: var(--shadow-lg-primary);
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
  const actionButton = props.buttons.map((btn, index) => (
    <Button key={index} {...btn} />
  ));
  return (
    <Root open={props.open}>
      <DialogOverlay />
      <DialogContainer>
        <DialogHeader>
          <DialogTitle>Header Title</DialogTitle>
          <CloseButton onClick={props.close} />
        </DialogHeader>
        <DialogBody>{props.children}</DialogBody>
        <DialogFooter>{actionButton}</DialogFooter>
      </DialogContainer>
    </Root>
  );
};

export default CustomDialog;
