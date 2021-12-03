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
} from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;
const { Meta } = Card;
const { Option } = Select;

const MenteeProfile = (props) => {
    const [createBadgeModal, toggleCreateBadgeModal] = useState(false);

    const handleMenteeChoose = (value) => {
        console.log(value);
    };

    const onFinish = (values) => {
        console.log("on finish called");
        // const mentee = localStorage.getItem("docsrecordDoctor");
        // values.doctor = doctor;
        // axios
        //   .put(`/patients/${id}`, values)
        //   .then((response) => {
        //     console.log(response);
        //     setPatient(response.data);
        //     message.success("Patient updated successfully !");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
    };
    useEffect(() => {
        const mentee = localStorage.getItem("mentee");
        axios
            .get(`/mentee/badges/${mentee}`)
            .then((response) => {
                console.log(response.data);
                setBadges(response.data);
            })
            .catch((err) => {
                if (!!err.response && err.response.status === 401) {
                    setTimeout(() => {
                        window.location.pathname = "/";
                    }, 1000);
                }
            });

        axios
            .get(`/mentee/${mentee}`)
            .then((response) => {
                console.log(response.data);
                setmentee(response.data);
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
            .get(`/mentor/category`)
            .then((response) => {
                setCategories(response.data);
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
    const [badges, setBadges] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryID, setCategoryID] = useState();
    const [mentee, setmentee] = useState("");
    const [selectedMentor, setSelectedMentor] = useState({});
    const [mentorModal, toggleMentorModal] = useState(false);
    let categoryList = categories.map((category) => {
        return (
            // onClick={() => handleCategoryFilter(category._id)}
            <div>
                <Card.Grid
                    style={{
                        width: "32%",
                        margin: "5px",
                        textAlign: "center",
                        color: "blue",
                        cursor: "pointer",
                    }}
                    cover={
                        <img
                            alt="example"
                            src={`data:image/${
                                category.image.contentType
                            };base64,${new Buffer.from(
                                category.image.data
                            ).toString("base64")}`}
                        />
                    }
                >
                    {category.name}
                </Card.Grid>
            </div>
        );
    });

    let BadgesList = badges.map((badge) => {
        return (
            <div>
                <Col>
                    <Card
                        hoverable
                        cover={
                            <img
                                alt="example"
                                src={`data:image/${
                                    badge.image.contentType
                                };base64,${new Buffer.from(
                                    badge.image.data
                                ).toString("base64")}`}
                            />
                        }
                    >
                        <strong>Date : </strong> {badge.date}
                        <br />
                        <strong>Name : </strong> {badge.name}
                        <br />
                        <strong>Value : </strong> {badge.value}
                        <br />
                        <strong>Mentor Name : </strong>
                        {/* {badge.mentor.name} */}
                        <br />
                        <strong>Mentee Name : </strong> {badge.mentee.name}
                        <br />
                        <strong>Description : </strong> {badge.description}
                    </Card>
                </Col>
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
                            title={mentor.mentor.name}
                        />
                        <p>{mentor.mentor.email}</p>
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
                                    href={mentor.MenteeProfileurl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View LinkedIn MenteeProfile
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
                <SideMenu
                    isMentor={
                        props?.location?.pathname === "/mentorMenteeProfile"
                    }
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
                            title="Create a new Badge"
                            centered
                            visible={createBadgeModal}
                            footer={null}
                            onOk={() => toggleCreateBadgeModal(false)}
                            onCancel={() => toggleCreateBadgeModal(false)}
                        >
                            <Input
                                type="text"
                                placeholder="Name of this badge"
                            />
                            <br />
                            <br />
                            <Input type="text" placeholder="Description" />
                            <br />
                            <br />
                            <Input type="number" placeholder="Value" />
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
                            <Row>
                                <Col span={12}>Badge Image :</Col>
                                <Col span={12}>
                                    <input type="file" />
                                </Col>
                            </Row>
                            <br />
                            <Button>Create Badge</Button>
                        </Modal>
                        <S.Heading>MenteeProfile</S.Heading>
                        <br />
                        <br />
                        <Row align="middle">
                            <Col span={12} style={{ textAlign: "center" }}>
                                <h3>Name :</h3>
                            </Col>
                            <Col span={12}>
                                <Input type="text" placeholder="Name" />
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={12} style={{ textAlign: "center" }}>
                                <h3>Email :</h3>
                            </Col>
                            <Col span={12}>
                                <Input type="email" placeholder="E-mail" />
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={12} style={{ textAlign: "center" }}>
                                <h3>LinkedIn MenteeProfile URL :</h3>
                            </Col>
                            <Col span={12}>
                                <Input type="text" placeholder="URL" />
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={12} style={{ textAlign: "center" }}>
                                <h1>YOUR COIN BALANCE</h1>
                            </Col>
                            <Col span={12}>
                                <h1>2000</h1>
                            </Col>
                        </Row>
                        <br />
                        {props?.location?.pathname ===
                            "/menteeMenteeProfile" && (
                            <>
                                <Row>
                                    <Col span={24}>
                                        <Card title="What are you good at ?">
                                            {categoryList}
                                        </Card>
                                    </Col>
                                </Row>
                                <br />
                            </>
                        )}

                        <Row>
                            <Col span={24}>
                                <h2>
                                    My{" "}
                                    {props?.location?.pathname ===
                                    "/menteeMenteeProfile"
                                        ? "Mentors"
                                        : "Mentees"}
                                </h2>
                                {mentorList}
                            </Col>
                        </Row>
                        <Row align="middle">{BadgesList}</Row>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <Button
                                danger
                                onClick={() => {
                                    localStorage.clear();
                                    props.history.push("/");
                                }}
                            >
                                LOGOUT
                            </Button>
                        </div>
                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default MenteeProfile;
