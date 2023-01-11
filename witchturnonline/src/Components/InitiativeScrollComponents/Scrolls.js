import {
  StyledPictureSelectorRoll,
  StyledTTPictureOption,
} from "../StyledComponents/InitiativeStyles";

import { LeftRightButton } from "../Buttons/BasicButtons";

function PictureChooser(props) {
  return (
    <StyledPictureSelectorRoll>
      <LeftRightButton>Left</LeftRightButton>
      {props.pictures.map((picture, index) => {
        return (
          <StyledTTPictureOption
            src={picture}
            key={index}
            onClick={() => {
              props.selector(picture);
              props.toggleVisible(false);
            }}
          />
        );
      })}
      <LeftRightButton>Right</LeftRightButton>
    </StyledPictureSelectorRoll>
  );
}

export { PictureChooser };
