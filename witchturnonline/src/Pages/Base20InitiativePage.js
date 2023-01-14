import {
  AddModal,
  InitiativeRoll,
} from "../Components/InitiativeScrollComponents/InitiativeComponents";
import {
  DefaultPageBody,
  DefaultPageColumn,
} from "../Components/StyledComponents/MainStyledComponents";
import wizard from "../Assets/Wizard.png";
import gobo from "../Assets/GoboTest.png";
import { useEffect, useState } from "react";

function Base20InitiativePage(props) {
  const [participants, setParticipants] = useState([
    { name: "Bianchi", img: wizard, initiative: 1, bonus: 3 },
    { name: "momo", img: gobo, initiative: 13, bonus: 2 },
  ]);

  const [offset, setOffset] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    if (props.room === "") {
      return;
    }
    console.log("useEffectFired");
    const eventListener = (data) => {
      console.log(data);
    };

    props.socket.emit("join_room", { room: props.room });

    props.socket.on("receive_message", (data) => {
      console.log("received " + data.message);
      setParticipants(data.message);
    });

    return () => props.socket.off("receive_message", eventListener);
  }, [props.room]);

  function LeaveRoom() {
    props.socket.emit("leave_room", { room: props.room });
    props.setRoom("");
  }

  function RemoveParticipant(participantIndex) {
    let updatedParticipants = [...participants];
    updatedParticipants.splice(participantIndex, 1);
    setParticipants(updatedParticipants);

    if (participantIndex < offset) {
      setOffset(offset - 1);
    }
    if (offset > updatedParticipants.length) {
      console.log("should be 0");
      setOffset(0);
    }
    SendRoll(updatedParticipants);
  }

  function SendRoll(roll) {
    props.socket.emit("send_message", {
      room: props.room,
      message: roll,
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
    setParticipants(updatedParticipants);
    setOffset(0);
    SendRoll(updatedParticipants);
  }

  function AddParticipant(picture, name, initiative, bonus) {
    let updatedParticipants = [...participants];
    let newParticipant = {
      name: name,
      img: picture,
      initiative: initiative,
      bonus: bonus,
    };
    if (bonus === undefined) {
      newParticipant.bonus = 0;
    }
    if (initiative === undefined) {
      newParticipant.initiative =
        Math.floor(Math.random() * 19 + 1) + Number(bonus);
    }
    updatedParticipants.push(newParticipant);
    updatedParticipants = SortParticipantsHelper(updatedParticipants);

    let insertIndex = updatedParticipants.findIndex((obj) => {
      return obj === newParticipant;
    });

    console.log("insert " + insertIndex);

    if (insertIndex > participants.length - offset) {
      console.log("my offset " + offset + 1);
      setOffset(offset + 1);
    }
    updatedParticipants = [
      ...updatedParticipants.slice(offset, updatedParticipants.length),
      ...updatedParticipants.slice(0, offset),
    ];
    setParticipants(updatedParticipants);
    SendRoll(updatedParticipants);
  }

  function AdvanceTurn() {
    let updatedParticipants = [...participants];

    //Iris always told me, fail early
    if (updatedParticipants.length === 0) {
      return;
    }
    let heldParticipant = updatedParticipants.splice(0, 1)[0];
    updatedParticipants.push(heldParticipant);

    let newOffset = offset - 1;
    if (newOffset < 0) {
      newOffset = updatedParticipants.length + newOffset;
    }

    console.log("adv " + newOffset);
    setOffset(newOffset);
    console.log(newOffset);

    setParticipants(updatedParticipants);
    SendRoll(updatedParticipants);
  }

  function ReduceTurn() {
    let updatedParticipants = [...participants];
    if (updatedParticipants.length === 0) {
      return;
    }

    let heldParticipant = updatedParticipants.pop();
    updatedParticipants = [heldParticipant, ...updatedParticipants];
    setParticipants(updatedParticipants);

    let newOffset = offset + 1;
    if (newOffset >= updatedParticipants.length) {
      newOffset = 0;
    }
    console.log(newOffset);
    setOffset(newOffset);
    SendRoll(updatedParticipants);
  }

  return (
    <DefaultPageBody>
      {addModalVisible && (
        <AddModal
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
          participants={participants}
          RemoveParticipant={RemoveParticipant}
        ></InitiativeRoll>
        <button onClick={AdvanceTurn}>Advance turn</button>
        <button onClick={ReduceTurn}>reduce turn</button>
        <button onClick={LeaveRoom}>leave</button>
      </DefaultPageColumn>
      <DefaultPageColumn flexGrow={2} modalOn={addModalVisible}>
        <button
          onClick={() => {
            setAddModalVisible(true);
          }}
        >
          Add Participant
        </button>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default Base20InitiativePage;
