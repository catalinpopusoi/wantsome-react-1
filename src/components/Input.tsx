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

    &[type="checkbox"] {
        appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 6px;
        background-color: ${props => props.theme.colors.secondary[1]};
        padding: 0;
        margin: 0;
        border: 1px solid ${props => props.theme.colors.secondary[2]};

        &:checked {
            background-color: #5964E0;

            &::before {
                content: '';
                height: 24px;
                width: 24px;
                background: url('/assets/desktop/icon-check.svg') no-repeat center;
                display: block;
            }
        }
    }
`;

const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => (
    <StyledInput ref={ref} {...props} />
))

export default Input;
