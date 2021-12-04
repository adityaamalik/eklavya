import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Layout,
    Row,
    Col,
    Input,
    Button,
    Card,
    Avatar,
    Modal,
    Select,
    message,
} from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Meta } = Card;
const { Content } = Layout;

const MentorDashboard = () => {
    useEffect(() => {
        const mentor = localStorage.getItem("mentor");

        axios
            .get(`/mentor/mentee/${mentor}`)
            .then((response) => {
                console.log(response.data);
                setMentor(response.data);
                setTitle("Welcome Back Here Are Your Mentees");
                setMentees(response.data.mentees);
            })
            .catch((err) => {
                if (!!err.response && err.response.status === 401) {
                    setTimeout(() => {
                        message.error("some error occured");
                    }, 1000);
                }
            });
        if (mentees.length === 0) {
            axios
                .get(`/mentee`)
                .then((response) => {
                    console.log(response.data);
                    setTitle(
                        "You have no mentess, please check invitations. Here are some popular mentess"
                    );
                    setMentees(response.data);
                })
                .catch((err) => {
                    if (!!err.response && err.response.status === 401) {
                        setTimeout(() => {
                            message.error("some error occured");
                        }, 1000);
                    }
                });
        }
    }, []);
    const [mentees, setMentees] = useState([]);
    const [menteeid, setMenteeid] = useState([]);
    const [mentor, setMentor] = useState("");
    const [title, setTitle] = useState("");
    const [selectedMentee, setSelectedMentee] = useState({});
    const [menteeModal, toggleMentorModal] = useState(false);
    let menteeList = mentees.map((mentor, index) => {
        return (
            <React.Fragment key={index}>
                <Col md={12} sm={24} xs={24}>
                    <Card style={{ marginTop: 16 }}>
                        <Meta
                            avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={mentor.name}
                        />
                        <p>{mentor.email}</p>
                        <Row align="middle">
                            <Col span={12}>
                                <Button
                                    onClick={() => {
                                        setSelectedMentee(mentor);
                                        toggleMentorModal(true);
                                    }}
                                    size="small"
                                    style={{
                                        border: "none",
                                        color: "#1890FF",
                                        boxShadow: "none",
                                    }}
                                >
                                    Click to View full details
                                </Button>
                            </Col>
                            <Col span={12}>
                                <a
                                    href={mentor.profileurl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View LinkedIn Profile
                                </a>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </React.Fragment>
        );
    });
    return (
        <>
            <Layout>
                <SideMenu isMentor={true} />
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
                            <Col span={24}>
                                <h1>{title}</h1>
                            </Col>
                        </Row>
                        <Modal
                            title="Mentor Details"
                            centered
                            visible={menteeModal}
                            footer={null}
                            onOk={() => toggleMentorModal(false)}
                            onCancel={() => toggleMentorModal(false)}
                        >
                            {selectedMentee && (
                                <div>
                                    <Row>
                                        <Col span={12}>
                                            <h4>Name : </h4>
                                        </Col>
                                        <Col span={12}>
                                            {selectedMentee.name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <h4>Email : </h4>
                                        </Col>
                                        <Col span={12}>
                                            {selectedMentee.email}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            <h4>Qualifications : </h4>
                                        </Col>
                                        <Col span={12}>
                                            {selectedMentee.qualifications}
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={24}>
                                            <a
                                                href={selectedMentee.profileurl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View LinkedIn Profile
                                            </a>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col span={24}>
                                            <Input
                                                type="text"
                                                placeholder="Add Review"
                                            />
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col
                                            style={{ textAlign: "right" }}
                                            span={24}
                                        >
                                            <Button>Add</Button>
                                        </Col>
                                    </Row>
                                    <br />
                                    {["replace", "this", "array"].map((i) => {
                                        return (
                                            <Row
                                                style={{ marginTop: "10px" }}
                                                key={i}
                                            >
                                                <Col span={24}>
                                                    <Card
                                                        style={{
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        <p>
                                                            This is my hard
                                                            coded review, please
                                                            make it dynamic.
                                                        </p>
                                                        <Row>
                                                            <Col span={12}>
                                                                <p
                                                                    style={{
                                                                        color: "gray",
                                                                    }}
                                                                >
                                                                    Name of
                                                                    Reviewer/Mentee
                                                                </p>
                                                            </Col>
                                                            <Col span={12}>
                                                                <p
                                                                    style={{
                                                                        color: "gray",
                                                                    }}
                                                                >
                                                                    Email of
                                                                    Reviewer/Mentee
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        );
                                    })}
                                </div>
                            )}

                            <br />
                        </Modal>

                        <Row>{menteeList}</Row>

                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default MentorDashboard;
