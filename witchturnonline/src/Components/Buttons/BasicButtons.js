import { StyledLeftRightButton } from "../StyledComponents/InitiativeStyles";
import {
  StyleableButton,
  StyledXButton,
  StyledBottomHamburgerDiv,
  StyledHamburgerDivContainer,
  StyledMiddleHamburgerDiv,
  StyledTopHamburgerDiv,
} from "../StyledComponents/MainStyles";

function BasicButton(props) {
  return (
    <StyleableButton
      onClick={() => props.onClickFunction()}
      backgroundColor={props.backgroundColor}
      hoverBackgroundColor={props.hoverBackgroundColor}
      width={props.width}
      height={props.height}
      border={props.border}
      fontColor={props.fontColor}
      boxShadow={props.boxShadow}
      hoverBoxShadow={props.hoverBoxShadow}
    >
      {props.text}
    </StyleableButton>
  );
}

function BasicIncrementButton(props) {
  return (
    <BasicButton
      onClickFunction={() => {
        if (props.limit && props.startingValue) {
          if (props.variable >= props.limit) {
            props.setVariable(props.startingValue);
          } else {
            props.setVariable(props.variable + 1);
          }
        } else {
          props.setVariable(props.variable + 1);
        }
      }}
      backgroundColor={props.backgroundColor}
      hoverBackgroundColor={props.hoverBackgroundColor}
      width={props.width}
      height={props.height}
      border={props.border}
      fontColor={props.fontColor}
      boxShadow={props.boxShadow}
      hoverBoxShadow={props.hoverBoxShadow}
    />
  );
}

function BasicDecrementButton(props) {
  return (
    <BasicButton
      onClickFunction={() => {
        if (props.limit && props.startingValue) {
          if (props.variable <= props.limit) {
            props.setVariable(props.startingValue);
          } else {
            props.setVariable(props.variable - 1);
          }
        } else {
          props.setVariable(props.variable - 1);
        }
      }}
      backgroundColor={props.backgroundColor}
      hoverBackgroundColor={props.hoverBackgroundColor}
      width={props.width}
      height={props.height}
      border={props.border}
      fontColor={props.fontColor}
      boxShadow={props.boxShadow}
      hoverBoxShadow={props.hoverBoxShadow}
    />
  );
}

function BasicToggleButton(props) {
  return (
    <BasicButton
      onClickFunction={() => {
        props.setVariable(!props.variable);
      }}
      backgroundColor={props.backgroundColor}
      hoverBackgroundColor={props.hoverBackgroundColor}
      width={props.width}
      height={props.height}
      border={props.border}
      fontColor={props.fontColor}
      boxShadow={props.boxShadow}
      hoverBoxShadow={props.hoverBoxShadow}
    />
  );
}

function BasicResetButton(props) {
  return (
    <BasicButton
      onClickFunction={() => {
        props.setVariable(props.baseState);
      }}
      backgroundColor={props.backgroundColor}
      hoverBackgroundColor={props.hoverBackgroundColor}
      width={props.width}
      height={props.height}
      border={props.border}
      fontColor={props.fontColor}
      boxShadow={props.boxShadow}
      hoverBoxShadow={props.hoverBoxShadow}
    />
  );
}

function BasicXCloseButton(props) {
  return (
    <StyledXButton onClick={() => props.SetVisible(false)}>X</StyledXButton>
  );
}

function LeftRightButton(props) {
  return (
    <StyledLeftRightButton
      variable={props.variable}
      onClick={() => {
        let startIndex = props.displayIndecies.start;
        let endIndex = props.displayIndecies.end;

        startIndex += props.variable;
        endIndex += props.variable;

        if (startIndex < 0) {
          startIndex = props.size + startIndex;
        }

        if (endIndex < 0) {
          endIndex = props.size + endIndex;
        }

        if (startIndex >= props.size) {
          startIndex = startIndex - props.size;
        }

        if (endIndex > props.size) {
          endIndex = endIndex - props.size;
        }
        props.setIndecies({ start: startIndex, end: endIndex });
      }}
    >
      {props.children}
    </StyledLeftRightButton>
  );
}

function HamburgerBarButton(props) {
  return (
    <StyledHamburgerDivContainer open={props.open} onClick={props.invert}>
      <StyledTopHamburgerDiv open={props.open}></StyledTopHamburgerDiv>
      <StyledMiddleHamburgerDiv open={props.open}></StyledMiddleHamburgerDiv>
      <StyledBottomHamburgerDiv open={props.open}></StyledBottomHamburgerDiv>
    </StyledHamburgerDivContainer>
  );
}

export {
  BasicButton,
  BasicIncrementButton,
  BasicDecrementButton,
  BasicToggleButton,
  BasicResetButton,
  BasicXCloseButton,
  LeftRightButton,
  HamburgerBarButton,
};
