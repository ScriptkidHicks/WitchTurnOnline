import {
  AddModal,
  InitiativeRoll,
  SaveModal,
} from "../Components/InitiativeScrollComponents/InitiativeComponents";
import {
  DefaultPageBody,
  DefaultPageColumn,
} from "../Components/StyledComponents/MainStyles";
import { useEffect, useState } from "react";
import {
  StyledButtonRow,
  StyledInfoLabel,
  StyledTurnButton,
} from "../Components/StyledComponents/InitiativeStyles";
import { useParams } from "react-router-dom";
import {
  StyledCopyFlyout,
  StyledHiddenInfo,
  StyledModalHiderDiv,
} from "../Components/BarsAndFoldouts/FlyoutStyles";
import {
  ExpandingButtonModal,
  CloseExpandingModal,
  PremadeMonsterScroll,
} from "../Components/BarsAndFoldouts/Flyouts";

import {
  AbstractDualQualitySorter,
  SortObjectsByName,
  checkLoginState,
} from "../Helpers/HelperFunctions";

import Kobold from "../Assets/MonsterOnlyAssets/Kobold.png";
import Wizard from "../Assets/PlayerAssets/Wizard.png";
import Hag from "../Assets/MonsterOnlyAssets/GreenHag.png";

import names from "../Assets/PlayerAssets/Names";
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
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [mobileSliderOpen, setMobileSliderOpen] = useState(false);

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
    checkLoginState(
      () => {},
      () => {},
      () => {},
      () => {},
      props.setPlayerLoggedIn
    );
  });

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

  function saveSession(sessionName) {
    console.log(sessionName);
    if (sessionName === "" || !sessionName) {
      alert("Please enter a valid session name");
      return;
    }

    const ask = {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "content-type": "application/JSON",
        origin: process.env.REACT_APP_QUERY_SOURCE,
      },
      body: JSON.stringify({
        playerName: "Tammas",
        sessionName: "Test Name",
        session: participants,
      }),
    };

    console.log("query: " + ask);

    console.log(process.env.REACT_APP_SAVE_SESSION);

    fetch(process.env.REACT_APP_SAVE_SESSION, ask).then((response) => {
      console.log(response);
    });
  }

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
    return (
      <StyledCopyFlyout left={props.left}>
        <StyledInfoLabel>Room: </StyledInfoLabel>
        <StyledHiddenInfo open={true}>{props.room}</StyledHiddenInfo>
        {/* {<StyledInterfaceButton
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          Copy Link
        </StyledInterfaceButton>} */}
      </StyledCopyFlyout>
    );
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // The body of the page
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  return (
    <DefaultPageBody>
      <StyledModalHiderDiv
        childOpen={monsterSelectorOpen || playersModalOpen}
        slideOpen={mobileSliderOpen}
        onClick={() => setMobileSliderOpen(!mobileSliderOpen)}
      >
        <ExpandingButtonModal
          slideOpen={mobileSliderOpen}
          othersOpen={monsterSelectorOpen || playersModalOpen}
          background={Hag}
          open={saveModalOpen}
          setOpen={setSaveModalOpen}
        >
          <CloseExpandingModal
            setOpen={setSaveModalOpen}
            resetFunction={() => {}}
          ></CloseExpandingModal>
          <SaveModal saveSession={saveSession}></SaveModal>
        </ExpandingButtonModal>
        <ExpandingButtonModal
          slideOpen={mobileSliderOpen}
          othersOpen={monsterSelectorOpen || saveModalOpen}
          background={Wizard}
          bottom={"100px"}
          open={playersModalOpen}
          setOpen={setPlayersModalOpen}
        >
          <CloseExpandingModal
            setOpen={setPlayersModalOpen}
            resetFunction={() => {}}
          ></CloseExpandingModal>
          <AddModal
            isGM={props.isGM}
            AddParticipant={AddParticipant}
            SetVisible={setAddModalVisible}
          />
        </ExpandingButtonModal>
        <ExpandingButtonModal
          slideOpen={mobileSliderOpen}
          othersOpen={playersModalOpen || saveModalOpen}
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
      </StyledModalHiderDiv>

      <DefaultPageColumn flexGrow={3} modalOn={addModalVisible}>
        <InitiativeRoll
          isGM={props.isGM}
          participants={participants}
          RemoveParticipant={RemoveParticipant}
          UnhideParticipant={UnhideParticipant}
          UpdateParticipantReaction={UpdateParticipantReaction}
        ></InitiativeRoll>
        <StyledButtonRow>
          <StyledTurnButton onClick={ReduceTurn}>{"<<"}</StyledTurnButton>
          <StyledTurnButton onClick={AdvanceTurn}>{">>"}</StyledTurnButton>
        </StyledButtonRow>
      </DefaultPageColumn>
      <DefaultPageColumn
        flexGrow={1}
        modalOn={addModalVisible}
        justifyContent={"space-evenly"}
      >
        <CopyFlyout left={true} room={room} />
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default Base20InitiativePage;
