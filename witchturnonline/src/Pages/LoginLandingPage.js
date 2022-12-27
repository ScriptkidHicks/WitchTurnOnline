import { useState } from "react";
import { BasicIncrementButton } from "../Components/Buttons/BasicButtons";
import { DefaultPageBody } from "../Components/StyledComponents/MainStyledComponents";

function LoginLandingPage () {
    const [temp, setTemp] = useState(0);

    return <DefaultPageBody>
        <BasicIncrementButton limit={8} startingValue={3} variable={temp} setVariable={setTemp} hoverBackgroundColor={"pink"} ></BasicIncrementButton>
    </DefaultPageBody>
}

export default LoginLandingPage;