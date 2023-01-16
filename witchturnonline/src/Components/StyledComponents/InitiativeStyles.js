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

  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : DarkColorStyles.GreyPurpleBackground};
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
`;

const StyledTTPictureOption = styled(StyledTTPicture)`
  margin-right: 10px;
`;

const StyledTTPictureSelectorButton = styled(StyledTTPicture)`
  box-shadow: 2px 2px 2px black;
  transition: ease all 0.4s;
  :hover {
    box-shadow: 4px 4px 4px black;
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
  align-center;
  position: relative;
`;

const StyledLeftRightButton = styled.button`
  background-image: ${(props) => (props.image ? props.image : "none")};
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
  StyledButtonRow,
};
