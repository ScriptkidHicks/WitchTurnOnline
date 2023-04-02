import {
  DefaultPageBody,
  DefaultPageColumn,
  GenericInputDiv,
  StyledInputRow,
  StyledLabelText,
} from "../Components/StyledComponents/MainStyles";
import Cookie from "js-cookie";
import { decodeToken } from "react-jwt";

import Church from "../Assets/BackgroundAssets/Church.png";
import { StyledInterfaceButton } from "../Components/StyledComponents/InitiativeStyles";
import { useNavigate } from "react-router-dom";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";
import { useState } from "react";
import { validateString } from "../Helpers/HelperFunctions";

function LoginPage(props) {
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [hasAccount, sethasAccount] = useState(true);

  function LoginValidate() {
    if (!props.playerName) {
      alert("No player name entered");
      return;
    }
    if (!password) {
      alert("No password entered");
      return;
    }

    let nameResponse = validateString(
      props.playerName,
      5,
      50,
      [" "],
      false,
      false
    );

    if (nameResponse !== "") {
      nameResponse = "Player name in error\n" + nameResponse;
    }

    let passwordResponse = validateString(password, 5, 40, [" "], true, true);
    if (passwordResponse !== "") {
      passwordResponse = "Password in error\n" + passwordResponse;
    }

    if (nameResponse !== "" || passwordResponse !== "") {
      alert(nameResponse + "\n" + passwordResponse);
      return false;
    }
    return true;
  }

  function createAccount() {}

  function login() {
    if (!LoginValidate()) {
      return;
    }

    loginQuery();
  }

  async function createQuery() {
    const newInfo = {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "content-type": "application/JSON",
        origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        name: "tammas",
        password: password,
        email: "lololol",
      }),
    };

    fetch("http://localhost:3002/subscribers", newInfo).then((response) => {
      console.log(response);
    });
  }

  async function loginQuery() {
    const loginAsk = {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name: props.playerName,
        password: password,
      }),
    };

    fetch("http://localhost:3002/subscribers/login", loginAsk).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((jwtPackage) => {
            // current max tollerance  for login is 30 days
            Cookie.set("witchTurnUserLogin", jwtPackage.jwt, { expires: 30 });
            navigate("/");
          });
        } else if (response.status === 401) {
          alert("Name or Password not Valid");
        } else if (response.status < 500) {
          alert(
            "There appears to be an error with our servers. Please try again later"
          );
        }
      }
    );
  }

  return (
    <DefaultPageBody backgroundImage={Church}>
      <DefaultPageColumn>
        {hasAccount && (
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
              <StyledLabelText>Password:</StyledLabelText>
              <LimitedInputCombo
                type={"password"}
                maxLength={40}
                letterSpacing={"0em"}
                inputState={password}
                setInputState={setPassword}
              ></LimitedInputCombo>
            </StyledInputRow>
            <StyledInputRow>
              <StyledInterfaceButton
                onClick={() => {
                  login();
                }}
              >
                Login
              </StyledInterfaceButton>
              <StyledInterfaceButton
                onClick={() => {
                  sethasAccount(false);
                }}
              >
                Not A Member?
              </StyledInterfaceButton>
            </StyledInputRow>
          </GenericInputDiv>
        )}
        {!hasAccount && (
          <GenericInputDiv>
            <StyledInputRow></StyledInputRow>
            <StyledInputRow></StyledInputRow>
            <StyledInputRow></StyledInputRow>
            <StyledInputRow>
              <StyledInterfaceButton>Create Account</StyledInterfaceButton>
              <StyledInterfaceButton
                onClick={() => {
                  sethasAccount(true);
                }}
              >
                Already A Member?
              </StyledInterfaceButton>
            </StyledInputRow>
          </GenericInputDiv>
        )}
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default LoginPage;
