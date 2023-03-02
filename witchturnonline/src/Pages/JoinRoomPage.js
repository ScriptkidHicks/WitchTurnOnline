import { useEffect, useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  GenericInputDiv,
  MarginText,
  StyledLabelText,
  StyledInputRow,
} from "../Components/StyledComponents/MainStyles";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";

import { useNavigate } from "react-router-dom";
import { StyledInterfaceButton } from "../Components/StyledComponents/InitiativeStyles";

function JoinRoomPage(props) {
  const [generateRoomPressed, setGenerateRoomPressed] = useState(false);
  const [checkingRoomValidity, setCheckingRoomValidity] = useState(false);

  const navigate = useNavigate();

  function GenerateRoom() {
    if (props.playerName === undefined || props.playerName === "") {
      alert("Please enter a player name");
      return;
    }
    props.socket.emit("generate_room");
    setGenerateRoomPressed(true);
  }

  function AttemptToJoinRoom() {
    if (props.playerName === "" || props.playerName === undefined) {
      alert("Please enter a player name");
      return;
    }
    props.socket.emit("check_room_validity", {
      room: props.room.toLowerCase(),
    });
    setCheckingRoomValidity(true);
  }

  useEffect(() => {
    props.socket.on("room_valid", (data) => {
      props.setRoom(data.room.toLowerCase());
      navigate(`/initiative/${data.room}`);
    });

    return () => {
      props.socket.off("room_valid", (data) => {});
    };
  }, []);

  useEffect(() => {
    props.socket.on("room_not_valid", (data) => {
      props.setPlayerName("");
      alert(`That room has not yet been made`);
      setCheckingRoomValidity(false);
    });

    return () => {
      props.socket.off("room_not_valid", (data) => {});
    };
  }, []);

  useEffect(() => {
    props.socket.on("room_generated", (data) => {
      props.setIsGM(true);
      props.setRoom(data.room);
      navigate(`/initiative/${data.room}`);
    });

    return () => props.socket.off("room_generated", (data) => {});
  }, []);

  return (
    <DefaultPageBody>
      {!generateRoomPressed && (
        <DefaultPageColumn flexGrow={1}>
          {!checkingRoomValidity && (
            <GenericInputDiv>
              <StyledLabelText>Join an existing room</StyledLabelText>
              <StyledInputRow>
                <StyledLabelText>Room Code:</StyledLabelText>
                <LimitedInputCombo
                  maxLength={6}
                  minLength={6}
                  inputState={props.room}
                  setInputState={props.setRoom}
                ></LimitedInputCombo>
              </StyledInputRow>
              <StyledInputRow>
                <StyledLabelText>Your Name:</StyledLabelText>
                <LimitedInputCombo
                  maxLength={40}
                  letterSpacing={"0em"}
                  inputState={props.playerName}
                  setInputState={props.setPlayerName}
                ></LimitedInputCombo>
              </StyledInputRow>
              <StyledInterfaceButton onClick={AttemptToJoinRoom}>
                Join
              </StyledInterfaceButton>
            </GenericInputDiv>
          )}
          {checkingRoomValidity && (
            <GenericInputDiv>Checking the validity of the room</GenericInputDiv>
          )}

          <GenericInputDiv>
            <StyledLabelText>Start a new Room (You will be GM)</StyledLabelText>
            <StyledInputRow>
              <StyledLabelText>Your Name:</StyledLabelText>
              <LimitedInputCombo
                maxLength={40}
                letterSpacing={"0em"}
                inputState={props.playerName}
                setInputState={props.setPlayerName}
              ></LimitedInputCombo>
            </StyledInputRow>

            <StyledInterfaceButton onClick={GenerateRoom}>
              Generate Room
            </StyledInterfaceButton>
          </GenericInputDiv>

          <GenericInputDiv>
            <StyledInterfaceButton
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </StyledInterfaceButton>
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
