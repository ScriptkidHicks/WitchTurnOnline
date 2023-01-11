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

function InitiativePage(props) {
  const [participants, setParticipants] = useState([
    { name: "Bianchi", img: wizard, initiative: 1, bonus: 3 },
    { name: "momo", img: gobo, initiative: 13, bonus: 2 },
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
  }

  function AddParticipant(picture, name, initiative, bonus) {
    console.log("name: " + name + " init: " + initiative + " bonus " + bonus);
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

    if (insertIndex > updatedParticipants.length - 1 - offset) {
      setOffset(offset + 1);
    }
    updatedParticipants = [
      ...updatedParticipants.slice(offset, updatedParticipants.length),
      ...updatedParticipants.slice(0, offset),
    ];
    setParticipants(updatedParticipants);
  }

  function AdvanceTurn() {
    let updatedParticipants = [...participants];

    //Iris always told me, fail early
    if (updatedParticipants.length === 0) {
      return;
    }
    let heldParticipant = updatedParticipants.splice(0, 1)[0];
    updatedParticipants.push(heldParticipant);

    let newOffset = 0;
    if (offset >= updatedParticipants.length) {
      newOffset = offset + 1;
    }

    setOffset(newOffset);

    setParticipants(updatedParticipants);
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
        <button>reduce turn</button>
        <button onClick={SortParticipants}>sort</button>
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
