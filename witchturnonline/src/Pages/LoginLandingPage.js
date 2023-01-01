import { useEffect, useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  GenericInputDiv,
} from "../Components/StyledComponents/MainStyledComponents";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";

import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function LoginLandingPage() {
  const [inputState, setInputState] = useState("");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");

  function sendMessage() {
    console.log("hemlo");
    socket.emit("send_message", {message: message})
  };

  useEffect(() => {
    const eventListener = (data) => {
      console.log(data);
    }

    socket.on("receive_message", (data) => {
      console.log(data.message);
      setTitle(data.message);
    })

    return () => socket.off("receive_message", eventListener);
  } , [socket]);

  return (
    <DefaultPageBody>
      <DefaultPageColumn flexGrow={2}>
        <GenericInputDiv>
          Start A New Room
          <LimitedInputCombo
            maxLength={10}
            minLength={10}
            inputState={inputState}
            setInputState={setInputState}
          ></LimitedInputCombo>
        </GenericInputDiv>
        <GenericInputDiv>
          This is an example of socket work. No need to hang onto it.
          <LimitedInputCombo inputState={message} setInputState={setMessage}></LimitedInputCombo>
          <button onClick={sendMessage}>Send it</button>
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

export default LoginLandingPage;
