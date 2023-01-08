import { useEffect, useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  GenericInputDiv,
} from "../Components/StyledComponents/MainStyledComponents";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";

import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io(process.env.REACT_APP_CLIENT_CONNECTION, {
  transports: ["websocket"],
});

function LoginLandingPage(props) {
  const [message, setMessage] = useState("");
  const [roomPicked, setRoomPicked] = useState(false);

  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  function sendMessage() {
    console.log(process.env);
    if (roomPicked) {
      socket.emit("send_message", { message: message, room: props.room });
    }
  }

  useEffect(() => {
    const eventListener = (data) => {
      console.log(data);
    };

    socket.on("receive_message", (data) => {
      console.log(data.message);
      setTitle(data.message);
    });

    return () => socket.off("receive_message", eventListener);
  }, [socket]);

  function connectToRoom(room) {
    console.log(room);
    setRoomPicked(true);
    socket.emit("join_room", { room: room });
  }

  function disconnectFromRoom(room) {
    setRoomPicked(false);
    socket.emit("leave_room", { room: room });
    props.setRoom(null);
  }

  return (
    <DefaultPageBody>
      <DefaultPageColumn flexGrow={2}>
        {!roomPicked && (
          <GenericInputDiv>
            Start A New Room
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
        )}
        {roomPicked && (
          <GenericInputDiv>
            Disconnect from current room
            <button onClick={() => disconnectFromRoom(props.room)}>
              Disconnect
            </button>
          </GenericInputDiv>
        )}
        <GenericInputDiv>
          This is an example of socket work. No need to hang onto it.
          <LimitedInputCombo
            inputState={message}
            setInputState={setMessage}
          ></LimitedInputCombo>
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
