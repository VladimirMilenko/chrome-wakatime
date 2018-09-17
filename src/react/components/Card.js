import React from "react";
import { css } from "emotion";

const CardWrappperStyle = css`
  display: inline-block;
  width: 100%;
  background-color: rgb(255, 255, 255);
  color: rgb(9, 30, 66);
  box-sizing: border-box;
  text-align: left;
  z-index: 100;
  box-shadow: rgba(23, 43, 77, 0.2) 0px 1px 1px,
    rgba(23, 43, 77, 0.25) 0px 0px 0.5px 0px;
  background-size: contain;
  border-radius: 3px;
  overflow: hidden;
  background-repeat: no-repeat;
  transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1) 0s;
  background-position: center bottom;
`;

const CardStyle = css`
  padding: 16px 24px;
  margin-bottom: auto;
`;
const HeaderStyle = css`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: 500;
`;

export default ({ children, title }) => (
  <div className={CardWrappperStyle}>
    <div className={CardStyle}>
      {title && <div className={HeaderStyle}>{title}</div>}
      <div>{children}</div>
    </div>
  </div>
);
