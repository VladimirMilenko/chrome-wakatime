import React from "react";
import { css } from "emotion";
import Button from "@atlaskit/button";
import SignOutIcon from "@atlaskit/icon/glyph/sign-out";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import DashboardIcon from "@atlaskit/icon/glyph/dashboard";
import Card from "./Card";

export default ({ active, onLogout }) => (
  <Card>
    <div>
      <div
        className={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <Button
          isSelected={active === "dashboard"}
          appearance="subtle"
          href="#/"
          iconBefore={<DashboardIcon />}
        >
          Dashboard
        </Button>
        <Button
          isSelected={active === "options"}
          appearance="subtle"
          href="#/options"
          iconBefore={<SettingsIcon />}
        >
          Options
        </Button>
        <Button
          onClick={onLogout}
          appearance="subtle"
          iconBefore={<SignOutIcon />}
        >
          Logout
        </Button>
      </div>
    </div>
  </Card>
);
