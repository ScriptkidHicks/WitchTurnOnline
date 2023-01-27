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

const StyledFlyoutTabContent = styled.div`
  background-color: ${(props) => (props.fileColor ? props.fileColor : "black")};
  width: 44vw;
  height: 100vh;
  position: absolute;
  display: ${(props) =>
    props.currentPosition === props.position ? "flex" : "none"};
  transition: ease all 0.6s;
`;

const StyledTabClicker = styled.div`
  background-color: ${(props) => (props.fileColor ? props.fileColor : "black")};
  position: fixed;
  left: ${(props) => (props.open ? "44vw" : "-7vw")};
  top: ${(props) => props.top}vh;
  width: 5vw;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: visible;
  transition: ease all 0.6s;
  border-radius: 0px 20px 30px 0px;
  border-width: 2px 2px 2px 0px;
  border-style: solid;
  border-color: ${(props) => (props.borderColor ? props.borderColor : "white")};
  box-shadow: ${(props) =>
    props.currentPosition === props.position
      ? "4px 4px 2px black"
      : "0px 0px 0px black"};
`;

const StyledTabLabel = styled.div`
  color: ${(props) => (props.fontColor ? props.fontColor : "white")};
  font-weight: bold;
  overflow-wrap: break-word;
`;

export {
  StyledCopyFlyout,
  StyledHiddenInfo,
  StyledTabbedFlyoutBody,
  StyledFlyoutTabContent,
  StyledTabClicker,
  StyledTabLabel,
};
