import { InitiativeRoll } from "../Components/InitiativeScrollComponents/InitiativeComponents";
import {
  DefaultPageBody,
  DefaultPageColumn,
} from "../Components/StyledComponents/MainStyledComponents";
import { CenterAlignedFlexPage } from "../Components/StyledComponents/PageBodies";

function InitiativePage(props) {
  const participants = [];

  return (
    <DefaultPageBody>
      <DefaultPageColumn flexGrow={2}></DefaultPageColumn>
      <DefaultPageColumn>
        <InitiativeRoll participants={participants}></InitiativeRoll>
      </DefaultPageColumn>
      <DefaultPageColumn flexGrow={2}></DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default InitiativePage;
