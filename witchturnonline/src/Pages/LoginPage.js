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

import { decodeToken } from "react-jwt";

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
