import { StyledTabbedFlyoutBody } from "./FlyoutStyles";

import { HamburgerBarButton } from "../Buttons/BasicButtons";

import { useState } from "react";

function TabbedFlyout(props) {
  const [open, setOpen] = useState(true);
  return (
    <StyledTabbedFlyoutBody>
      <HamburgerBarButton
        open={open}
        invert={() => {
          setOpen(!open);
        }}
      />
    </StyledTabbedFlyoutBody>
  );
}

export default TabbedFlyout;
