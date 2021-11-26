import React from "react";
import { Layout } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;

const Meetings = () => {
    return (
        <>
            <Layout>
                <SideMenu />
                <Layout style={{ backgroundColor: "white" }}>
                    <Content
                        style={{
                            height: "100vh",
                            marginLeft: "200px",
                            padding: "50px",
                        }}
                    >
                        <S.Heading>Scheduled Meetings</S.Heading>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Meetings;
