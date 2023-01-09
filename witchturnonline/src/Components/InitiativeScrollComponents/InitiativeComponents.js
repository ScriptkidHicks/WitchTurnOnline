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
  StyledMoveTurnPositionButton,
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
    <StyledMoveTurnPositionButton>
      {props.children}
    </StyledMoveTurnPositionButton>
  );
}

function AddModal(props) {
  return (
    <StyledModalBackground>
      <StyledModalInterfaceDiv>
        <StyledXButton
          onClick={() => {
            props.SetVisible(false);
          }}
        >
          X
        </StyledXButton>
        <StyledFormInformationRow>
          <StyledInfoLabel>Name: </StyledInfoLabel>
          hdmlo
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Initiative: </StyledInfoLabel>
          hdmlo
        </StyledFormInformationRow>
        <StyledFormInformationRow>
          <StyledInfoLabel>Bonus: </StyledInfoLabel>
          hdmlo
        </StyledFormInformationRow>
      </StyledModalInterfaceDiv>
    </StyledModalBackground>
  );
}

export { InitiativeRoll, AddModal };
