import React, { useEffect, useState } from "react";
import axios from "axios";

import { Layout, Card, Row, Col, Button } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;

const Invitations = () => {
  useEffect(() => {
    const mentee = localStorage.getItem("mentee");
    axios
      .get(`/mentee/invite/${mentee}`)
      .then((response) => {
        setInvites(response.data);
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
  //   const [invitations] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [invites, setInvites] = useState([]);

  return (
    <>
      <Layout>
        <SideMenu />
        <Layout style={{ backgroundColor: "white" }}>
          <Content
            style={{
              height: "100vh",
              marginLeft: "200px",
              padding: "50px",
            }}
          >
            <S.Heading>Sent Invites</S.Heading>
            <Row>
              {invites.map((invite) => (
                <Col lg={8} md={12} sm={12} key={invite}>
                  <Card
                    hoverable
                    title="Invite"
                    style={{
                      width: 300,
                      marginTop: "10px",
                    }}
                  >
                    <Row>
                      <Col span={12} style={{ color: "gray" }}>
                        Invite By
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        {invite.mentee.name}
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12} style={{ color: "gray" }}>
                        Invite To
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        {invite.mentor.name}
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "10px" }}>
                      <Col span={12} style={{ color: "gray" }}>
                        Date of Invite
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        {invite.date}
                      </Col>
                    </Row>

                    <Row
                      style={{
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                      <Col span={12}>
                        <Button>Accept</Button>
                      </Col>
                      <Col span={12}>
                        <Button danger>Reject</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Invitations;
