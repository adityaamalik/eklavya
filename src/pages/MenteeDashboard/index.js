import React from "react";
import { Layout, Row, Col, Divider, Card, Avatar } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Meta } = Card;
const { Content } = Layout;

const MenteeDashboard = () => {
    const handleCategoryFilter = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <Layout>
                <SideMenu />
                <Layout>
                    <Content
                        style={{
                            height: "100vh",
                            marginLeft: "200px",
                            padding: "50px",
                            background: "white",
                        }}
                    >
                        <S.Heading>Let's get you started !</S.Heading>
                        <Row>
                            <Col md={24}>
                                <Card title="Select a category to find your ideal mentor">
                                    <Card.Grid
                                        style={{
                                            width: "32%",
                                            margin: "5px",
                                            textAlign: "center",
                                            color: "blue",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Category 1
                                    </Card.Grid>
                                    <Card.Grid
                                        style={{
                                            width: "32%",
                                            textAlign: "center",
                                            margin: "5px",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Content
                                    </Card.Grid>
                                    <Card.Grid
                                        style={{
                                            width: "32%",
                                            textAlign: "center",
                                            margin: "5px",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Content
                                    </Card.Grid>
                                    <Card.Grid
                                        style={{
                                            width: "32%",
                                            textAlign: "center",
                                            margin: "5px",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Content
                                    </Card.Grid>
                                    <Card.Grid
                                        style={{
                                            width: "32%",
                                            textAlign: "center",
                                            margin: "5px",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Content
                                    </Card.Grid>
                                    <Card.Grid
                                        style={{
                                            width: "32%",
                                            textAlign: "center",
                                            margin: "5px",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Content
                                    </Card.Grid>
                                </Card>
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col span={24}>
                                <h1>Here are your perfect mentors !</h1>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={7}>
                                <Card style={{ marginTop: 16 }}>
                                    <Meta
                                        avatar={
                                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        }
                                        title="Mentor Name"
                                        description="Mentor description"
                                    />
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                <Card style={{ marginTop: 16 }}>
                                    <Meta
                                        avatar={
                                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        }
                                        title="Mentor Name"
                                        description="Mentor description"
                                    />
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                <Card style={{ marginTop: 16 }}>
                                    <Meta
                                        avatar={
                                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        }
                                        title="Mentor Name"
                                        description="Mentor description"
                                    />
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                        </Row>

                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default MenteeDashboard;
