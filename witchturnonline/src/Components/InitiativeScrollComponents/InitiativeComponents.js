import {
  StyledInfoLabel,
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledTurnContainer,
  StyledTurnTaker,
} from "../StyledComponents/InitiativeStyles";

import wizard from "../../Assets/Wizard.png";
import {
  StyledMoveTurnPositionButton,
  StyledXButton,
} from "../StyledComponents/MainStyledComponents";

function InitiativeRoll(props) {
  return (
    <StyledTurnContainer>
      <TurnTaker img={wizard} bonus={-3}></TurnTaker>
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
        <StyledXButton buttonSize={"40px"}>X</StyledXButton>
      </StyledTTContentcontainer>
    </StyledTurnTaker>
  );
}

function ChangePositionButton(props) {
  return (
    <StyledMoveTurnPositionButton>
      {props.children}
    </StyledMoveTurnPositionButton>
  );
}

export { InitiativeRoll };
