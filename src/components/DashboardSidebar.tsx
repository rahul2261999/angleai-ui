import Link from "next/link";

import {
  CircleHelpIcon,
  FoldersIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";
import styled from "styled-components";

const Root = styled.div`
  width: 300px;
  height: 100vh;
  background-color: var(--bg-color-primary);

  position: static;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1 1 auto;
  flex-shrink: 0;

  overflow: hidden;

  border-right: 1px solid var(--border-color-primary);
`;

const Header = styled.div`
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1 0 auto;

  font-size: 24px;
  font-weight: 600;
  color: var(--text-color-light-primary);

  padding: 0 1.75rem;
`;
const Menu = styled.div`
  height: 100%;
  padding: 0 1rem;
  overflow-y: auto;

  scrollbar-width: none;
  &:hover {
    scrollbar-width: auto;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--track-primary);
    border-radius: 10px;
    transition: background 0.3s ease-in-out;
  }
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: auto;
`;

const ListItem = styled.li`
  height: 48px;

  display: flex;
  align-items: center;

  padding: 0 0.75rem;
  cursor: pointer;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 600;

  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;

    text-decoration: none;
  }

  &:hover {
    background-color: var(--bg-color-element-hover-primary);
    color: var(--text-color-dark-primary);
  }
`;

const DashboardSideBar = () => {
  return (
    <Root>
      <Header>ANGLE AI</Header>
      <Menu>
        <List>
          <ListItem>
            <Link href="/">
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="/dashboard/buckets">
              <FoldersIcon />
              <span>Bucket Manager</span>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="">
              <CircleHelpIcon />
              <span>Help</span>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="">
              <LogOutIcon />
              <span>Logout</span>
            </Link>
          </ListItem>
        </List>
      </Menu>
    </Root>
  );
};

export default DashboardSideBar;
