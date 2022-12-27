import { useState } from "react";
import {
  DefaultPageBody,
  DefaultPageColumn,
} from "../Components/StyledComponents/MainStyledComponents";

function LoginLandingPage() {
  const [temp, setTemp] = useState(0);

  return (
    <DefaultPageBody>
      <DefaultPageColumn>A</DefaultPageColumn>
      <DefaultPageColumn flexGrow={"3"}>B</DefaultPageColumn>
      <DefaultPageColumn>C</DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default LoginLandingPage;
