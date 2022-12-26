import { useState } from "react";
import BasicToggleButton from "../Components/Buttons/BasicToggleButton";
import { DefaultPageBody } from "../Components/StyledComponents/MainStyledComponents";

function LoginLandingPage () {
    const [temp, setTemp] = useState(false);

    return <DefaultPageBody>
        <BasicToggleButton variable={temp} setVariable={setTemp} backgroundColor={"White"} fontColor={"wheat"} text={"example"}></BasicToggleButton> 
    </DefaultPageBody>
}

export default LoginLandingPage;