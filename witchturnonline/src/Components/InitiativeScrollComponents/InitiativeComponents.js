import { useRef, useState } from "react";
import { BasicXCloseButton } from "../Buttons/BasicButtons";
import { LimitedInputCombo } from "../SearchBars/GenericInputs";
import { PictureChooser } from "./Scrolls";
import {
  StyledInfoLabel,
  StyledModalBackground,
  StyledModalInterfaceDiv,
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledTTPictureOption,
  StyledTurnContainer,
  StyledTurnTaker,
  StyledTTPictureSelectorButton,
  StyledPictureSelectorRoll,
} from "../StyledComponents/InitiativeStyles";
import {
  StyledFormInformationRow,
  StyledGenericButton,
  StyledXButton,
} from "../StyledComponents/MainStyledComponents";

import { picturesList } from "../../Assets/Pictures";

function InitiativeRoll(props) {
  return (
    <StyledTurnContainer>
      {props.participants.map((character, index) => {
        return (
          <TurnTaker
            name={character.name}
            img={character.img}
            initiative={character.initiative}
            bonus={character.bonus}
            placement={index}
            RemoveParticipant={props.RemoveParticipant}
            key={(character.initiative, character.bonus, character.name, index)}
          />
        );
      })}
    </StyledTurnContainer>
  );
}

function TurnTaker(props) {
  return (
    <StyledTurnTaker>
      <StyledTTContentcontainer>
        <StyledTTPicture src={props.img} />
        <StyledInfoLabel>
          {props.name ? props.name : "Johnathan"}
        </StyledInfoLabel>
      </StyledTTContentcontainer>
      <StyledTTContentcontainer>
        <StyledInfoLabel>
          {"Initiative: " + (props.initiative ? props.initiative : "")}
        </StyledInfoLabel>
        <StyledInfoLabel>
          {"Bonus: " +
            (props.bonus
              ? props.bonus >= 0
                ? "+" + props.bonus
                : props.bonus
              : "")}
        </StyledInfoLabel>
      </StyledTTContentcontainer>
      <StyledTTContentcontainer>
        <ChangePositionButton>Increase Position</ChangePositionButton>
        <ChangePositionButton>Decreate Position</ChangePositionButton>
      </StyledTTContentcontainer>
      <StyledTTContentcontainer>
        <StyledXButton
          buttonSize={"40px"}
          onClick={() => {
            props.RemoveParticipant(props.placement);
          }}
        >
          X
        </StyledXButton>
      </StyledTTContentcontainer>
    </StyledTurnTaker>
  );
}

function ChangePositionButton(props) {
  return (
    <StyledGenericButton
      onClick={() => {
        props.SetPositionFunction(props.position + props.increment);
      }}
    >
      {props.children}
    </StyledGenericButton>
  );
}

function CompleteModalButton(props) {
  return (
    <StyledGenericButton
      onClick={() => {
        props.CompleteModalFunction();
        props.SetVisible(false);
      }}
    >
      {props.children}
    </StyledGenericButton>
  );
}

function AddModal(props) {
  const name = useRef("");
  const bonus = useRef(0);
  const initiative = useRef(undefined);
  const [picture, setPicture] = useState(picturesList[0]);
  const [picScrollVisible, setPicScrollVisible] = useState(false);
  return (
    <StyledModalBackground>
      <StyledModalInterfaceDiv>
        <StyledFormInformationRow justify={"center"}>
          <BasicXCloseButton SetVisible={props.SetVisible} />
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Picture: </StyledInfoLabel>
          {picScrollVisible && (
            <PictureChooser
              pictures={picturesList}
              selector={setPicture}
              toggleVisible={setPicScrollVisible}
            />
          )}
          {!picScrollVisible && (
            <StyledTTPictureSelectorButton
              src={picture}
              onClick={() => {
                setPicScrollVisible(true);
              }}
            />
          )}
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Name: </StyledInfoLabel>
          <LimitedInputCombo
            setInputState={(value) => (name.current = value)}
            letterSpacing={"0.1em"}
            maxLength={30}
          />
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Initiative: </StyledInfoLabel>
          <LimitedInputCombo
            setInputState={(value) => {
              console.log("init value: " + value);
              initiative.current = value;
            }}
            letterSpacing={"0.1em"}
            maxLength={2}
            placeholder={"random"}
          />
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Bonus: </StyledInfoLabel>
          <LimitedInputCombo
            setInputState={(value) => {
              bonus.current = value;
            }}
            letterSpacing={"0.1em"}
            maxLength={2}
            placeholder={"+0"}
          />
        </StyledFormInformationRow>
        <CompleteModalButton
          CompleteModalFunction={() =>
            props.AddParticipant(
              picture,
              name.current,
              initiative.current,
              bonus.current
            )
          }
          SetVisible={props.SetVisible}
        >
          Add Participant
        </CompleteModalButton>
      </StyledModalInterfaceDiv>
    </StyledModalBackground>
  );
}

export { InitiativeRoll, AddModal };
