import React, { useState } from "react";
import { Layout, Card, Row, Col, Button, Modal, Input, Select } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;
const { Option } = Select;

const Meetings = (props) => {
    const [createMeetingModal, toggleCreateMeetingModal] = useState(false);

    const handleMenteeChoose = (value) => {
        console.log(value);
    };

    return (
        <>
            <Layout>
                <SideMenu
                    isMentor={props?.location?.pathname === "mentormeetings"}
                />
                <Layout style={{ backgroundColor: "white" }}>
                    <Content
                        style={{
                            height: "100vh",
                            marginLeft: "200px",
                            padding: "50px",
                        }}
                    >
                        <Modal
                            title="Create a new meeting"
                            centered
                            visible={createMeetingModal}
                            footer={null}
                            onOk={() => toggleCreateMeetingModal(false)}
                            onCancel={() => toggleCreateMeetingModal(false)}
                        >
                            <Input type="text" placeholder="Meeting URL" />
                            <br />
                            <br />
                            <Input
                                type="text"
                                placeholder="What's this meeting about ?"
                            />
                            <br />
                            <br />
                            <Select
                                placeholder="Select a mentee"
                                style={{ width: "100%" }}
                                onChange={handleMenteeChoose}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                            <br />
                            <br />
                            <Button>Create</Button>
                        </Modal>
                        <Row>
                            <Col span={12}>
                                <S.Heading>Scheduled Meetings</S.Heading>
                            </Col>
                            <Col span={12}>
                                {props?.location?.pathname ===
                                    "mentormeetings" && (
                                    <Button
                                        onClick={() =>
                                            toggleCreateMeetingModal(true)
                                        }
                                        style={{ marginTop: "15px" }}
                                    >
                                        + Create New Meeting
                                    </Button>
                                )}
                            </Col>
                        </Row>

                        <Card style={{ marginTop: 16 }}>
                            <Row>
                                <Col span={24}>
                                    <h2>Meeting Details</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <strong>Date</strong> : 25/12/2021
                                </Col>
                                <Col span={12}>
                                    <strong>Time</strong> : 12:00 PM
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <strong>Mentee Name</strong> : Aditya Malik
                                </Col>
                                <Col span={12}>
                                    <strong>Mentor Name</strong>: Elon Musk{" "}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <strong>Message</strong> :{" "}
                                </Col>
                            </Row>
                            <br />
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://meet.google.com/`}
                            >
                                Join Now
                            </a>
                        </Card>
                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Meetings;
