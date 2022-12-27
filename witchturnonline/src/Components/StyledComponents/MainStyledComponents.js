import styled from "styled-components";

/* Main Page Body Components */

const DefaultPageBody = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
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
  border: 1px solid black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "center"};
  flex-grow: ${(props) => (props.flexGrow ? props.flexGrow : "1")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "none"};
  color: ${(props) => (props.color ? props.color : "black")};

  @media screen and (max-width: 800px) {
    min-width: 100vw;
  }
`;

/* Styled Generics */

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

export { DefaultPageBody, DefaultPageColumn, StyleableButton };
