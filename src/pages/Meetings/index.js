import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Layout,
    Card,
    Row,
    Col,
    Button,
    Modal,
    Input,
    Select,
    message,
    DatePicker,
} from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;
const { Option } = Select;

const Meetings = (props) => {
    const [createMeetingModal, toggleCreateMeetingModal] = useState(false);

    const onOk = (value) => {
        console.log("onOk : ", value);
    };

    useEffect(() => {
        const mentee = localStorage.getItem("mentee");
        axios
            .get(`/mentee/${mentee}`)
            .then((response) => {
                console.log(response.data.mentors);
                setMentors(response.data.mentors);
            })
            .catch((err) => {
                if (!!err.response && err.response.status === 401) {
                    setTimeout(() => {
                        window.location.pathname = "/";
                    }, 1000);
                }
            });
        axios
            .get(`/mentee/meeting/${mentee}`)
            .then((response) => {
                setMeetings(response.data);
                console.log(response.data);
            })
            .catch((err) => {
                if (!!err.response && err.response.status === 401) {
                    setTimeout(() => {
                        window.location.pathname = "/";
                    }, 1000);
                }
            });
    }, []);

    const createmeeting = () => {
        axios
            .post(`/mentee/meeting/${localStorage.getItem("mentee")}`, {
                mentee: localStorage.getItem("mentee"),
                message: messages,
                mentor: mentorID,
                url: url,
            })
            .then((res) => {
                message.success("Meeting posted");
            })
            .catch((err) => {
                message.error("Could not post Meeting");
            });
    };
    const [meetings, setMeetings] = useState([]);
    const [mentorID, setMentorID] = useState("");
    const [messages, setMessage] = useState("");
    const [url, setUrl] = useState("");
    const [mentors, setMentors] = useState([]);
    const handleMenteeChoose = (value) => {
        setMentorID(value);
    };
    //   isMentor={props?.location?.pathname === "mentormeetings"}

    let MeetingsList = meetings.map((meeting) => {
        return (
            <div>
                <Card style={{ marginTop: 16 }}>
                    <Row>
                        <Col span={24}>
                            <h2>Meeting Details</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <strong>Date</strong> :{meeting.date}
                        </Col>
                        <Col span={12}>
                            <strong>Time</strong> : 12:00 PM
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <strong>Mentee Name</strong> :{meeting.mentee.name}
                        </Col>
                        <Col span={12}>
                            <strong>Mentor Name</strong>: {meeting.mentor.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <strong>Message</strong> :{meeting.message}
                        </Col>
                    </Row>
                    <br />
                    <a target="_blank" rel="noreferrer" href={meeting.url}>
                        Join Now
                    </a>
                </Card>
            </div>
        );
    });

    let mentorDrop = mentors.map((mentor, index) => {
        return (
            <Option key={index} value={mentor.mentor._id}>
                {mentor.mentor.name}
            </Option>
        );
    });
    return (
        <>
            <Layout>
                <SideMenu
                    isMentor={props?.location?.pathname === "/mentormeetings"}
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
                            <Input
                                type="text"
                                placeholder="Meeting URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <br />
                            <br />
                            <Input
                                type="text"
                                placeholder="What's this meeting about ?"
                                value={messages}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <br />
                            <br />
                            <Select
                                placeholder="Select a mentee"
                                style={{ width: "100%" }}
                                onChange={handleMenteeChoose}
                            >
                                {mentorDrop}
                            </Select>
                            <br />
                            <br />
                            <DatePicker showTime onOk={onOk} />
                            <br />
                            <br />
                            <Button onClick={createmeeting}>Create</Button>
                        </Modal>
                        <Row>
                            <Col span={12}>
                                <S.Heading>Scheduled Meetings</S.Heading>
                            </Col>
                            <Col span={12}>
                                <Button
                                    onClick={() =>
                                        toggleCreateMeetingModal(true)
                                    }
                                    style={{ marginTop: "15px" }}
                                >
                                    + Create New Meeting
                                </Button>
                            </Col>
                        </Row>
                        {MeetingsList}
                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Meetings;
