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
  StyledTurnContainer,
  StyledTurnTaker,
  StyledTTPictureSelectorButton,
  StyledTurnandAddButton,
} from "../StyledComponents/InitiativeStyles";
import {
  StyledFormInformationRow,
  StyledGenericButton,
  StyledXButton,
} from "../StyledComponents/MainStyledComponents";

import { picturesList } from "../../Assets/Pictures";

function InitiativeRoll(props) {
  let isFirst = true;
  return (
    <StyledTurnContainer>
      {props.participants.map((character, index) => {
        console.log("bonus " + character.bonus);
        if (props.isGM && character.isHidden) {
          let firstThief = isFirst;
          isFirst = false;
          return (
            <TurnTaker
              name={character.name}
              img={character.img}
              initiative={character.initiative}
              bonus={character.bonus}
              position={index}
              isFirst={firstThief}
              isGM={props.isGM}
              isHidden={character.isHidden}
              RemoveParticipant={props.RemoveParticipant}
              key={
                (character.initiative, character.bonus, character.name, index)
              }
            />
          );
        } else if (!character.isHidden) {
          let firstThief = isFirst;
          isFirst = false;
          return (
            <TurnTaker
              name={character.name}
              img={character.img}
              initiative={character.initiative}
              bonus={character.bonus}
              position={index}
              isFirst={firstThief}
              isGM={props.isGM}
              isHidden={character.isHidden}
              RemoveParticipant={props.RemoveParticipant}
              key={
                (character.initiative, character.bonus, character.name, index)
              }
            />
          );
        }
      })}
    </StyledTurnContainer>
  );
}

function TurnTaker(props) {
  return (
    <StyledTurnTaker position={props.position} isFirst={props.isFirst}>
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
          {"Bonus: " + (props.bonus >= 0 ? "+" + props.bonus : props.bonus)}
        </StyledInfoLabel>
      </StyledTTContentcontainer>
      <StyledTTContentcontainer>
        {props.isGM && props.isHidden && <button>unhide</button>}
      </StyledTTContentcontainer>
      <StyledTTContentcontainer>
        <StyledXButton
          buttonSize={40}
          onClick={() => {
            props.RemoveParticipant(props.position);
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
    <StyledTurnandAddButton
      onClick={() => {
        props.CompleteModalFunction();
        props.SetVisible(false);
      }}
    >
      {props.children}
    </StyledTurnandAddButton>
  );
}

function AddModal(props) {
  const name = useRef("");
  const bonus = useRef(0);
  const initiative = useRef(undefined);
  const [picture, setPicture] = useState(picturesList[0]);
  const [picScrollVisible, setPicScrollVisible] = useState(false);
  const isHidden = useRef(false);
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
              displaySize={3}
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
          <StyledInfoLabel>Is this a hidden character?</StyledInfoLabel>
          <input
            type={"checkbox"}
            onClick={() => {
              console.log(!isHidden.current);
              isHidden.current = !isHidden.current;
            }}
          ></input>
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
            lettersNotAllowed={true}
            setInputState={(value) => {
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
            lettersNotAllowed={true}
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
              bonus.current,
              isHidden.current
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
