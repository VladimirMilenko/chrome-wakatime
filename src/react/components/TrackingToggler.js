import React from "react";
import { ToggleStateless as Toggle } from "@atlaskit/toggle";
import { css } from "emotion";
import Card from "./Card";

export default ({ onTrackingStateChange, value }) => (
  <Card>
    <div
      className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <h4>Enable logging</h4>
      <Toggle isChecked={value} size="large" onChange={onTrackingStateChange} />
    </div>
  </Card>
);
