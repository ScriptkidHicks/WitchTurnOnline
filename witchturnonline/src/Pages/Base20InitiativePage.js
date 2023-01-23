import {
  AddModal,
  InitiativeRoll,
} from "../Components/InitiativeScrollComponents/InitiativeComponents";
import {
  DefaultPageBody,
  DefaultPageColumn,
  GenericInputDiv,
  StyledLabelText,
} from "../Components/StyledComponents/MainStyles";
import { useEffect, useState } from "react";
import {
  StyledButtonRow,
  StyledInfoLabel,
  StyledTurnandAddButton,
} from "../Components/StyledComponents/InitiativeStyles";
import { useNavigate, useParams } from "react-router-dom";
import {
  StyledCopyFlyout,
  StyledHiddenInfo,
} from "../Components/BarsAndFoldouts/Flyouts";

function Base20InitiativePage(props) {
  const [participants, setParticipants] = useState([]);

  const { room } = useParams();

  const navigate = useNavigate();

  let participantsParallel = [];
  //we have to keep this around to deal with the render lag from useState
  const [offset, setOffset] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    console.log("room " + room);
    props.setRoom(room);

    // if (props.room === "") {
    //   alert("That room doesn't appear to exist");
    //   navigate("/");
    // }
    const eventListener = (data) => {
      console.log(data);
    };

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

  function UnhideParticipant(participantIndex) {
    let updatedParticipants = [...participants];
    updatedParticipants[participantIndex].isHidden = false;
    let tempoffset = offset;
    SendRoll(updatedParticipants, tempoffset);
    participantsParallel = updatedParticipants;
  }

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

  function AddParticipant(picture, name, initiative, bonus, isHidden) {
    console.log("character is hidden " + isHidden);
    let updatedParticipants = [...participants];
    let newParticipant = {
      name: name,
      img: picture,
      initiative: initiative,
      bonus: bonus,
      isHidden: isHidden,
    };
    if (bonus === undefined || bonus === "") {
      newParticipant.bonus = 0;
    }
    console.log("bonus in add " + bonus);
    if (initiative === undefined || initiative === "") {
      newParticipant.initiative =
        Math.floor(Math.random() * 19 + 1) + Number(bonus);
    }
    updatedParticipants.push(newParticipant);
    updatedParticipants = SortParticipantsHelper(updatedParticipants);

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

  return (
    <DefaultPageBody>
      {addModalVisible && (
        <AddModal
          isGM={props.isGM}
          AddParticipant={AddParticipant}
          SetVisible={setAddModalVisible}
        />
      )}
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
              Add Participant
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
              Add Participant
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
          Add Participant
        </StyledTurnandAddButton>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default Base20InitiativePage;
