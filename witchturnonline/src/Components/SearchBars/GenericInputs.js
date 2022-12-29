import { StyleableLimitedInput } from "../StyledComponents/MainStyledComponents";

function LimitedInputCombo(props) {
  function onInputFunction(event) {
    props.setInputState(event.target.value);
    var content = event.target.value;
    console.log(content);
  }
  return (
    <StyleableLimitedInput
      /* I want the dev to be forced to chose a max length */
      maxLength={props.maxLength ? props.maxLength : 5}
      type={props.type ? props.type : "text"}
      minLength={props.minLength ? props.minLength : 0}
      placeholder={props.placeholder ? props.placeholder : ""}
      textAlignment={props.textAlignment ? props.textAlignment : "center"}
      onInput={(event) => {
        onInputFunction(event);
      }}
    ></StyleableLimitedInput>
  );
}

export { LimitedInputCombo };
