import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Layout,
    Row,
    Col,
    Divider,
    Card,
    Avatar,
    Button,
    Modal,
    message,
    Input,
} from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Meta } = Card;
const { Content } = Layout;

const MenteeDashboard = () => {
    const handleCategoryFilter = (value) => {
        setCategoryID(value);
        axios
            .get(`/mentor/mentors/${value}`, {
                params: {
                    category: value,
                },
            })
            .then((response) => {
                setMentors(response.data);
            })
            .catch((err) => {
                if (!!err.response && err.response.status === 401) {
                    setTimeout(() => {
                        // window.location.pathname = "/";
                    }, 1000);
                }
            });
    };

    useEffect(() => {
        if (
            localStorage.getItem("mentee") === null ||
            localStorage.getItem("mentee") === undefined
        ) {
            window.location.href = "/";
        }
        axios
            .get(`/mentor/category`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => {
                if (!!err.response && err.response.status === 401) {
                    setTimeout(() => {
                        window.location.pathname = "/";
                    }, 1000);
                }
            });
    }, []);
    const [categories, setCategories] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [categoryID, setCategoryID] = useState("asd");
    const [selectedCategoryName, setSelectedCategoryName] = useState("None");
    const [selectedMentor, setSelectedMentor] = useState({});
    const [mentorModal, toggleMentorModal] = useState(false);
    const [inviteMessage, setInviteMessage] = useState("");

    let categoryList = categories.map((category, index) => {
        return (
            <div
                key={index}
                onClick={() => {
                    handleCategoryFilter(category._id);
                    setSelectedCategoryName(category.name);
                }}
            >
                <Card.Grid
                    style={{
                        width: "32%",
                        margin: "5px",
                        textAlign: "center",
                        color:
                            categoryID === category._id ? "#1890FF" : "black",
                        cursor: "pointer",
                    }}
                >
                    {category.name}
                </Card.Grid>
            </div>
        );
    });

    let mentorList = mentors.map((mentor, index) => {
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
                                        setSelectedMentor(mentor);
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

    const sendInvite = () => {
        axios
            .post(`/mentee/invite/${localStorage.getItem("mentee")}`, {
                mentor: selectedMentor._id,
                message: inviteMessage,
            })
            .then((res) => {
                message.success("Invite Sent");
                toggleMentorModal(false);
                selectedMentor({});
            })
            .catch((err) => {
                message.error("Could not send invite !");
            });
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
                        <Modal
                            title="Mentor Details"
                            centered
                            visible={mentorModal}
                            footer={null}
                            onOk={() => toggleMentorModal(false)}
                            onCancel={() => toggleMentorModal(false)}
                        >
                            <Row>
                                <Col span={12}>
                                    <h4>Name : </h4>
                                </Col>
                                <Col span={12}>{selectedMentor.name}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <h4>Email : </h4>
                                </Col>
                                <Col span={12}>{selectedMentor.email}</Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <h4>Qualifications : </h4>
                                </Col>
                                <Col span={12}>
                                    {selectedMentor.qualifications}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <h4>Category : </h4>
                                </Col>
                                <Col span={12}>{selectedCategoryName}</Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <a
                                        href={selectedMentor.profileurl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View LinkedIn Profile
                                    </a>
                                </Col>
                            </Row>
                            <br />
                            <Input
                                type="text"
                                placeholder="Invite Message"
                                value={inviteMessage}
                                onChange={(e) =>
                                    setInviteMessage(e.target.value)
                                }
                            />
                            <br />
                            <br />
                            <Button
                                disabled={inviteMessage === ""}
                                onClick={sendInvite}
                            >
                                Send Invite
                            </Button>
                        </Modal>
                        <S.Heading>Let's get you started !</S.Heading>
                        <Row>
                            <Col md={24}>
                                <Card title="Select a category to find your ideal mentor">
                                    {categoryList}
                                </Card>
                            </Col>
                        </Row>
                        <Divider />
                        <Row>
                            <Col span={24}>
                                <h1>Here are your perfect mentors ! </h1>
                            </Col>
                        </Row>
                        <p style={{ color: "gray" }}>
                            Selected Category : {selectedCategoryName}
                        </p>

                        <Row>{mentorList}</Row>

                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default MenteeDashboard;
