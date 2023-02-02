import { useState } from "react";
import {
  StyledCloseExpandingModal,
  StyledExpandingModal,
  StyledFlyoutTabContent,
  StyledTabbedFlyoutBody,
  StyledTabClicker,
  StyledTabLabel,
} from "./FlyoutStyles";

function TabbedFlyout(props) {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <StyledTabbedFlyoutBody open={props.open}>
      <FlyoutSection
        setPosition={setSelectedTab}
        currentPosition={selectedTab}
        position={1}
        open={props.open}
        title={"Clocks"}
      >
        <label>this is an example</label>
      </FlyoutSection>
      <FlyoutSection
        currentPosition={selectedTab}
        setPosition={setSelectedTab}
        fileColor={"green"}
        position={2}
        open={props.open}
        title={"Notes"}
      ></FlyoutSection>
      <FlyoutSection
        currentPosition={selectedTab}
        setPosition={setSelectedTab}
        fileColor={"wheat"}
        position={3}
        open={props.open}
      ></FlyoutSection>
      <FlyoutSection
        currentPosition={selectedTab}
        setPosition={setSelectedTab}
        fileColor={"grey"}
        position={4}
        open={props.open}
      ></FlyoutSection>
      <FlyoutSection
        currentPosition={selectedTab}
        setPosition={setSelectedTab}
        fileColor={"red"}
        position={5}
        open={props.open}
      ></FlyoutSection>
    </StyledTabbedFlyoutBody>
  );
}

function FlyoutSection(props) {
  return (
    <div>
      <StyledFlyoutTabContent
        fileColor={props.fileColor}
        position={props.position}
        currentPosition={props.currentPosition}
      >
        {props.children}
      </StyledFlyoutTabContent>
      <StyledTabClicker
        open={props.open}
        fileColor={props.fileColor}
        top={props.position * 15}
        position={props.position}
        currentPosition={props.currentPosition}
        onClick={() => {
          props.setPosition(props.position);
        }}
      >
        <StyledTabLabel>{props.title}</StyledTabLabel>
      </StyledTabClicker>
    </div>
  );
}

function ExpandingButtonModal(props) {
  return (
    <StyledExpandingModal
      background={props.background}
      open={props.open}
      onClick={() => {
        props.setOpen(true);
        console.log(props.setOpen);
      }}
    >
      {props.open && props.children}
    </StyledExpandingModal>
  );
}

function CloseExpandingModal(props) {
  return (
    <StyledCloseExpandingModal
      onClick={(event) => {
        console.log("I have been clicked");
        console.log(props.setOpen);
        props.setOpen(false);
        event.stopPropagation();
      }}
      open={props.open}
    >
      X
    </StyledCloseExpandingModal>
  );
}

export { ExpandingButtonModal, FlyoutSection, CloseExpandingModal };
