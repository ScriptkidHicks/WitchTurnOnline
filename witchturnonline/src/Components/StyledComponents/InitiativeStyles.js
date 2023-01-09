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

const StyledInfoLabel = styled.label`
  color: white;
  font-weight: bold;
  margin: 5px;
`;

export {
  StyledTurnContainer,
  StyledTurnTaker,
  StyledTTContentcontainer,
  StyledTTPicture,
  StyledInfoLabel,
};