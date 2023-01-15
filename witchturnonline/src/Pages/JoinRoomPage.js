import { useCallback, useEffect, useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  GenericInputDiv,
} from "../Components/StyledComponents/MainStyledComponents";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";

import { useNavigate } from "react-router-dom";

function JoinRoomPage(props) {
  const [generateRoomPressed, setGenerateRoomPressed] = useState(false);

  const navigate = useNavigate();

  function GenerateRoom() {
    props.socket.emit("generate_room");
    setGenerateRoomPressed(true);
  }

  useEffect(() => {
    console.log("use effect fired");
    props.socket.on("room_generated", (data) => {
      console.log("roomcode: " + data.room);
      props.setRoom(data.room);
      navigate("/initiative");
    });

    return () =>
      props.socket.off("room_generated", (data) => {
        console.log(data);
        console.log("room generated off");
      });
  }, []);

  return (
    <DefaultPageBody>
      {!generateRoomPressed && (
        <DefaultPageColumn flexGrow={2}>
          {
            <GenericInputDiv>
              Join an existing room
              <LimitedInputCombo
                maxLength={10}
                minLength={10}
                inputState={props.room}
                setInputState={props.setRoom}
              ></LimitedInputCombo>
              <button
                onClick={() => {
                  navigate("/initiative");
                }}
              >
                Join
              </button>
            </GenericInputDiv>
          }
          <GenericInputDiv>
            Start a new Room (You will be GM)
            <button onClick={GenerateRoom}>Generate Room</button>
          </GenericInputDiv>
        </DefaultPageColumn>
      )}
      <DefaultPageColumn justifyContent={"flex-start"}>
        <MainTitleLabel flexGrow={1} maxWidth={"40%"} opacity={"0.5"}>
          {!generateRoomPressed && "Witch Turn Online"}
          {generateRoomPressed && "Loading your room"}
        </MainTitleLabel>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default JoinRoomPage;
