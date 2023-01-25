import styled from "styled-components";
import { DarkColorStyles } from "../StyledComponents/ColorStyles";
import { StyledInfoLabel } from "../StyledComponents/InitiativeStyles";

const StyledCopyFlyout = styled.div`
  background-color: ${DarkColorStyles.GreyPurpleForeground};
  padding: 0;
  border: 3px solid ${DarkColorStyles.LightPurpleForeground};

  border-radius: ${(props) =>
    props.left ? "10px 0px 0px 10px" : "0px 10px 10px 0px"};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  position: absolute;
  right: 0;
  top: 150px;
  transition: ease all 0.4s;

  @media screen and (max-width: 800px) {
    top: 20px;
  }
`;

const StyledHiddenInfo = styled(StyledInfoLabel)`
  transition: ease all 0.4s;
  font-size: ${(props) => (props.open ? "1em" : "0em")};
`;

const StyledTabbedFlyoutBody = styled.div`
  height: 100vh;
  width: 50vw;
  background-color: ${DarkColorStyles.DarkBorderGreen};
  position: fixed;
  left: ${(props) => (props.open ? "0" : "-51vw")};

  display: flex;
  flex-direction: column;

  transition: ease all 0.6s;

  @media screen and (max-width: 800px) {
    width: 100vw;
    left: ${(props) => (props.open ? "0" : "-100vw")};
    border: none;
  }
`;

export { StyledCopyFlyout, StyledHiddenInfo, StyledTabbedFlyoutBody };
