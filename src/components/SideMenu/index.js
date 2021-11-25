import React from "react";
import { Layout } from "antd";
import * as S from "./styles";
import { Link } from "react-router-dom";
import {
    HomeOutlined,
    BookOutlined,
    MailOutlined,
    LogoutOutlined,
    LineChartOutlined,
    PlusOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const SideMenu = (props) => {
    return (
        <Sider
            style={{
                height: "100vh",
                backgroundColor: "#4287f5",
                position: "fixed",
            }}
        >
            <Link
                to={props.isTeacher ? "teacherdashboard" : "studentdashboard"}
            >
                <S.SideMenu>
                    <HomeOutlined
                        style={{ color: "white", fontSize: "40px" }}
                    />
                    <h1 style={{ color: "white", fontSize: "25px" }}>Home</h1>
                </S.SideMenu>
            </Link>
            <Link to={props.isTeacher ? "teacherclasses" : "studentclasses"}>
                <S.SideMenu>
                    <BookOutlined
                        style={{ color: "white", fontSize: "40px" }}
                    />
                    <h1 style={{ color: "white", fontSize: "25px" }}>
                        Classes
                    </h1>
                </S.SideMenu>
            </Link>
            <Link
                to={
                    props.isTeacher
                        ? "teachercreateclass"
                        : "studentinvitations"
                }
            >
                <S.SideMenu>
                    {props.isTeacher ? (
                        <>
                            <PlusOutlined
                                style={{ color: "white", fontSize: "40px" }}
                            />
                            <h1 style={{ color: "white", fontSize: "25px" }}>
                                New Class
                            </h1>
                        </>
                    ) : (
                        <>
                            <MailOutlined
                                style={{ color: "white", fontSize: "40px" }}
                            />
                            <h1 style={{ color: "white", fontSize: "25px" }}>
                                Invitations
                            </h1>
                        </>
                    )}
                </S.SideMenu>
            </Link>
            <Link
                to={props.isTeacher ? "teacherstatistics" : "studentstatistics"}
            >
                <S.SideMenu>
                    <LineChartOutlined
                        style={{ color: "white", fontSize: "40px" }}
                    />
                    <h1 style={{ color: "white", fontSize: "25px" }}>
                        Statistics
                    </h1>
                </S.SideMenu>
            </Link>

            <S.SideMenu
                onClick={() => {
                    window.location.href = "/";
                    localStorage.clear();
                }}
                style={{ cursor: "pointer" }}
            >
                <LogoutOutlined style={{ color: "white", fontSize: "40px" }} />
                <h1 style={{ color: "white", fontSize: "25px" }}>Logout</h1>
            </S.SideMenu>
        </Sider>
    );
};

export default SideMenu;
