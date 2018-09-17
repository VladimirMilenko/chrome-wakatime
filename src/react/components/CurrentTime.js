import React from "react";
import { css } from "emotion";
import Card from "./Card";
import Button from "@atlaskit/button";

const CardTitle = () => (
  <React.Fragment>
    <div className={css(`width:100%; text-align: center`)}>
      Time tracked today
    </div>
  </React.Fragment>
);

export default ({ time }) => (
  <Card title={<CardTitle />}>
    <div
      className={css`
        padding: 10px;
        text-align: center;
      `}
    >
      <h2>{time}</h2>
      <div
        className={css`
          margin-top: 10px;
          margin-bottom: -15px;
        `}
      >
        <Button
          appearance="link"
          target="_blank"
          href="https://wakatime.com/dashboard"
        >
          View WakaTime dashboard
        </Button>
      </div>
    </div>
  </Card>
);
