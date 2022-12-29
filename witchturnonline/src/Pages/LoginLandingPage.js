import { useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  GenericInputDiv,
} from "../Components/StyledComponents/MainStyledComponents";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";

function LoginLandingPage() {
  const [inputState, setInputState] = useState("");
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
        <GenericInputDiv>Join A Room</GenericInputDiv>
      </DefaultPageColumn>
      <DefaultPageColumn justifyContent={"flex-start"}>
        <MainTitleLabel flexGrow={1} maxWidth={"40%"} opacity={"0.5"}>
          Welcome to Witch Turn
        </MainTitleLabel>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default LoginLandingPage;
