import { Separator } from "radix-ui";
import styled from "styled-components";

export const SeparatorRoot = styled(Separator.Root)<{ orientation: "horizontal" | "vertical" }>`
  background-color: var(--border-color-subtle-primary);
  margin: 5px 0;

  ${({ orientation }) =>
    orientation === "horizontal"
      ? `
        height: 1px;
      `
      : `
        height: 100%;
        width: 1px;
      `}
`;