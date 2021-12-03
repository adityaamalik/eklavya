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
import { CheckCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;
const { Option } = Select;

const Profile = (props) => {
    const [createBadgeModal, toggleCreateBadgeModal] = useState(false);

    const createBadge = () => {
        const mentor = localStorage.getItem("mentor");
        const data = new FormData();

        if (nameBadge !== "") {
            data.append("name", nameBadge);
        }

        if (description !== "") {
            data.append("description", description);
        }
        if (menteeid !== "") {
            data.append("mentee", menteeid);
        }
        if (value !== "") {
            data.append("value", value);
        }
        if (!!image) {
            data.append("image", image);
        }

        data.append("mentor", mentor);
        axios
            .post(`/mentor/badges/${mentor}`, data)
            .then((response) => {
                console.log(response.data);
                message.success("Badge posted");
            })
            .catch((err) => {
                console.log(err);
                message.error("Some error occured");
            });
    };

    const handleMenteeChoose = (value) => {
        console.log(value);
        setMenteeid(value);
    };
    useEffect(() => {
        const mentor = localStorage.getItem("mentor");

        axios
            .get(`/mentor/mentee/${mentor}`)
            .then((response) => {
                console.log(response.data);
                setMentor(response.data);
                setMentees(response.data.mentees);
            })
            .catch((err) => {
                if (!!err.response && err.response.status === 401) {
                    setTimeout(() => {
                        window.location.pathname = "/";
                    }, 1000);
                }
            });
    }, []);
    const [image, setImage] = useState({});
    const [nameBadge, setName] = useState("");
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [mentees, setMentees] = useState([]);
    const [menteeid, setMenteeid] = useState([]);
    const [mentor, setMentor] = useState("");
    const [selectedMentee, setSelectedMentee] = useState({});
    const [menteeModal, toggleMentorModal] = useState(false);

    let mentorList = mentees.map((mentor, index) => {
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

    let MenteeDrop = mentees.map((mentee) => {
        return <Option value={mentee._id}>{mentee.name}</Option>;
    });

    return (
        <>
            <Layout>
                <SideMenu
                    isMentor={props?.location?.pathname === "/mentorprofile"}
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
                                value={nameBadge}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            <br />
                            <Input
                                type="text"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <br />
                            <br />
                            <Input
                                type="number"
                                placeholder="Value"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <br />
                            <br />
                            <Select
                                placeholder="Select a mentor"
                                style={{ width: "100%" }}
                                onChange={handleMenteeChoose}
                            >
                                {MenteeDrop}
                            </Select>
                            <br />
                            <br />
                            <Row>
                                <Col span={12}>Badge Image :</Col>
                                <Col span={12}>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setImage(e.target.files[0])
                                        }
                                    />
                                </Col>
                            </Row>
                            <br />
                            <Button onClick={createBadge}>Create Badge</Button>
                        </Modal>
                        <S.Heading>Profile</S.Heading>
                        <br />
                        <br />
                        <Row align="middle">
                            <Col span={8} style={{ textAlign: "center" }}>
                                <h3>Name :</h3>
                            </Col>
                            <Col span={16}>
                                <h3>{mentor.name}</h3>
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={8} style={{ textAlign: "center" }}>
                                <h3>Email :</h3>
                            </Col>
                            <Col span={16}>
                                <h3>{mentor.email}</h3>
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={8} style={{ textAlign: "center" }}>
                                <h3>LinkedIn Profile URL :</h3>
                            </Col>
                            <Col span={16}>
                                <h3>{mentor.profileurl}</h3>
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={8} style={{ textAlign: "center" }}>
                                <h1>YOUR COIN BALANCE</h1>
                            </Col>
                            <Col span={16}>
                                {mentor.totalCoins && (
                                    <h1>{mentor.totalCoins.current}</h1>
                                )}
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={8} style={{ textAlign: "center" }}>
                                <h3>Achivements</h3>
                            </Col>
                            <Col span={14}>
                                <Input
                                    type="text"
                                    placeholder="Add achivements"
                                />
                            </Col>
                            <Col span={2}>
                                <CheckCircleOutlined style={{ fontSize: 24 }} />
                            </Col>
                        </Row>
                        <br />
                        <Row align="middle">
                            <Col span={8} style={{ textAlign: "center" }}>
                                <h3>Profile Heading</h3>
                            </Col>
                            <Col span={14}>
                                <Input
                                    type="text"
                                    placeholder="Profile Heading"
                                />
                            </Col>
                            <Col span={2}>
                                <CheckCircleOutlined style={{ fontSize: 24 }} />
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
                                </div>
                            )}

                            <br />
                        </Modal>
                        <Row align="middle">
                            <Col span={24}>
                                <h2>
                                    Badges
                                    {props?.location?.pathname ===
                                        "/mentorprofile" && (
                                        <Button
                                            onClick={() =>
                                                toggleCreateBadgeModal(true)
                                            }
                                            style={{ marginLeft: "20px" }}
                                        >
                                            + Create new badge
                                        </Button>
                                    )}
                                </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <h2>My Mentees</h2>
                                {mentorList}
                            </Col>
                        </Row>

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

export default Profile;
