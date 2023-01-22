import { useEffect, useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  GenericInputDiv,
  MarginText,
  StyledLabelText,
} from "../Components/StyledComponents/MainStyles";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";

import { useNavigate } from "react-router-dom";
import { StyledTurnandAddButton } from "../Components/StyledComponents/InitiativeStyles";

function JoinRoomPage(props) {
  const [generateRoomPressed, setGenerateRoomPressed] = useState(false);
  const [checkingRoomValidity, setCheckingRoomValidity] = useState(false);

  const navigate = useNavigate();

  function GenerateRoom() {
    props.socket.emit("generate_room");
    setGenerateRoomPressed(true);
  }

  function AttemptToJoinRoom() {
    props.socket.emit("check_room_validity", { room: props.room });
    setCheckingRoomValidity(true);
  }

  useEffect(() => {
    props.socket.on("room_valid", (data) => {
      props.setRoom(data.room);
      navigate(`/initiative/${data.room}`);
    });

    return () => {
      props.socket.off("room_valid", (data) => {
        console.log("room valid off");
      });
    };
  }, []);

  useEffect(() => {
    props.socket.on("room_not_valid", (data) => {
      alert(`That room has not yet been made`);
      setCheckingRoomValidity(false);
    });

    return () => {
      props.socket.off("room_not_valid", (data) => {
        console.log("stopped listening to room valid");
      });
    };
  }, []);

  useEffect(() => {
    props.socket.on("room_generated", (data) => {
      props.setIsGM(true);
      props.setRoom(data.room);
      navigate(`/initiative/${data.room}`);
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
        <DefaultPageColumn flexGrow={1}>
          {!checkingRoomValidity && (
            <GenericInputDiv>
              <StyledLabelText>Join an existing room</StyledLabelText>
              <LimitedInputCombo
                maxLength={6}
                minLength={6}
                inputState={props.room}
                setInputState={props.setRoom}
              ></LimitedInputCombo>
              <StyledTurnandAddButton onClick={AttemptToJoinRoom}>
                Join
              </StyledTurnandAddButton>
            </GenericInputDiv>
          )}
          {checkingRoomValidity && (
            <GenericInputDiv>Checking the validity of the room</GenericInputDiv>
          )}

          <GenericInputDiv>
            <StyledLabelText>Start a new Room (You will be GM)</StyledLabelText>

            <StyledTurnandAddButton onClick={GenerateRoom}>
              Generate Room
            </StyledTurnandAddButton>
          </GenericInputDiv>
        </DefaultPageColumn>
      )}
      <DefaultPageColumn justifyContent={"flex-start"}>
        <MainTitleLabel flexGrow={1} maxWidth={"40%"} opacity={"0.5"}>
          {!generateRoomPressed && "Witch"} <br />
          {!generateRoomPressed && (
            <MarginText margin={"0px 0px 0px 100px"}>Turn</MarginText>
          )}
          {generateRoomPressed && "Loading your room"}
        </MainTitleLabel>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default JoinRoomPage;
