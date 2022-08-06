import styled, { css } from "styled-components";
import { Toggle } from "../components";
import Container from "./Container";

interface HeaderProps {
    onToggleCheck: () => void;
    isDarkModeActive: boolean;
}

const StyledHeader = styled.header`
${props => {
    const { spacings } = props.theme;

    return css`
        padding: ${spacings.large} 0 ${spacings.xLarge};
        background: url('/assets/desktop/bg-pattern-header.svg') no-repeat top center;
        margin-bottom: -45px;
        
        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }  
    `;
}}`;

export default function Header({ onToggleCheck, isDarkModeActive }: HeaderProps) {
    return (
        <StyledHeader>
            <Container>
                <img src="/assets/desktop/logo.svg" alt="Logo" />
                <Toggle id="theme-toggle" handleCheck={onToggleCheck} checked={isDarkModeActive} />
            </Container>
        </StyledHeader>
    )
}