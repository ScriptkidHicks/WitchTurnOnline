import styled from "styled-components";

/* Style Color Components */

const ColorStyles = {
  DeepBackgroundPurple: "#0B0016",
  GreyPurpleBackground: "#3C1F66",
  GreyPurpleBackgroundRGB: "60, 31, 102",
  DarkPurpleBackground: "#2B0066",
  GreyPurpleForeground: "#4B00B3",
  GreyPurpleForegroundRGB: "75, 0, 179",
  LightPurpleForeground: "#8A46EA",
  PurpleHighlight: "#6000E6",
  WhiteText: "#FFFFFF",
};

/* Main Page Body Components */

const DefaultPageBody = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${ColorStyles["DeepBackgroundPurple"]};
  color: ${ColorStyles["WhiteText"]}
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  border: 1px solid black;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-display: none;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const DefaultPageColumn = styled.div`
  border: 1px solid ${ColorStyles["GreyPurpleForeground"]};
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
  color: ${(props) => (props.color ? props.color : ColorStyles["WhiteText"])};

  @media screen and (max-width: 800px) {
    min-width: 100%;
    max-width: none;
  }
`;

/* Styled Labels and Titles */

const MainTitleLabel = styled.label`
  background-color: rgba(
    ${(props) =>
      props.backgroundColor
        ? props.backgroundColor
        : ColorStyles.GreyPurpleForegroundRGB},
    ${(props) => (props.opacity ? props.opacity : `1`)}
  );
  padding: ${(props) =>
    props.padding ? props.padding : "20px 20px 20px 20px"};
  margin-bottom: 100px;
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "15px"};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2em")};
  color: white;
`;

/* Styled Input Boxes */

const GenericInputDiv = styled.div`
  background-color: rgba(
    ${(props) =>
      props.backgroundColor
        ? props.backgroundColor
        : ColorStyles.GreyPurpleForegroundRGB},
    ${(props) => (props.opacity ? props.opacity : `1`)}
  );
  padding: ${(props) => (props.padding ? props.padding : "5px")};
  margin: ${(props) => (props.margin ? props.margin : "20px")};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

/* Styled Generic Inputs */

const StyleableLimitedInput = styled.input`
  background-color: white;
  text-align: ${(props) => props.textAlignment};
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

export {
  DefaultPageBody,
  DefaultPageColumn,
  StyleableButton,
  MainTitleLabel,
  GenericInputDiv,
  StyleableLimitedInput,
};
