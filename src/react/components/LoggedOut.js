import React from "react";
import Button from "@atlaskit/button";
import SignInIcon from "@atlaskit/icon/glyph/sign-in";
import EmptyState from "@atlaskit/empty-state";

const primaryAction = (
  <Button
    appearance="primary"
    href="#/"
    onClick={() => console.log("primary action clicked")}
    iconAfter={<SignInIcon />}
  >
    Sign in
  </Button>
);

const props = {
  header: "You're logged out ",
  size: "narrow",
  description: `Sign in to start tracking your time with WakaTime`,
  primaryAction
};

export default () => <EmptyState {...props} />;
