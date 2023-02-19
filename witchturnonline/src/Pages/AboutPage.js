import { DarkColorStyles } from "../Components/StyledComponents/ColorStyles";
import {
  DefaultPageBody,
  DefaultPageColumn,
  MainTitleLabel,
  StyledInfoDiv,
  StyledTextGradient,
} from "../Components/StyledComponents/MainStyles";

function AboutPage() {
  return (
    <DefaultPageBody>
      <DefaultPageColumn>
        <MainTitleLabel>About</MainTitleLabel>
        <StyledInfoDiv>
          <StyledTextGradient
            colorA={DarkColorStyles.DarkBackgroundGreen}
            colorB={DarkColorStyles.HighlightGreen}
            fontSize={"16px"}
          >
            {"\t"}Witch Turn is a tool for GMs and players to track initiative,
            make quick rolls, track reactions, and monitor player capabilities,
            all in a single shared interface. {"\n\n\t"}To start a room, simply
            enter your name into the name input box, and hit the button labeled
            "Generate Room". This will create a new room, and log you into it.
            There will be a small flyout at the top right corner with a room
            code which you can give to your players. They can use this code from
            the main page to log into the shared room.{"\n\n\t"} From here
            players can create custom characters to add to the initiative roll.
            This is all players can currently do, but the GM has a few extra
            tools.{"\n\n\t"} The first is a generic monster selector. By
            clicking the image of the kobold in the bottom right corner you can
            open a flyout with a list of generic monsters. By clicking on any of
            them you can add them to the initiative order. Doing so will
            generate their initiative randomly. You can also set those monsters
            to be hidden, or visible to the players.
          </StyledTextGradient>
        </StyledInfoDiv>
      </DefaultPageColumn>
    </DefaultPageBody>
  );
}

export default AboutPage;
