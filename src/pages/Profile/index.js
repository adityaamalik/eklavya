import React, { useState } from "react";
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

const Profile = (props) => {
    const [createBadgeModal, toggleCreateBadgeModal] = useState(false);

    const handleMenteeChoose = (value) => {
        console.log(value);
    };

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
                        <S.Heading>Profile</S.Heading>
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
                                <h3>LinkedIn Profile URL :</h3>
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
                        {props?.location?.pathname !== "/menteeprofile" && (
                            <>
                                <Row>
                                    <Col span={24}>
                                        <Card title="What are you good at ?">
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
                                <br />
                            </>
                        )}

                        <Row>
                            <Col span={24}>
                                <h2>
                                    My{" "}
                                    {props?.location?.pathname ===
                                    "/menteeprofile"
                                        ? "Mentors"
                                        : "Mentees"}
                                </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Card style={{ marginTop: 16 }}>
                                    <Meta
                                        avatar={
                                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                                        }
                                        title="Mentee Name"
                                        description="Mentee description"
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
                                        title="Mentee Name"
                                        description="Mentee description"
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
                                        title="Mentee Name"
                                        description="Mentee description"
                                    />
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                        <br />
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
                        <br />
                        <Row>
                            <Col span={7}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <strong>Date : </strong> 25/12/21
                                    <br />
                                    <strong>Name : </strong> Dronacharya
                                    <br />
                                    <strong>Value : </strong> 7
                                    <br />
                                    <strong>Mentor Name : </strong> Elon Musk
                                    <br />
                                    <strong>Mentee Name : </strong> Aditya
                                    <br />
                                    <strong>Description : </strong> This badge
                                    is given on completion of DSA question list.
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={7}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                        />
                                    }
                                >
                                    <Meta
                                        title="Europe Street beat"
                                        description="www.instagram.com"
                                    />
                                </Card>
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
