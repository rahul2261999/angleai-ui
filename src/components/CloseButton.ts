import { X } from "lucide-react";
import styled from "styled-components";

const CloseButton = styled(X)`
  color: var(--text-color-light-primary);
  background-color: var(--bg-color-element-primary);

  border-radius: 50%;

  width: 30px;
  height: 30px;

  padding: 0.35rem;

  &:hover {
    cursor: pointer;
    background-color: var(--bg-color-element-hover-primary);
    color: var(--text-color-dark-primary);
  }
  &:active {
    background-color: var(--bg-color-element-active-primary);
    color: var(--text-color-light-primary);
  }
`;

export { CloseButton }