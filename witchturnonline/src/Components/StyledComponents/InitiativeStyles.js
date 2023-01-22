import styled from "styled-components";
import { DarkColorStyles } from "./ColorStyles";

const StyledTurnContainer = styled.div`
  width: 95%;
  height: 60vh;
  max-height: 1000px;

  overflow: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12px;

  border-radius: 20px;

  min-height: 300px;
  min-width: 300px;
  background-color: ${DarkColorStyles.DarkPurpleBackground};

  scrollbar-width: none;
  :webkit-scrollbar {
    display: none;
  }
`;

const StyledTurnTaker = styled.div`
  width: 95%;
  padding: 12px;
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
    height: 60px;
    width: 60px;
    margin: 10px 0px 10px 0px;
  }
`;

const StyledTTPictureSelectorButton = styled(StyledTTPicture)`
  box-shadow: 2px 2px 2px black;
  :hover {
    box-shadow: 4px 4px 4px black;
    height: 60px;
    width: 60px;
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
    font-size: 1.2em;
  }

  :active {
    border-radius: 50%;
    font-size: 0em;
  }
`;

const StyledInfoLabel = styled.label`
  color: white;
  font-weight: bold;
  margin: 5px;
`;

const StyledModalBackground = styled.div`
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
  StyledTurnContainer,
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
