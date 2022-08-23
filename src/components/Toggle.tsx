import styled from "styled-components";
import Input from "./Input";

interface ToggleProps {
    id: string;
    handleCheck: (checked: boolean) => void;
    checked?: boolean;
}

const StyledToggle = styled.div`
    display: inline-block;

    input {
        display: none;

        &:checked + label::after {
            left: 29px;
        }
    }

    label {
        width: 48px;
        height: 24px;
        background-color: white;
        border-radius: 12px;
        display: inline-block;
        cursor: pointer;
        position: relative;

        &::after {
            content: '';
            height: 14px;
            width: 14px;
            display: block;
            border-radius: 50%;
            background-color: #5964E0;
            position: absolute;
            top: ${props => props.theme.spacings.tiny};
            left: ${props => props.theme.spacings.tiny};
            transition: all .1s linear;
        }
    }
`;

export default function Toggle({ id, checked = false, handleCheck }: ToggleProps) {
    const handleChange = (e: any) => {
        handleCheck(e.target.checked);
    }

    return (
        <StyledToggle>
            <Input type="checkbox" id={id} onChange={handleChange} checked={checked} />
            <label htmlFor={id}></label>
        </StyledToggle>
    )
}