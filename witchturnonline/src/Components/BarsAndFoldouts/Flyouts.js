import { StyledTabbedFlyoutBody } from "./FlyoutStyles";

import { HamburgerBarButton } from "../Buttons/BasicButtons";

import { useState } from "react";

function TabbedFlyout(props) {
  return <StyledTabbedFlyoutBody open={props.open}></StyledTabbedFlyoutBody>;
}

export default TabbedFlyout;
