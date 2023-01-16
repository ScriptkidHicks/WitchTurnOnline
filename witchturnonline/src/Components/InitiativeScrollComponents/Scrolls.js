import {
  StyledPictureSelectorRoll,
  StyledTTPictureOption,
} from "../StyledComponents/InitiativeStyles";

import { LeftRightButton } from "../Buttons/BasicButtons";
import { useState } from "react";

import { RotatingSlice } from "../../Helpers/HelperFunctions";

function PictureChooser(props) {
  const [displayIndecies, setDisplayIndecies] = useState({
    start: 0,
    end: props.displaySize,
  });
  return (
    <StyledPictureSelectorRoll>
      <LeftRightButton
        displayIndecies={displayIndecies}
        setIndecies={setDisplayIndecies}
        variable={3}
        size={props.pictures.length}
      >
        Left
      </LeftRightButton>
      {RotatingSlice(
        props.pictures,
        displayIndecies.start,
        displayIndecies.end
      ).map((picture, index) => {
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
