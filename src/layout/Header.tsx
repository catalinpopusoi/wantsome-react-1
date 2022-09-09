import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { UserContext } from "../App";
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

const StyledHeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    a {
        color: black;
    }
`;

export default function Header({ onToggleCheck, isDarkModeActive }: HeaderProps) {
    const { setUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setUsername('');
        navigate('/');
    }

    return (
        <StyledHeader>
            <Container>
                <Link to="/">
                    <img src="/assets/desktop/logo.svg" alt="Logo" />
                </Link>
                <StyledHeaderActions>
                    <Toggle id="theme-toggle" handleCheck={onToggleCheck} checked={isDarkModeActive} />
                    {
                        localStorage.getItem('token')
                            ? (
                                <>
                                    <Link to="/my-jobs">My jobs</Link>
                                    <button onClick={logout}>Logout</button>
                                </>
                            )
                            : <Link to="/login">Login</Link>
                    }
                </StyledHeaderActions>
            </Container>
        </StyledHeader>
    )
}