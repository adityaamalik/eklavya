import React from "react";
import { Layout, Row, Col, Input, Select, Button } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;
const { Option } = Select;

const TeacherCreateClass = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <>
            <Layout>
                <SideMenu isTeacher={true} />
                <Layout style={{ backgroundColor: "white" }}>
                    <Content
                        style={{
                            height: "100vh",
                            marginLeft: "250px",
                        }}
                    >
                        <S.Heading>Create New Class</S.Heading>
                        <Row>
                            <Col span={10}>
                                <Input
                                    type="text"
                                    placeholder="Name of class"
                                />
                            </Col>
                            <Col span={1}></Col>
                            <Col span={10}>
                                <Input type="text" placeholder="Subject Code" />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Col span={10}>
                                <Input
                                    type="text"
                                    placeholder="Default Meeting Link"
                                />
                            </Col>
                            <Col span={1}></Col>
                            <Col span={10}>
                                <Input
                                    type="text"
                                    placeholder="Number of Days/Week"
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Col span={10}>
                                <Input type="text" placeholder="Start Time" />
                            </Col>
                            <Col span={1}></Col>
                            <Col span={10}>
                                <Input type="text" placeholder="End Time" />
                            </Col>
                        </Row>
                        <br />
                        <h2>Add students</h2>
                        <Row>
                            <Col span={21}>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="Select Students"
                                    onChange={handleChange}
                                    optionLabelProp="label"
                                >
                                    <Option value="name1" label="Name 1">
                                        <Row>
                                            <Col span={12}>Name of Student</Col>
                                            <Col span={12}>Roll number</Col>
                                        </Row>
                                    </Option>
                                    <Option value="name2" label="Name 2">
                                        <Row>
                                            <Col span={12}>Name of Student</Col>
                                            <Col span={12}>Roll number</Col>
                                        </Row>
                                    </Option>
                                    <Option value="name3" label="Name 3">
                                        <Row>
                                            <Col span={12}>Name of Student</Col>
                                            <Col span={12}>Roll number</Col>
                                        </Row>
                                    </Option>
                                    <Option value="name4" label="Name 4">
                                        <Row>
                                            <Col span={12}>Name of Student</Col>
                                            <Col span={12}>Roll number</Col>
                                        </Row>
                                    </Option>
                                </Select>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span={24}>
                                <Button>+ Create New Class</Button>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default TeacherCreateClass;
