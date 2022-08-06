import styled, { css } from "styled-components";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button`
    ${props => {
        const { colors, spacings } = props.theme;

        return css`
            padding: ${spacings.small} ${spacings.medium};
            background-color: ${colors.primary[0]};
            border: none;
            color: #fff;
            border-radius: 6px;
            font-weight: 700;
            cursor: pointer;
            transition: background-color .1s linear;

            &:hover {
                background-color: ${colors.primary[1]};
            }
        `;
    }}
`;

export default function Button({ children, onClick }: ButtonProps) {
    return <StyledButton onClick={onClick}>{children}</StyledButton>
}