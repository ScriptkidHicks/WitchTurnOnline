import { StyleableButton } from "../StyledComponents/MainStyledComponents";

function BasicButton(props) {
    return (
        <StyleableButton
            onClick={() => props.onClickFunction()}
            backgroundColor={props.backgroundColor}
            hoverBackgroundColor={props.hoverBackgroundColor}
            width={props.width}
            height={props.height}
            border={props.border}
            fontColor={props.fontColor}
            boxShadow={props.boxShadow}
            hoverBoxShadow={props.hoverBoxShadow}
            >
                {props.text}
        </StyleableButton>);
};

function BasicIncrementButton(props) {
    return <BasicButton onClickFunction={()=> {
        console.log(props.hoverBackgroundColor)
        if (props.limit && props.startingValue) {
            if (props.variable >= props.limit){
                props.setVariable(props.startingValue)
            } else {
                props.setVariable(props.variable + 1)
            }
        } else {
            props.setVariable(props.variable + 1)
        }
    }} 
        backgroundColor={props.backgroundColor}
        hoverBackgroundColor={props.hoverBackgroundColor}
        width={props.width}
        height={props.height}
        border={props.border}
        fontColor={props.fontColor}
        boxShadow={props.boxShadow}
        hoverBoxShadow={props.hoverBoxShadow}
        />
};

function BasicDecrementButton(props) {
    return <BasicButton onClickFunction={()=> {
        if (props.limit && props.startingValue) {
            if (props.variable <= props.limit){
                props.setVariable(props.startingValue)
            } else {
                props.setVariable(props.variable - 1)
            }
        } else {
            props.setVariable(props.variable - 1)
        }
    }} 
        backgroundColor={props.backgroundColor}
        hoverBackgroundColor={props.hoverBackgroundColor}
        width={props.width}
        height={props.height}
        border={props.border}
        fontColor={props.fontColor}
        boxShadow={props.boxShadow}
        hoverBoxShadow={props.hoverBoxShadow}
        />
};

function BasicToggleButton(props) {
    return <BasicButton onClickFunction={() => {
        props.setVariable(!props.variable)
    }} 
        backgroundColor={props.backgroundColor}
        hoverBackgroundColor={props.hoverBackgroundColor}
        width={props.width}
        height={props.height}
        border={props.border}
        fontColor={props.fontColor}
        boxShadow={props.boxShadow}
        hoverBoxShadow={props.hoverBoxShadow}
        />
};

function BasicResetButton(props) {
    return <BasicButton onClickFunction={
        () => {
            props.setVariable(props.baseState)
        }
    }
        backgroundColor={props.backgroundColor}
        hoverBackgroundColor={props.hoverBackgroundColor}
        width={props.width}
        height={props.height}
        border={props.border}
        fontColor={props.fontColor}
        boxShadow={props.boxShadow}
        hoverBoxShadow={props.hoverBoxShadow}
    />
}

export {BasicButton, BasicIncrementButton, BasicDecrementButton, BasicToggleButton, BasicResetButton}