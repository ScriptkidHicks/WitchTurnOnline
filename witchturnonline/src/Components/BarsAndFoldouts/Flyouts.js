import { useState } from "react";
import {
  StyledMobileOnlyColumn,
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledInfoLabel,
} from "../StyledComponents/InitiativeStyles";
import {
  StyledCloseExpandingModal,
  StyledExpandingModal,
  StyledFlyoutTabContent,
  StyledPremadeMonster,
  StyledPremadeMonstersScroll,
  StyledTabbedFlyoutBody,
  StyledTabClicker,
  StyledTabLabel,
} from "./FlyoutStyles";

import monsters from "../../Assets/MonsterOnlyAssets/Monsters";
import { StyledMinorfunctionButton } from "../StyledComponents/MainStyles";
import { useEffect } from "react";
import {
  AbstractDualQualitySorter,
  SortObjectsByName,
} from "../../Helpers/HelperFunctions";

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
        props.resetFunction(props.listBaseState);
        props.setOpen(false);
        event.stopPropagation();
      }}
      open={props.open}
    >
      X
    </StyledCloseExpandingModal>
  );
}

function PremadeMonsterScroll(props) {
  return (
    <StyledPremadeMonstersScroll>
      {props.monsters.map((monster, index) => {
        return (
          <PremadeMonster
            src={monster.src}
            bonus={monster.bonus}
            key={index}
            name={monster.name}
            AC={monster.armorClass}
            AddParticipant={props.AddParticipant}
          />
        );
      })}
    </StyledPremadeMonstersScroll>
  );
}

function PremadeMonster(props) {
  const [hidden, setHidden] = useState(false);
  return (
    <StyledPremadeMonster
      onClick={() =>
        props.AddParticipant(
          props.src,
          props.name,
          undefined,
          props.bonus,
          props.armorClass,
          hidden
        )
      }
    >
      <StyledMobileOnlyColumn>
        <StyledTTContentcontainer>
          <StyledTTPicture src={props.src}></StyledTTPicture>
          <StyledInfoLabel>
            {props.name ? props.name : "Johnathan"}
          </StyledInfoLabel>
        </StyledTTContentcontainer>
        <StyledTTContentcontainer>
          <StyledInfoLabel>
            {"Bonus: " + (props.bonus >= 0 ? "+" + props.bonus : props.bonus)}
          </StyledInfoLabel>
        </StyledTTContentcontainer>
      </StyledMobileOnlyColumn>
      <StyledTTContentcontainer>
        <StyledInfoLabel>Hidden?</StyledInfoLabel>
        <StyledMinorfunctionButton
          onClick={(event) => {
            event.stopPropagation();
            setHidden(!hidden);
          }}
        >
          {hidden && "Yes"}
          {!hidden && "No"}
        </StyledMinorfunctionButton>
      </StyledTTContentcontainer>
    </StyledPremadeMonster>
  );
}

export {
  ExpandingButtonModal,
  FlyoutSection,
  CloseExpandingModal,
  PremadeMonsterScroll,
};
