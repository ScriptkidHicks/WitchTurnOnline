import { useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  GenericInputDiv,
} from "../Components/StyledComponents/MainStyledComponents";

function LoginLandingPage() {
  const [temp, setTemp] = useState(0);

  return (
    <DefaultPageBody>
      <DefaultPageColumn flexGrow={2}>
        <GenericInputDiv>Start A New Room</GenericInputDiv>
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
