import { StyleableLimitedInput } from "../StyledComponents/MainStyledComponents";

function LimitedInputCombo(props) {
  function onInputFunction(event) {
    props.setInputState(event.target.value);
  }
  return (
    <StyleableLimitedInput
      /* I want the dev to be forced to chose a max length */
      maxLength={props.maxLength ? props.maxLength : 5}
      type={props.type ? props.type : "text"}
      minLength={props.minLength ? props.minLength : 0}
      placeholder={props.placeholder ? props.placeholder : ""}
      textAlignment={props.textAlignment}
      backgroundColor={props.backgroundColor}
      letterSpacing={props.letterSpacing}
      onInput={
        props.onInputFunction
          ? (event) => props.onInputFunction(event)
          : (event) => onInputFunction(event)
      }
    ></StyleableLimitedInput>
  );
}

export { LimitedInputCombo };
