import {
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledTurnContainer,
  StyledTurnTaker,
} from "../StyledComponents/InitiativeStyles";

import wizard from "../../Assets/Wizard.png";
import {
  BasicDecrementButton,
  BasicIncrementButton,
} from "../Buttons/BasicButtons";
import { StyledXButton } from "../StyledComponents/MainStyledComponents";

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
      <StyledTTContentcontainer>
        {props.initiative ? props.initiative : "initiative"}
      </StyledTTContentcontainer>
      <StyledTTContentcontainer>
        <BasicIncrementButton />
        <BasicDecrementButton />
      </StyledTTContentcontainer>
      <StyledTTContentcontainer>
        <StyledXButton buttonSize={"40px"}>X</StyledXButton>
      </StyledTTContentcontainer>
    </StyledTurnTaker>
  );
}

export { InitiativeRoll };
