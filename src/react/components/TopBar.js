import React from "react";
import { css } from "emotion";

const topBarStyle = css`
  width: 100%;
  color: #fff;
  background-color: rgb(7, 71, 166);
  padding: 0.75rem;
`;

export default ({ children }) => <div className={topBarStyle}>{children}</div>;
