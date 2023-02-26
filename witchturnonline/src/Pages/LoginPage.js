import {
  DefaultPageBody,
  DefaultPageColumn,
  GenericInputDiv,
  StyledInputRow,
} from "../Components/StyledComponents/MainStyles";

import Church from "../Assets/BackgroundAssets/Church.png";
import { StyledInterfaceButton } from "../Components/StyledComponents/InitiativeStyles";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

function LoginPage(props) {
  const CLID = process.env.REACT_APP_CLIENt_ID;
  const navigate = useNavigate();
  return (
    <DefaultPageBody backgroundImage={Church}>
      <DefaultPageColumn>
        <GenericInputDiv>
          <StyledInputRow>
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
