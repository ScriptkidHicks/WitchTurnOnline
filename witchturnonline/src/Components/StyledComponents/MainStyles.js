import styled from "styled-components";
import { DarkColorStyles } from "./ColorStyles";
/* Main Page Body Components */

const DefaultPageBody = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${DarkColorStyles.DeepBackgroundPurple};
  color: ${DarkColorStyles.WhiteText};
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  border: 1px solid black;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-display: none;

  @media screen and (max-width: 800px) {
    flex-direction: ${(props) =>
      props.mobileDirection ? props.mobileDirection : "column-reverse"};
    justify-content: center;
    align-items: center;
`;

const DefaultPageColumn = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  flex-grow: ${(props) => (props.flexGrow ? props.flexGrow : "1")};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : "none")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "none"};
  color: ${(props) =>
    props.color ? props.color : DarkColorStyles["WhiteText"]};

  @media screen and (max-width: 800px) {
    min-width: 100%;
    max-width: none;
    min-height: 0px;
    justify-content: center;
  }
`;

/* Styled Labels and Titles */

const MainTitleLabel = styled.label`
  margin-top: 10vh;
  margin-right: 30px;
  padding: ${(props) =>
    props.padding ? props.padding : "20px 20px 20px 20px"};
  margin-bottom: 100px;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "15px"};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "4em")};
  color: white;

  @media screen and (max-width: 800px) {
    margin: 0px 0px 0px 0px;
  }
`;

/* Styled Input Boxes */

const GenericInputDiv = styled.div`
  background-color: rgba(
    ${(props) =>
      props.backgroundColor
        ? props.backgroundColor
        : DarkColorStyles.GreyPurpleForegroundRGB},
    ${(props) => (props.opacity ? props.opacity : `1`)}
  );
  padding: ${(props) => (props.padding ? props.padding : "5px")};
  margin: ${(props) => (props.margin ? props.margin : "20px")};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
  padding: 15px;
`;

/* Styled Generic Inputs */

const StyleableLimitedInput = styled.input`
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : "rgba(" +
        DarkColorStyles.inputLavendarRGB +
        ", " +
        (props.opacity ? props.opacity : "1") +
        ")"};
  text-align: ${(props) =>
    props.textAlignment ? props.textAlignment : "center"};
  color: ${(props) => (props.textColor ? props.textColor : "white")};
  padding: ${(props) => (props.padding ? props.padding : "5px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1em")};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : "1em"};

  border-radius: 8px;

  transition: ease all 0.4s;

  :focus {
    box-shadow: inset 1px 1px 1px black;
    outline: none;
  }
`;

/* Styled Generic Buttons */

const StyleableButton = styled.button`
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#d1d1d1"};
  width: ${(props) => (props.width ? props.width : "40px")};
  height: ${(props) => (props.height ? props.height : "40px")};
  border: ${(props) => (props.border ? props.border : "2px solid black")};
  color: ${(props) => (props.fontColor ? props.fontColor : "black")};
  box-shadow: ${(props) => (props.boxShadow ? props.boxShadow : "none")};
  transition: ${(props) => (props.transition ? props.transition : "none")};

  :hover {
    box-shadow: ${(props) =>
      props.hoverBoxShadow ? props.hoverBoxShadow : "none"};
    background-color: ${(props) =>
      props.hoverBackgroundColor
        ? props.hoverBackgroundColor
        : props.backgroundColor
        ? props.backgroundColor
        : "#d1d1d1"};
  }
`;

const StyledXButton = styled.button`
  background-color: ${(props) =>
    props.ButtonColor ? props.ButtonColor : DarkColorStyles.PurpleHighlight};
  color: white;
  height: ${(props) => (props.buttonSize ? props.buttonSize : 30)}px;
  width: ${(props) => (props.buttonSize ? props.buttonSize : 30)}px;
  border-radius: 40px;
  border: 2px solid;
  border-color: white ${DarkColorStyles.LightPurpleForeground}
    ${DarkColorStyles.LightPurpleForeground} white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  font-weight: bolder;
  font-size: 1em;

  box-shadow: 1px 1px 1px black;

  transition: ease all 0.4s;

  :hover {
    border-color: ${DarkColorStyles.LightPurpleForeground} white white
      ${DarkColorStyles.LightPurpleForeground};
    box-shadow: -1px -1px 1px black;
    height: ${(props) => (props.buttonSize ? props.buttonSize + 10 : 40)}px;
    width: ${(props) => (props.buttonSize ? props.buttonSize + 10 : 40)}px;
    font-size: 1.5em;
  }
`;

const StyledGenericButton = styled.button`
  background-color: ${(props) =>
    props.ButtonColor ? props.ButtonColor : DarkColorStyles.PurpleHighlight};
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  margin: 5px;
`;

const StyledMinorfunctionButton = styled.button`
  background-color: ${DarkColorStyles.LightPurpleForeground};
  color: ${DarkColorStyles.GreyPurpleForeground};
  border: 2px solid ${DarkColorStyles.GreyPurpleForeground};
  font-weight: bolder;
  font-size: 0.8em;
  padding: 2px;
  border-radius: 5px;
  transition: ease all 0.4s;

  :hover {
    background-color: ${DarkColorStyles.GreyPurpleForeground};
    border: 2px solid ${DarkColorStyles.LightPurpleForeground};
    border-radius: 7px;
    color: white;
    box-shadow: 2px 2px 3px black;
  }

  :active {
    box-shadow: none;
  }
`;

const StyledFormInformationRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: ${(props) =>
    props.justify ? props.justify : "space-between"};
  padding-bottom: 10px;
`;

const MarginText = styled.div`
  margin: ${(props) => props.margin};
`;

const StyledLabelText = styled.div`
  margin: 10px;
  padding: 0;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
`;

export {
  DefaultPageBody,
  DefaultPageColumn,
  StyleableButton,
  MainTitleLabel,
  GenericInputDiv,
  StyleableLimitedInput,
  StyledXButton,
  StyledGenericButton,
  StyledFormInformationRow,
  MarginText,
  StyledLabelText,
  StyledMinorfunctionButton,
};
