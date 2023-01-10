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
import { useState } from "react";
import { StyledModalBackground } from "../Components/StyledComponents/InitiativeStyles";

function InitiativePage(props) {
  const [participants, setParticipants] = useState([
    { name: "momo", img: gobo, initiative: 13, bonus: 2 },
    { name: "Bianchi", img: wizard, initiative: 1, bonus: 3 },
  ]);

  const [offset, setOffset] = useState(0);

  const [addModalVisible, setAddModalVisible] = useState(true);

  function RemoveParticipant(participantIndex) {
    let updatedParticipants = [...participants];
    updatedParticipants.splice(participantIndex, 1);
    setParticipants(updatedParticipants);

    if (participantIndex < offset) {
      setOffset(offset - 1);
    }
    if (offset > updatedParticipants.length) {
      setOffset(0);
    }
  }

  function SortParticipants(toBeSorted) {
    toBeSorted.sort((a, b) => {
      return a.initiative == b.initiative
        ? b.bonus - a.bonus
        : b.initiative - a.initiative;
    });
    return toBeSorted;
  }

  function AddParticipant({ picture, name, initiative, bonus }) {
    console.log("I am being called");
    let updatedParticipants = [...participants];
    let newParticipant = {
      name: name,
      img: wizard,
      initiative: initiative,
      bonus: bonus,
    };
    if (bonus == undefined) {
      newParticipant.bonus = 0;
    }
    if (initiative == undefined) {
      newParticipant.initiative =
        Math.floor(Math.random() * 19 + 1) + Number(bonus);
    }
    updatedParticipants.push(newParticipant);
    console.log("new " + newParticipant);
    console.log(updatedParticipants);
    updatedParticipants = SortParticipants(updatedParticipants);

    let insertIndex = updatedParticipants.findIndex((obj) => {
      return obj == newParticipant;
    });

    if (insertIndex > participants.length - 1 - offset) {
      setOffset(offset + 1);
    }

    console.log(...participants.slice(offset, participants.length));
    console.log(...participants.slice(0, offset));

    updatedParticipants = [
      ...participants.slice(offset, participants.length),
      ...participants.slice(0, offset),
    ];
    console.log(updatedParticipants + "1");
    setParticipants(updatedParticipants);
    console.log(participants);
  }

  function AdvanceTurn() {}

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
        <button>Advance turn</button>
        <button>reduce turn</button>
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

export default InitiativePage;
