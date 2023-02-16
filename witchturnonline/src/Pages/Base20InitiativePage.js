import {
  AddModal,
  InitiativeRoll,
  PlayerNameSlide,
} from "../Components/InitiativeScrollComponents/InitiativeComponents";
import {
  DefaultPageBody,
  DefaultPageColumn,
  StyledSearchListInput,
} from "../Components/StyledComponents/MainStyles";
import { useEffect, useState } from "react";
import {
  StyledButtonRow,
  StyledInfoLabel,
  StyledTurnandAddButton,
} from "../Components/StyledComponents/InitiativeStyles";
import { useParams } from "react-router-dom";
import {
  StyledCopyFlyout,
  StyledHiddenInfo,
} from "../Components/BarsAndFoldouts/FlyoutStyles";
import {
  TabbedFlyout,
  ExpandingButtonModal,
  CloseExpandingModal,
  PremadeMonsterScroll,
} from "../Components/BarsAndFoldouts/Flyouts";

import {
  AbstractDualQualitySorter,
  SortObjectsByName,
} from "../Helpers/HelperFunctions";

import Kobold from "../Assets/MonsterOnlyAssets/Kobold.png";
import Wizard from "../Assets/PlayerAssets/Wizard.png";

import names from "../Assets/PlayerAssets/Names";

import { HamburgerBarButton } from "../Components/Buttons/BasicButtons";
import monsters from "../Assets/MonsterOnlyAssets/Monsters";
import { SortedListSearcher } from "../Components/SearchBars/GenericInputs";

function Base20InitiativePage(props) {
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // const variables
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const [participants, setParticipants] = useState([]);
  let participantsParallel = [];
  //we have to keep this around to deal with the render lag from useState

  const [monsterSelectorOpen, setMonsterSelectorOpen] = useState(false);
  const [playersModalOpen, setPlayersModalOpen] = useState(false);

  const { room } = useParams();

  const [offset, setOffset] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(false);

  let AllMonsters = SortObjectsByName(monsters);

  const [monsterList, setMonsterList] = useState(AllMonsters);

  /*
    Use Effects
  */
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  useEffect(() => {
    //clear the names list
    names.clear();

    props.setRoom(room);
    const eventListener = (data) => {};

    props.socket.emit("join_room", { room: room });

    props.socket.on("receive_message", (data) => {
      participantsParallel = data.message;
      setOffset(data.offset);
      setParticipants(data.message);
    });

    props.socket.on("new_member", () => {
      if (props.isGM) {
        SendRoll(participantsParallel, offset);
      }
    });

    return () => props.socket.off("receive_message", eventListener);
  }, [props.room]);

  /*
    Assistant Functions
  */
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  function UnhideParticipant(participantIndex) {
    let updatedParticipants = [...participants];
    updatedParticipants[participantIndex].isHidden = false;
    let tempoffset = offset;
    SendRoll(updatedParticipants, tempoffset);
    participantsParallel = updatedParticipants;
  }

  /*
    Update Participant Reaction
      *if false, set to true, etc

    var: participantIndex: the index of the participant in the turn order
  */

  function UpdateParticipantReaction(participantIndex) {
    let updatedParticipants = [...participants];
    updatedParticipants[participantIndex].reactionUsed =
      !updatedParticipants[participantIndex].reactionUsed;
    participantsParallel = updatedParticipants;

    let tempoffset = offset;
    SendRoll(updatedParticipants, tempoffset);
  }

  /*
    Remove a participant from the roll

    var: participantIndex: the index of the participant in the turn order
  */
  function RemoveParticipant(participantIndex) {
    let updatedParticipants = [...participants];
    updatedParticipants.splice(participantIndex, 1);

    let tempoffset = offset;
    if (participantIndex < tempoffset) {
      tempoffset -= 1;
    }
    if (tempoffset > updatedParticipants.length) {
      tempoffset = 0;
    }
    setOffset(tempoffset);
    SendRoll(updatedParticipants, tempoffset);
    participantsParallel = updatedParticipants;
  }

  function SendRoll(roll, offset) {
    participantsParallel = roll;
    props.socket.emit("send_message", {
      room: props.room,
      message: roll,
      offset: offset,
    });
  }

  function SortParticipantsHelper(toBeSorted) {
    toBeSorted.sort((a, b) => {
      return a.initiative === b.initiative
        ? b.bonus - a.bonus
        : b.initiative - a.initiative;
    });
    return toBeSorted;
  }

  function SortParticipants() {
    let updatedParticipants = [...participants];
    updatedParticipants = SortParticipantsHelper(updatedParticipants);
    setOffset(0);
    SendRoll(updatedParticipants, 0);
  }

  /*
  Add a new participant to the initiative roll. 

  Var:
    picture: the address of the picture the person has selected
    name: the input name of the character
    initiative: the iniative of the participant (OPTIONAL: random(1-20) + bonus)
    bonus: the participant bonus (OPTIONAL: 0)
    isHidden: whether the non-GM players can see this participant.
*/
  function AddParticipant(
    picture,
    name,
    initiative,
    bonus,
    armorClass,
    isHidden
  ) {
    let updatedParticipants = [...participants];
    let tempname = name;

    if (names.has(tempname)) {
      names.set(tempname, names.get(tempname) + 1);
      tempname = tempname + " (" + names.get(tempname) + ")";
    } else {
      names.set(tempname, 1);
    }

    let newParticipant = {
      name: tempname,
      img: picture,
      initiative: initiative,
      bonus: bonus,
      armorClass: armorClass,
      isHidden: isHidden,
      reactionUsed: false,
    };
    if (bonus === undefined || bonus === "") {
      newParticipant.bonus = 0;
    }
    if (initiative === undefined || initiative === "") {
      newParticipant.initiative =
        Math.floor(Math.random() * 19 + 1) + Number(bonus);
    }
    updatedParticipants.push(newParticipant);
    updatedParticipants = AbstractDualQualitySorter(
      updatedParticipants,
      "initiative",
      "bonus"
    );

    let insertIndex = updatedParticipants.findIndex((obj) => {
      return obj === newParticipant;
    });

    let tempoffset = offset;

    if (insertIndex > participants.length - tempoffset) {
      tempoffset += 1;
    }
    let sliceIndex = updatedParticipants.length - tempoffset;
    updatedParticipants = [
      ...updatedParticipants.slice(sliceIndex, updatedParticipants.length),
      ...updatedParticipants.slice(0, sliceIndex),
    ];
    SendRoll(updatedParticipants, tempoffset);
    setOffset(tempoffset);
  }

  function AdvanceTurn() {
    let updatedParticipants = [...participants];

    //Iris always told me, fail early
    if (updatedParticipants.length === 0) {
      return;
    }
    let heldParticipant = updatedParticipants.splice(0, 1)[0];
    updatedParticipants.push(heldParticipant);

    let tempoffset = offset;

    tempoffset -= 1;
    if (tempoffset < 0) {
      tempoffset = updatedParticipants.length + tempoffset;
    }

    //reset the reaction used state of the first participant
    updatedParticipants[0].reactionUsed = false;

    SendRoll(updatedParticipants, tempoffset);
    setOffset(tempoffset);
  }

  function ReduceTurn() {
    let updatedParticipants = [...participants];
    if (updatedParticipants.length === 0) {
      return;
    }

    let heldParticipant = updatedParticipants.pop();
    updatedParticipants = [heldParticipant, ...updatedParticipants];

    let tempoffset = offset;
    tempoffset += 1;
    if (tempoffset >= updatedParticipants.length) {
      tempoffset = 0;
    }
    SendRoll(updatedParticipants, tempoffset);
    setOffset(tempoffset);
  }

  function CopyFlyout(props) {
    const [open, setOpen] = useState(true);

    return (
      <StyledCopyFlyout
        left={props.left}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <StyledInfoLabel>Room: </StyledInfoLabel>
        <StyledHiddenInfo open={open}>{props.room}</StyledHiddenInfo>
        {/* {<StyledTurnandAddButton
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          Copy Link
        </StyledTurnandAddButton>} */}
      </StyledCopyFlyout>
    );
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // The body of the page
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <DefaultPageBody>
      {addModalVisible && (
        <AddModal
          isGM={props.isGM}
          AddParticipant={AddParticipant}
          SetVisible={setAddModalVisible}
        />
      )}
      {props.isGM && (
        <ExpandingButtonModal
          background={Kobold}
          open={monsterSelectorOpen}
          setOpen={setMonsterSelectorOpen}
        >
          <CloseExpandingModal
            listBaseState={AllMonsters}
            resetFunction={setMonsterList}
            setOpen={setMonsterSelectorOpen}
            open={monsterSelectorOpen}
          ></CloseExpandingModal>
          <SortedListSearcher
            placeholder={"Search for a Monster"}
            filteredList={monsterList}
            baseList={AllMonsters}
            setFilteredList={setMonsterList}
          ></SortedListSearcher>
          <PremadeMonsterScroll
            monsters={monsterList}
            AddParticipant={AddParticipant}
          />
        </ExpandingButtonModal>
      )}

      <ExpandingButtonModal
        background={Wizard}
        bottom={"100px"}
        open={playersModalOpen}
        setOpen={setPlayersModalOpen}
      >
        <CloseExpandingModal
          setOpen={setPlayersModalOpen}
          resetFunction={() => {}}
        ></CloseExpandingModal>
      </ExpandingButtonModal>

      <DefaultPageColumn
        flexGrow={2}
        modalOn={addModalVisible}
      ></DefaultPageColumn>
      <DefaultPageColumn modalOn={addModalVisible}>
        <InitiativeRoll
          isGM={props.isGM}
          participants={participants}
          RemoveParticipant={RemoveParticipant}
          UnhideParticipant={UnhideParticipant}
          UpdateParticipantReaction={UpdateParticipantReaction}
        ></InitiativeRoll>
        {props.isGM && (
          <StyledButtonRow>
            <StyledTurnandAddButton onClick={AdvanceTurn}>
              Advance turn
            </StyledTurnandAddButton>
            <StyledTurnandAddButton
              mobileOnly={true}
              onClick={() => {
                setAddModalVisible(true);
              }}
            >
              Add Custom
            </StyledTurnandAddButton>
            <StyledTurnandAddButton onClick={ReduceTurn}>
              reduce turn
            </StyledTurnandAddButton>
          </StyledButtonRow>
        )}
        {!props.isGM && (
          <StyledButtonRow>
            <StyledTurnandAddButton
              mobileOnly={true}
              onClick={() => {
                setAddModalVisible(true);
              }}
            >
              Add custom
            </StyledTurnandAddButton>
          </StyledButtonRow>
        )}
      </DefaultPageColumn>
      <DefaultPageColumn
        flexGrow={2}
        modalOn={addModalVisible}
        justifyContent={"space-evenly"}
      >
        <CopyFlyout left={true} room={room} />
        <StyledTurnandAddButton
          desktopOnly={true}
          onClick={() => {
            setAddModalVisible(true);
          }}
        >
          Add Custom
        </StyledTurnandAddButton>
      </DefaultPageColumn>
      {/*<TabbedFlyout open={open} />
      
        <HamburgerBarButton
          open={open}
          invert={() => {
            setOpen(!open);
          }}
        />
      */}
    </DefaultPageBody>
  );
}

export default Base20InitiativePage;
