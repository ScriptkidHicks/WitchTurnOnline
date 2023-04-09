import {
  DefaultPageBody,
  DefaultPageColumn,
  GenericInputDiv,
  StyledInputRow,
  StyledLabelText,
} from "../Components/StyledComponents/MainStyles";
import Cookie from "js-cookie";

import Church from "../Assets/BackgroundAssets/Church.png";
import { StyledInterfaceButton } from "../Components/StyledComponents/InitiativeStyles";
import { useNavigate } from "react-router-dom";
import { LimitedInputCombo } from "../Components/SearchBars/GenericInputs";
import { useState } from "react";
import {
  checkLoginState,
  emailvalidate,
  validateString,
} from "../Helpers/HelperFunctions";
import { useEffect } from "react";

function LoginPage(props) {
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const [hasAccount, sethasAccount] = useState(true);
  const [email, setEmail] = useState();

  useEffect(() => {
    checkLoginState(
      () => {
        navigate("/");
      },
      () => {},
      () => {},
      () => {
        navigate("/");
      },
      props.setPlayerLoggedIn
    );
  }, [navigate, props.setPlayerLoggedIn]);

  function infoValidate() {
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

  function createAccount() {
    if (!emailvalidate(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!infoValidate()) {
      return;
    }

    createQuery();
  }

  function login() {
    if (!infoValidate()) {
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
        origin: process.env.REACT_APP_QUERY_SOURCE,
      },
      body: JSON.stringify({
        name: props.playerName,
        password: password,
        email: email,
      }),
    };

    fetch(process.env.REACT_APP_SUBSCRIBERS_GET, newInfo).then((response) => {
      if (response.status === 409) {
        alert("An account with that name or email already exists.");
        return;
      } else if (response.status >= 500) {
        alert(
          "There appears to be a problem with the server. Please try again later"
        );
      } else if (response.status === 201) {
        response.json().then((jwtPackage) => {
          // current max tollerance  for login is 30 days
          Cookie.set("witchTurnUserLogin", jwtPackage.jwt, { expires: 30 });
          navigate("/");
        });
      }
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

    fetch(process.env.REACT_APP_SUBSCRIBERS_ENDPOINT, loginAsk).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((jwtPackage) => {
            // current max tollerance  for login is 30 days
            Cookie.set("witchTurnUserLogin", jwtPackage.jwt, { expires: 30 });
            navigate("/");
          });
        } else if (response.status === 401) {
          alert("Name or Password not Valid");
        } else if (response.status > 500) {
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
            <StyledInputRow>
              <StyledLabelText>Email:</StyledLabelText>
              <LimitedInputCombo
                type={"email"}
                maxLength={100}
                letterSpacing={"0em"}
                inputState={email}
                setInputState={setEmail}
              ></LimitedInputCombo>
            </StyledInputRow>
            <StyledInputRow>
              <StyledLabelText>User Name:</StyledLabelText>
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
                maxLength={40}
                letterSpacing={"0em"}
                inputState={password}
                setInputState={setPassword}
              ></LimitedInputCombo>
            </StyledInputRow>
            <StyledInputRow>
              <StyledInterfaceButton
                onClick={() => {
                  createAccount();
                }}
              >
                Create Account
              </StyledInterfaceButton>
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
