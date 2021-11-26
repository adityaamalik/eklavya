import React from "react";
import { Layout } from "antd";
import * as S from "./styles";
import { Link } from "react-router-dom";
import {
    HomeOutlined,
    MailOutlined,
    SearchOutlined,
    UserOutlined,
    TeamOutlined,
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
            <Link to={props.isMentor ? "mentordashboard" : "menteedashboard"}>
                <S.SideMenu>
                    <HomeOutlined
                        style={{ color: "white", fontSize: "40px" }}
                    />
                    <h1 style={{ color: "white", fontSize: "25px" }}>Home</h1>
                </S.SideMenu>
            </Link>
            <Link to={props.isMentor ? "queries" : "queries"}>
                <S.SideMenu>
                    <SearchOutlined
                        style={{ color: "white", fontSize: "40px" }}
                    />
                    <h1 style={{ color: "white", fontSize: "25px" }}>
                        Queries
                    </h1>
                </S.SideMenu>
            </Link>
            <Link
                to={props.isMentor ? "mentorinvitations" : "menteeinvitations"}
            >
                <S.SideMenu>
                    <>
                        <MailOutlined
                            style={{ color: "white", fontSize: "40px" }}
                        />
                        <h1 style={{ color: "white", fontSize: "25px" }}>
                            Invitations
                        </h1>
                    </>
                </S.SideMenu>
            </Link>
            <Link to={props.isMentor ? "mentormeetings" : "menteemeetings"}>
                <S.SideMenu>
                    <TeamOutlined
                        style={{ color: "white", fontSize: "40px" }}
                    />
                    <h1 style={{ color: "white", fontSize: "25px" }}>
                        Meetings
                    </h1>
                </S.SideMenu>
            </Link>

            <S.SideMenu style={{ cursor: "pointer" }}>
                <UserOutlined style={{ color: "white", fontSize: "40px" }} />
                <h1 style={{ color: "white", fontSize: "25px" }}>Profile</h1>
            </S.SideMenu>
        </Sider>
    );
};

export default SideMenu;
