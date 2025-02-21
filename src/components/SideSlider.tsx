import styled from "styled-components";
import { CloseButton } from "./CloseButton";
import React from "react";
import Button from "./button";
import { AnimatePresence, motion } from "framer-motion";

const Root = styled(motion.div)`
  min-width: 340px;
  max-width: 350px;

  height: 100vh;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;

  background-color: var(--contrast-primary);
  box-shadow: var(--shadow-sm-primary);

  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  transition: width ease-in 2s;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  height: 100%;

  z-index: 99;
`;

const Header = styled.div`
  width: 100%;

  flex-shrink: 0;

  & svg {
    float: right;
  }
`;

const Content = styled.div`
  width: 100%;

  flex: 1 1 auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  overflow: hidden auto;
`;

const sidebarVariants = {
  hidden: { x: "100%" },

  visible: {
    x: "0%",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

interface ISideSlider {
  open: boolean;
  onOpenChange: () => void;
  children?: React.ReactNode;
}

const SideSlider: React.FC<ISideSlider> = (props) => {
  return (
    <AnimatePresence>
      {props.open && (
        <div>
          <Overlay onClick={props.onOpenChange} />
          <Root
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Header>
              <CloseButton onClick={props.onOpenChange} />
            </Header>
            <Content>{props.children}</Content>
          </Root>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SideSlider;
