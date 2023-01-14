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
  const [message, setMessage] = useState("");

  const [generateRoomPressed, setGenerateRoomPressed] = useState(false);
  const toggleRoomPressed = useCallback(
    () => setGenerateRoomPressed(!generateRoomPressed),
    [generateRoomPressed]
  );

  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  return (
    <DefaultPageBody>
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
          <LimitedInputCombo
            inputState={message}
            setInputState={setMessage}
          ></LimitedInputCombo>
          <button>Send it</button>
        </GenericInputDiv>
      </DefaultPageColumn>
      <DefaultPageColumn justifyContent={"flex-start"}>
        <MainTitleLabel flexGrow={1} maxWidth={"40%"} opacity={"0.5"}>
          {title}
        </MainTitleLabel>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default JoinRoomPage;
