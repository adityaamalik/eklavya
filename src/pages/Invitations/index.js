import React, { useState } from "react";
import { Layout, Card, Row, Col, Button } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;

const Invitations = () => {
    const [invitations] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

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
                        <S.Heading>Sent Invites</S.Heading>
                        <Row>
                            {invitations.map((invite) => (
                                <Col lg={8} md={12} sm={12} key={invite}>
                                    <Card
                                        hoverable
                                        title="Invite"
                                        style={{
                                            width: 300,
                                            marginTop: "10px",
                                        }}
                                    >
                                        <Row>
                                            <Col
                                                span={12}
                                                style={{ color: "gray" }}
                                            >
                                                Invite By
                                            </Col>
                                            <Col
                                                span={12}
                                                style={{ textAlign: "right" }}
                                            >
                                                Mentee Name
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col
                                                span={12}
                                                style={{ color: "gray" }}
                                            >
                                                Invite To
                                            </Col>
                                            <Col
                                                span={12}
                                                style={{ textAlign: "right" }}
                                            >
                                                Mentor Name
                                            </Col>
                                        </Row>

                                        <Row style={{ marginTop: "10px" }}>
                                            <Col
                                                span={12}
                                                style={{ color: "gray" }}
                                            >
                                                Date of Invite
                                            </Col>
                                            <Col
                                                span={12}
                                                style={{ textAlign: "right" }}
                                            >
                                                25/07/2021
                                            </Col>
                                        </Row>

                                        <Row
                                            style={{
                                                marginTop: "10px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <Col span={12}>
                                                <Button>Accept</Button>
                                            </Col>
                                            <Col span={12}>
                                                <Button danger>Reject</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Invitations;
