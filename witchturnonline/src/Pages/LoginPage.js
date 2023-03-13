import {
  DefaultPageBody,
  DefaultPageColumn,
  GenericInputDiv,
  StyleableLimitedInput,
  StyledInputRow,
  StyledLabelText,
} from "../Components/StyledComponents/MainStyles";

import Church from "../Assets/BackgroundAssets/Church.png";
import { StyledInterfaceButton } from "../Components/StyledComponents/InitiativeStyles";
import { useNavigate } from "react-router-dom";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";

function LoginPage(props) {
  const navigate = useNavigate();

  async function loginQuery(name) {
    console.log("querying the database");
    const ask = {
      Method: "GET",
      headers: { "Content-Type": "application/JSON" },
    };
    fetch("http://localhost:3002/subscribers", ask).then((response) => {
      console.log(response);
    });
  }
  return (
    <DefaultPageBody backgroundImage={Church}>
      <DefaultPageColumn>
        <GenericInputDiv>
          <StyledInputRow>
            <StyledLabelText>Name:</StyledLabelText>
            <LimitedInputCombo
              maxLength={40}
              letterSpacing={"0em"}
              inputState={props.playerName}
              setInputState={props.setPlayerName}
            ></LimitedInputCombo>
          </StyledInputRow>
          <StyledInputRow>
            <StyledInterfaceButton
              onClick={() => {
                loginQuery("Tammas");
              }}
            >
              Login
            </StyledInterfaceButton>
            <StyledInterfaceButton
              onClick={() => {
                navigate("/");
              }}
            >
              Go Back
            </StyledInterfaceButton>
          </StyledInputRow>
        </GenericInputDiv>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default LoginPage;
