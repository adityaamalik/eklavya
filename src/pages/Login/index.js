import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Button, message } from "antd";
import { Link } from "react-router-dom";

const Login = (props) => {
    useEffect(() => {
        if (
            props?.location?.state?.role === null ||
            props?.location?.state?.role === undefined
        ) {
            window.location.pathname = "/";
        }
    }, [props?.location?.state?.role]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        if (email === "") {
            message.error("Please enter email !");
        } else if (password === "") {
            message.error("Please enter password !");
        } else {
            const role = props?.location?.state?.role?.toLowerCase();

            props.history.push(`/${role}dashboard`);
        }
    };

    return (
        <>
            <S.Container>
                <img src="assets/imgs/attendance.png" height={100} alt="logo" />
                <h1>Welcome {props?.location?.state?.role}</h1>
                <br />
                <h3>Login</h3>
                <br />
                <br />
                <S.AuthInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <br />
                <S.AuthInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />

                <Button onClick={login}>Login</Button>

                <br />
                <br />
                <Link
                    to={{
                        pathname: "/register",
                        state: { role: props?.location?.state?.role },
                    }}
                >
                    Do not have an account ?
                </Link>
            </S.Container>
        </>
    );
};

export default Login;
