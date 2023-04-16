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
  top: 100px;
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

const StyledExpandingModal = styled.div`
  background-image: url(${(props) => (!props.open ? props.background : "")});
  background-size: cover;
  width: ${(props) => (props.open ? "45vw" : "50px")};
  height: ${(props) =>
    props.othersOpen ? "0px" : props.open ? "100vh" : "50px"};
  border-radius: ${(props) => (props.open ? "30px 0px 0px 30px" : "50%")};
  background-color: #224d3e;
  transition: ease-in-out 0.5s;
  z-index: ${(props) => (props.open ? "90" : "80")};

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  margin-bottom: ${(props) =>
    props.open || props.othersOpen ? "0px" : "20px"};

  margin-right: ${(props) => (props.open || props.othersOpen ? "0px" : "20px")};

  @media screen and (max-width: 600px) {
    width: ${(props) =>
      props.open ? "100vw" : props.slideOpen ? "50px" : "0px"};
    margin-right: 0px;
  }
`;

const StyledCloseExpandingModal = styled.div`
  background-color: ${DarkColorStyles.DarkBackgroundGreen};
  border: 2px ${DarkColorStyles.DarkBackgroundGreen} solid;
  font-weight: bolder;
  color: white;
  position: absolute;
  left: 20px;
  top: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: default;
  transition: ease all 0.3s;

  :hover {
    border-radius: 10px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
    border: 2px ${DarkColorStyles.DarkBorderGreen} solid;
    background-color: ${DarkColorStyles.DarkBackgroundGreen};
    color: ${DarkColorStyles.DarkTextGreen};
  }
`;

const StyledPremadeMonstersScroll = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  height: 80vh;
  border-radius: 20px;
  padding: 10px;
  overflow-y: scroll;
  margin-bottom: 20px;
  background-image: linear-gradient(
    ${DarkColorStyles.LightBackgroundGreen},
    ${DarkColorStyles.DarkTextGreen}
  );
  box-shadow: inset 4px 4px 2px rgba(0, 0, 0, 0.6);
`;

const StyledPremadeMonster = styled.div`
  background-image: linear-gradient(
    ${DarkColorStyles.LighterGreyPurpleBackground},
    ${DarkColorStyles.DarkPurpleBackground}
  );
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space evenly;
  width: 90%;
  border-radius: 20px;
  margin-bottom: 10px;
  transition: ease all 0.2s;
  padding: 10px 5px;
  box-shadow: 0px 4px 4px black;

  :active {
    box-shadow: 1px 1px 1px black;
  }
`;

const StyledOpacityHiderDiv = styled.div`
  transition: ease all 0.5s;
  width: ${(props) => (props.open ? "100%" : "0%")};
  height: ${(props) => (props.open ? "" : "0%")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.open ? "1" : "0")};
`;

const StyledModalHiderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  z-index: 90;
  bottom: 0;
  transition: ease all 0.5s;

  height: ${(props) => (props.childOpen ? "100vh" : "250px")};

  @media screen and (max-width: 600px) {
    background-color: rgba(255, 255, 255, 0.4);
    overflow: hidden;
    height: ${(props) =>
      props.slideOpen ? (props.childOpen ? "100vh" : "200px") : "50px"};
    width: ${(props) => (props.childOpen ? "100vw" : "50px")};
    border-radius: 30px;
    right: ${(props) => (props.childOpen ? "0" : "20px")};
    bottom: ${(props) => (props.childOpen ? "0" : "20px")};
  }
`;

export {
  StyledCopyFlyout,
  StyledHiddenInfo,
  StyledTabbedFlyoutBody,
  StyledFlyoutTabContent,
  StyledTabClicker,
  StyledTabLabel,
  StyledExpandingModal,
  StyledCloseExpandingModal,
  StyledPremadeMonster,
  StyledPremadeMonstersScroll,
  StyledOpacityHiderDiv,
  StyledModalHiderDiv,
};
