import React from "react";
import { Layout } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;

const MentorDashboard = () => {
    return (
        <>
            <Layout>
                <SideMenu isTeacher={true} />
                <Layout>
                    <Content
                        style={{
                            height: "100vh",
                            marginLeft: "250px",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="assets/imgs/attendance.png"
                            alt="logo"
                            style={{ height: "300px", marginTop: "50px" }}
                        />
                        <S.Heading>Welcome to Smart Attendance</S.Heading>
                        <S.SubHeading>
                            Get started now, view your classes and records from
                            the pane on the left side.
                        </S.SubHeading>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default MentorDashboard;
