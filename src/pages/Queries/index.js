import React from "react";
import {
    Input,
    Layout,
    Row,
    Col,
    Button,
    Divider,
    Card,
    Avatar,
    Select,
} from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Content } = Layout;
const { Option } = Select;

const Queries = () => {
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
                        <S.Heading>What's troubling you ?</S.Heading>
                        <Row>
                            <Col span={22}>
                                <Input
                                    type="text"
                                    placeholder="Your question"
                                />
                            </Col>
                            <Col span={2}>
                                <Button disabled>POST</Button>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md={24}>
                                <Card title="Select a category for your question">
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
                            <Col span={12}>
                                <h1>
                                    Here's what your peers are asking about !
                                </h1>
                            </Col>
                            <Col span={12}>
                                <Select
                                    placeholder="Filter by category"
                                    style={{ width: 300 }}
                                    onChange={handleCategoryFilter}
                                >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </Col>
                        </Row>

                        <Card
                            style={{ marginTop: 16 }}
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                }
                                title="Question title"
                                description="Question description"
                            />
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                }
                                title="Question title"
                                description="Question description"
                            />
                        </Card>
                        <Card
                            style={{ marginTop: 16 }}
                            actions={[
                                <SettingOutlined key="setting" />,
                                <EditOutlined key="edit" />,
                                <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                avatar={
                                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                                }
                                title="Question title"
                                description="Question description"
                            />
                        </Card>
                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Queries;
