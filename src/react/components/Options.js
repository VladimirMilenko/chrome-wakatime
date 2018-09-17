import React from "react";
import { css } from "emotion";
import Card from "./Card";
import Banner from "@atlaskit/banner";
import Button from "@atlaskit/button";
import { FieldTextAreaStateless } from "@atlaskit/field-text-area";

const CardTitle = () => (
  <React.Fragment>
    <div className={css(`width:100%; text-align: center`)}>
      Tracking options config
    </div>
  </React.Fragment>
);

export default ({ config, onChange, onSubmit, displayAlert }) => (
  <Card title={<CardTitle />}>
    <Banner isOpen={displayAlert} appearance="announcement">
      Config updated
    </Banner>
    <FieldTextAreaStateless
      enableResize="vertical"
      minimumRows={10}
      value={config}
      onChange={onChange}
      shouldFitContainer
    />
    <div
      className={css`
        display: flex;
        flex-direction: row-reverse;
        margin-top: 10px;
      `}
    >
      <Button onClick={onSubmit} appearance="primary">
        Save
      </Button>
    </div>
  </Card>
);
