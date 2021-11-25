import React from "react";
import { Layout } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;

const StudentStatistics = () => {
    return (
        <>
            <Layout>
                <SideMenu />
                <Layout style={{ backgroundColor: "white" }}>
                    <Content
                        style={{
                            height: "100vh",
                            marginLeft: "250px",
                        }}
                    >
                        <S.Heading>Your Attendance Statistics</S.Heading>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default StudentStatistics;
