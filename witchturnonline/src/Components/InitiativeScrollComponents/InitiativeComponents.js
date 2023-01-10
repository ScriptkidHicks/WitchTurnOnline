import { useState } from "react";
import { BasicXCloseButton } from "../Buttons/BasicButtons";
import { LimitedInputCombo } from "../SearchBars/GenericInputs";
import {
  StyledInfoLabel,
  StyledModalBackground,
  StyledModalInterfaceDiv,
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledTurnContainer,
  StyledTurnTaker,
} from "../StyledComponents/InitiativeStyles";
import {
  StyledFormInformationRow,
  StyledGenericButton,
  StyledXButton,
} from "../StyledComponents/MainStyledComponents";

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
        props.CompleteModalFunction(props.inputs);
        props.SetVisible(false);
      }}
    >
      {props.children}
    </StyledGenericButton>
  );
}

function AddModal(props) {
  const [name, setName] = useState("");
  const [bonus, setBonus] = useState(undefined);
  const [initiative, setInitiative] = useState(undefined);
  return (
    <StyledModalBackground>
      <StyledModalInterfaceDiv>
        <StyledFormInformationRow justify={"center"}>
          <BasicXCloseButton SetVisible={props.SetVisible} />
        </StyledFormInformationRow>

        <StyledFormInformationRow>
          <StyledInfoLabel>Name: </StyledInfoLabel>
          <LimitedInputCombo
            setInputState={setName}
            letterSpacing={"0.1em"}
            maxLength={2}
          />
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Initiative: </StyledInfoLabel>
          <LimitedInputCombo
            setInputState={setInitiative}
            letterSpacing={"0.1em"}
            maxLength={2}
            placeholder={"random"}
          />
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Bonus: </StyledInfoLabel>
          <LimitedInputCombo
            setInputState={setBonus}
            letterSpacing={"0.1em"}
            maxLength={2}
            placeholder={"+0"}
          />
        </StyledFormInformationRow>
        <CompleteModalButton
          CompleteModalFunction={props.AddParticipant}
          inputs={{
            picture: null,
            name: name,
            initiative: initiative,
            bonus: bonus,
          }}
          SetVisible={props.SetVisible}
        >
          Add Participant
        </CompleteModalButton>
      </StyledModalInterfaceDiv>
    </StyledModalBackground>
  );
}

export { InitiativeRoll, AddModal };
