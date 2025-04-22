import { Bell } from "lucide-react";
import { Avatar, HoverCard, Toast } from "radix-ui";
import styled from "styled-components";

const Root = styled.nav`
  position: sticky;
  top: 0;
  z-index: 20;

  padding: 0 1.75rem;

  width: 100%;
  height: 70px;
  background-color: var(--bg-color-primary);
  box-shadow: var(--shadow-sm-primary);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  box-sizing: border-box;

  gap: 0.75rem;
`;

const Notificaion = styled.div`
  display: flex;
`;

const Navbar = () => {
  return (
    <Root>
      <Toast.Provider>
        <Toast.Root duration={3000}>
          <Toast.Description>Saved!</Toast.Description>
        </Toast.Root>
      </Toast.Provider>

      <HoverCard.Root>
        <HoverCard.Trigger asChild>
          <Bell />
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content>
            <ul>
              <li>aaaa</li>
              <li>bbbb</li>
            </ul>
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
      <Avatar.Root>
        <Avatar.Fallback>RS</Avatar.Fallback>
      </Avatar.Root>
    </Root>
  );
};

export default Navbar;
