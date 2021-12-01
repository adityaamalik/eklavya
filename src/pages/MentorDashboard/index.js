import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Row, Col, Card, Avatar } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Meta } = Card;
const { Content } = Layout;

const MentorDashboard = () => {
    const [mentees, setMentees] = useState([]);

    useEffect(() => {
        axios
            .get(`/mentee/${localStorage.getItem("mentor")}`)
            .then((res) => {
                setMentees(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let menteeList = mentees?.map((mentee) => {
        return (
            <div>
                <Col span={7}>
                    <Card style={{ marginTop: 16 }}>
                        <Meta
                            avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={mentee.name}
                            description="Mentor description"
                        />
                        {mentee.name}
                    </Card>
                </Col>
            </div>
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
                                <h1>Have a look at your mentees</h1>
                            </Col>
                        </Row>

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
