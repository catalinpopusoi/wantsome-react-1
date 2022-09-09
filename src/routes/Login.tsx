import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";
import { Button, Input } from "../components";
import { authenticate } from "../utils/http";
import { UserInfo } from "../utils/models";

const StyledLogin = styled.form`

`;

export default function Login(props: any) {
    const { setUsername } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState<UserInfo>({ email: '', password: '' });
    const navigate = useNavigate();
    const login = (e: FormEvent) => {
        e.preventDefault();
        authenticate(userInfo).then(data => {
            localStorage.setItem('token', data.token);
            setUsername(userInfo.email);
            navigate('../my-jobs');
        });
    }

    return (
        <>
            <h1>Login</h1>
            <StyledLogin onSubmit={login}>
                <Input
                    type="text"
                    placeholder="Email address"
                    onChange={(e) => setUserInfo(currentInfo => ({...currentInfo, email: e.target.value}))}
                    value={userInfo.email}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setUserInfo(currentInfo => ({...currentInfo, password: e.target.value}))}
                    value={userInfo.password}
                />
                <Button>Login</Button>
            </StyledLogin>
        </>
    )
}