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

  function AdvanceTurn() {}

  return (
    <DefaultPageBody>
      {addModalVisible && <AddModal SetVisible={setAddModalVisible} />}
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
