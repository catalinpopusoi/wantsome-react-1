import { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variation?: string;
}

const StyledInput = styled.input<InputProps>`
    padding: 0 16px;
    border: none;
    color: ${props => props.theme.colors.primary[2]};
    background-color: ${props => props.theme.colors.secondary[0]};

    &::placeholder {
        color: ${props => props.theme.colors.primary[2]};
    }

    &:not([type="checkbox"]) {
        height: ${props => props.variation === 'small' ? '40px' : '80px' };
    }
`;

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => (
    <StyledInput ref={ref} {...props} />
))

export default Input;
