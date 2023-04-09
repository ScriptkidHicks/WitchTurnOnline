import {
  StyledCheckHousing,
  StlyedCheckDot,
} from "../StyledComponents/MainStyles";

function GenericToggle(props) {
  return (
    <StyledCheckHousing onClick={() => props.setActive(!props.active)}>
      <StlyedCheckDot active={props.active} />
    </StyledCheckHousing>
  );
}

export { GenericToggle };
