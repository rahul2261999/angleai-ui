import React from "react";
import { SeparatorRoot } from "./style";

export const Seprator: React.FC = () => {
  return (
    <SeparatorRoot
      className="SeparatorRoot"
      decorative
      orientation="vertical"
      style={{ margin: "0 15px" }}
    />
  );
};
