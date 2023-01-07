import {
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledTurnContainer,
  StyledTurnTaker,
} from "../StyledComponents/InitiativeStyles";

import wizard from "../../Assets/Wizard.png";

function InitiativeRoll(props) {
  return (
    <StyledTurnContainer>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
      <TurnTaker img={wizard}></TurnTaker>
    </StyledTurnContainer>
  );
}

function TurnTaker(props) {
  return (
    <StyledTurnTaker>
      <StyledTTContentcontainer>
        <StyledTTPicture src={props.img} />
        {props.name ? props.name : "johnathan"}
      </StyledTTContentcontainer>
      <StyledTTContentcontainer></StyledTTContentcontainer>
      <StyledTTContentcontainer></StyledTTContentcontainer>
    </StyledTurnTaker>
  );
}

export { InitiativeRoll };
