import styled from "styled-components";
import { DarkColorStyles } from "./ColorStyles";

const StyledTurnContainerWrapper = styled.div`
  width: 95%;
  height: 60vh;
  max-height: 1000px;

  overflow: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  border-radius: 20px;
  padding: 0px 12px;
  z-index: 0;

  min-height: 300px;
  min-width: 300px;
  background-color: ${DarkColorStyles.DarkPurpleBackground};

  scrollbar-width: none;
  :webkit-scrollbar {
    display: none;
  }

  :after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to top,
      ${DarkColorStyles.DarkPurpleBackgroundRGBA},
      ${DarkColorStyles.DarkPurpleBackgroundInvisibleRGBA} 90%
    );
    width: 100%;
    height: 6em;
  }

  :before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to top,
      ${DarkColorStyles.DarkPurpleBackgroundInvisibleRGBA},
      ${DarkColorStyles.DarkPurpleBackgroundRGBA} 90%
    );
    width: 100%;
    height: 1.4em;
  }

  @media screen and (max-width: 800px) {
    margin-top: 80px;
  }
`;

const StyledTurncontainer = styled.div`
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTurnTaker = styled.div`
  width: 95%;
  padding: 12px;
  margin-top: ${(props) => (props.isFirst ? "15px" : "0px")};
  margin-bottom: 20px;

  box-shadow: 0px 10px 10px ${DarkColorStyles.PurpleBoxShadow};
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-image: linear-gradient(
    ${(props) =>
      props.isFirst
        ? `${DarkColorStyles.LightBackgroundGreen}, ${DarkColorStyles.DarkTextGreen}`
        : `${DarkColorStyles.GreyPurpleForeground}, ${DarkColorStyles.GreyPurpleBackground}`}
  );
`;

const StyledTTContentcontainer = styled.div`
  background-color: none;
  display: flex;
  flex-direction: column;
  width: 25%;
  align-items: ${(props) => (props.align ? props.align : "center")};
  justify-content: space between;
  margin: 0;
`;

const StyledTTPicture = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  transition: ease all 0.4s;
`;

const StyledTTPictureOption = styled(StyledTTPicture)`
  margin: 10px;

  :hover {
    box-shadow: 4px 4px 4px black;
  }
`;

const StyledTTPictureSelectorButton = styled(StyledTTPicture)`
  box-shadow: 2px 2px 2px black;
  :hover {
    box-shadow: 4px 4px 4px black;
  }
`;

const StyledTurnandAddButton = styled.button`
  color: white;
  font-weight: bold;
  border: 4px ${DarkColorStyles.DarkBackgroundGreen} solid;
  padding: 10px;
  font-size: 1em;
  border-radius: 10px;
  background-color: ${DarkColorStyles.DarkBorderGreen};
  transition: ease all 0.4s;
  margin: 10px;

  :hover {
    box-shadow: 3px 3px 3px ${DarkColorStyles.PurpleBoxShadow};
    border: 4px ${DarkColorStyles.DarkBorderGreen} solid;
    background-color: ${DarkColorStyles.DarkBackgroundGreen};
    color: ${DarkColorStyles.DarkTextGreen};
  }

  :active {
    border-radius: 20px;
  }

  ${(props) =>
    props.desktopOnly
      ? "@media screen and (max-width: 800px) { display: none }"
      : ""}
  ${(props) =>
    props.mobileOnly
      ? "@media screen and (min-width: 800px) { display: none }"
      : ""}
`;

const StyledInfoLabel = styled.label`
  color: white;
  font-weight: bold;
  margin: 5px;
`;

const StyledModalBackground = styled.div`
  z-index: 3;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const StyledModalInterfaceDiv = styled.div`
  background-color: ${DarkColorStyles.GreyPurpleForeground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-width: max(30vw, 300px);
  border-radius: 20px;
  box-shadow: -5px 5px 8px rgba(0, 0, 0, 0.7);
`;

const StyledPictureSelectorRoll = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledLeftRightButton = styled.button`
  background-color: ${DarkColorStyles.DarkBackgroundGreen};
  color: white;
  font-weight: 900;
  font-size: 1em;
  width: 40px;
  height: 40px;
  border: 3px solid ${DarkColorStyles.DarkBorderGreen};
  transition: ease all 0.3s;

  border-radius: ${(props) =>
    props.variable > 0 ? "20px 10px 10px 20px" : "10px 20px 20px 10px"};

  :hover {
    border: 3px solid ${DarkColorStyles.DarkBackgroundGreen};
    background-color: ${DarkColorStyles.DarkBorderGreen};
  }
`;

const StyledButtonRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  margin: 20px;
`;

export {
  StyledTurnContainerWrapper,
  StyledTurncontainer,
  StyledTurnTaker,
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledInfoLabel,
  StyledModalBackground,
  StyledModalInterfaceDiv,
  StyledTTPictureSelectorButton,
  StyledPictureSelectorRoll,
  StyledTTPictureOption,
  StyledLeftRightButton,
  StyledTurnandAddButton,
  StyledButtonRow,
};
