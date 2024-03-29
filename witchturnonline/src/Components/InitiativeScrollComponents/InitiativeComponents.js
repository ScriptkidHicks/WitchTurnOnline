import { useRef, useState } from "react";
import { LimitedInputCombo } from "../SearchBars/GenericInputs";
import { PictureChooser } from "./Scrolls";
import {
  StyledInfoLabel,
  StyledModalInterfaceDiv,
  StyledTTContentcontainer,
  StyledTurnTaker,
  StyledTTPictureSelectorButton,
  StyledInterfaceButton,
  StyledTurnContainerWrapper,
  StyledTurncontainer,
  StyledMobileOnlyColumn,
  StyledTTPictureExpanding,
  StyledNameSlide,
  StyledNameTag,
} from "../StyledComponents/InitiativeStyles";
import {
  StyledFormInformationRow,
  StyledMinorfunctionButton,
  StyledXButton,
} from "../StyledComponents/MainStyles";

import { picturesList } from "../../Assets/PlayerAssets/Pictures";
import { GenericToggle } from "../Buttons/Switches";

function InitiativeRoll(props) {
  let isFirst = true;
  return (
    <StyledTurnContainerWrapper>
      <StyledTurncontainer>
        {props.participants.map((character, index) => {
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
                reactionUsed={character.reactionUsed}
                isHidden={character.isHidden}
                RemoveParticipant={props.RemoveParticipant}
                UnhideParticipant={props.UnhideParticipant}
                UpdateParticipantReaction={props.UpdateParticipantReaction}
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
                reactionUsed={character.reactionUsed}
                isHidden={character.isHidden}
                RemoveParticipant={props.RemoveParticipant}
                UpdateParticipantReaction={props.UpdateParticipantReaction}
                key={
                  (character.initiative, character.bonus, character.name, index)
                }
              />
            );
          }
        })}
      </StyledTurncontainer>
    </StyledTurnContainerWrapper>
  );
}

function PlayerNameSlide(props) {
  return (
    <StyledNameSlide>
      <StyledNameTag>Lillith</StyledNameTag>
    </StyledNameSlide>
  );
}

function ReactionTracker(props) {
  if (!props.isGM) {
    if (props.reactionUsed) {
      return <StyledInfoLabel>Yes</StyledInfoLabel>;
    } else {
      return <StyledInfoLabel>No</StyledInfoLabel>;
    }
  } else {
    if (props.reactionUsed) {
      return (
        <StyledMinorfunctionButton
          onClick={() => props.UpdateParticipantReaction(props.position)}
        >
          Yes
        </StyledMinorfunctionButton>
      );
    } else {
      return (
        <StyledMinorfunctionButton
          onClick={() => props.UpdateParticipantReaction(props.position)}
        >
          No
        </StyledMinorfunctionButton>
      );
    }
  }
}

function TurnTakerPictureAndSheet(props) {
  return (
    <StyledTTPictureExpanding
      onClick={() => {
        // props.setOpen(true);
      }}
      imageSource={props.src}
      open={props.open}
    >
      {props.open && <div>Pepis</div>}
    </StyledTTPictureExpanding>
  );
}

function TurnTaker(props) {
  const [open, setOpen] = useState(false);
  return (
    <StyledTurnTaker position={props.position} isFirst={props.isFirst}>
      <StyledMobileOnlyColumn>
        <StyledTTContentcontainer>
          <TurnTakerPictureAndSheet
            src={props.img}
            open={open}
            setOpen={setOpen}
          />
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
      </StyledMobileOnlyColumn>
      <StyledMobileOnlyColumn>
        <StyledTTContentcontainer>
          <StyledInfoLabel>Reaction Used?</StyledInfoLabel>
          <ReactionTracker
            isGM={props.isGM}
            reactionUsed={props.reactionUsed}
            position={props.position}
            UpdateParticipantReaction={props.UpdateParticipantReaction}
          />
        </StyledTTContentcontainer>
        {props.isGM && props.isHidden && (
          <StyledTTContentcontainer>
            <StyledMinorfunctionButton
              onClick={() => {
                props.UnhideParticipant(props.position);
              }}
            >
              unhide
            </StyledMinorfunctionButton>
          </StyledTTContentcontainer>
        )}
      </StyledMobileOnlyColumn>

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

function CompleteModalButton(props) {
  return (
    <StyledInterfaceButton
      onClick={() => {
        props.CompleteModalFunction();
        props.SetVisible(false);
      }}
    >
      {props.children}
    </StyledInterfaceButton>
  );
}

function AddModal(props) {
  const name = useRef("");
  const bonus = useRef(0);
  const initiative = useRef(undefined);
  const armorClass = useRef(0);
  const [picture, setPicture] = useState(picturesList[0]);
  const [picScrollVisible, setPicScrollVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  return (
    <StyledModalInterfaceDiv>
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
      {props.isGM && (
        <StyledFormInformationRow>
          <StyledInfoLabel>Is this a hidden character?</StyledInfoLabel>
          <GenericToggle
            active={isHidden}
            setActive={setIsHidden}
          ></GenericToggle>
        </StyledFormInformationRow>
      )}
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
          numbersOnly={true}
          setInputState={(value) => {
            armorClass.current = value;
          }}
          letterSpacing={"0.1em"}
          maxLength={2}
          placeholder={"random"}
        />
      </StyledFormInformationRow>
      <StyledFormInformationRow>
        <StyledInfoLabel>Bonus: </StyledInfoLabel>
        <LimitedInputCombo
          numbersOnly={true}
          setInputState={(value) => {
            bonus.current = value;
          }}
          letterSpacing={"0.1em"}
          maxLength={2}
          placeholder={"+0"}
        />
      </StyledFormInformationRow>
      <StyledFormInformationRow>
        <StyledInfoLabel>Armor Class</StyledInfoLabel>
        <LimitedInputCombo
          numbersOnly={true}
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
            armorClass.current,
            isHidden
          )
        }
        SetVisible={props.SetVisible}
      >
        Add
      </CompleteModalButton>
    </StyledModalInterfaceDiv>
  );
}

function SaveModal(props) {
  const name = useRef(props.sessionName ? props.sessionName : "");
  return (
    <StyledModalInterfaceDiv>
      <StyledFormInformationRow>
        <StyledInfoLabel>Session Name:</StyledInfoLabel>
        <LimitedInputCombo
          setInputState={(value) => (name.current = value)}
          letterSpacing={"0.0em"}
          maxLength={20}
        />
      </StyledFormInformationRow>
      <StyledInterfaceButton
        onClick={() => {
          props.saveSession(name.current);
        }}
      >
        Save
      </StyledInterfaceButton>
    </StyledModalInterfaceDiv>
  );
}

export {
  InitiativeRoll,
  AddModal,
  TurnTakerPictureAndSheet,
  PlayerNameSlide,
  SaveModal,
};
