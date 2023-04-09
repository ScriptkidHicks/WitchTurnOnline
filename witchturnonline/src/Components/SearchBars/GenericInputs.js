import { Debounce } from "../../Helpers/HelperFunctions";
import {
  StyleableLimitedInput,
  StyledSearchListInput,
} from "../StyledComponents/MainStyles";

function LimitedInputCombo(props) {
  function onInputFunction(event) {
    let restrictedVar = event.target.value;
    if (props.numbersOnly) {
      restrictedVar = restrictedVar.replace(/[^0-9]/g, "");
    }
    event.target.value = restrictedVar;
    props.setInputState(restrictedVar);
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
      onClick={(event) => {
        event.stopPropagation();
      }}
      width={String(props.maxLength * 25) + "px"}
      onInput={(event) => {
        onInputFunction(event);
      }}
    ></StyleableLimitedInput>
  );
}

function SortedListSearcher(props) {
  const updateContents = Debounce((event) => {
    let tempArray = props.baseList.filter((item) => {
      return item.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    props.setFilteredList(tempArray);
  });
  return (
    <StyledSearchListInput
      onInput={(event) => updateContents(event)}
      placeholder={props.placeholder}
    ></StyledSearchListInput>
  );
}

export { LimitedInputCombo, SortedListSearcher };
