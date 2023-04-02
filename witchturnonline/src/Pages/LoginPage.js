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

import bcrypt from "bcryptjs";

function LoginPage(props) {
  const navigate = useNavigate();
  // async function loginQuery(name) {
  //   console.log("querying the database");
  //   const ask = {
  //     Method: "GET",
  //     headers: { "Content-Type": "application/JSON" },
  //   };
  //   fetch("http://localhost:3002/subscribers", ask).then((response) => {
  //     if (response.status === 200) {
  //       response.json().then((repJson) => {
  //         console.log(repJson);
  //         let tmptoken = decodeToken(repJson["exToken"]);
  //         console.log(tmptoken);
  //         fetch("http://localhost:3002/subscribers/Verify", {
  //           Method: "GET",
  //           headers: {
  //             "Content-Type": "application/JSON",
  //             authorization: `Bearer ${repJson["exToken"]}`,
  //           },
  //         }).then((response) => {
  //           if (response.status == 200) {
  //             console.log("That's a valiid user");
  //             response.json().then((reperooni) => {
  //               console.log(reperooni);
  //             });
  //           } else {
  //             console.log("not valid");
  //           }
  //         });
  //       });
  //     }
  //   });
  // }

  async function createQuery() {
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const hashedPassword = bcrypt.hashSync("oingo", salt);
    console.log(hashedPassword);

    const newInfo = {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "content-type": "application/JSON",
        origin: "http://localhost:3000"
      },
      body: JSON.stringify({
        name: "tammas",
        hashedPassword: hashedPassword,
        email: "lololol",
      }),
    };

    fetch("http://localhost:3002/subscribers", newInfo).then((response) => {
      console.log(response);
    });
  }

  async function loginQuery() {
    const hashedPassword = bcrypt.hashSync("oingo");
    console.log(hashedPassword);
    console.log(hashedPassword);
    const ask = {
      method: "POST",
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name: "tammas",
        hashedPassword: "oingo",
      }),
    };

    fetch("http://localhost:3002/subscribers/login", ask).then((response) => {
      console.log(response);
      console.log(response.status);
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
                loginQuery();
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
