import React, { useEffect, useState } from "react";
import axios from "axios";

import { Layout, Card, Row, Col, Button, Modal, message } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";
import moment from "moment";

const { Content } = Layout;

const Invitations = (props) => {
  const [role, setRole] = useState("");

  const acceptInvite = (invite) => {
    const mentor = localStorage.getItem("mentor");

    axios
      .put(`mentor/invite/accept/${mentor}`, {
        invite: invite,
      })
      .then((response) => {
        message.success("Accepted");
      })
      .catch((err) => {
        if (!!err.response && err.response.status === 401) {
          setTimeout(() => {
            window.location.pathname = "/";
          }, 1000);
        }
      });
  };

  useEffect(() => {
    const mentee = localStorage.getItem("mentee");
    if (props?.location?.pathname === "/menteeinvitations") {
      setRole("Mentee");
      axios
        .get(`/mentee/invite/${mentee}`)
        .then((response) => {
          setInvites(response.data);
        })
        .catch((err) => {
          if (!!err.response && err.response.status === 401) {
            setTimeout(() => {
              window.location.pathname = "/";
            }, 1000);
          }
        });
    } else {
      const mentor = localStorage.getItem("mentor");
      setRole("Mentor");
      axios
        .get(`/mentor/invite/${mentor}`)
        .then((response) => {
          setInvites(response.data);
        })
        .catch((err) => {
          if (!!err.response && err.response.status === 401) {
            setTimeout(() => {
              window.location.pathname = "/";
            }, 1000);
          }
        });
    }
  }, []);

  const [invites, setInvites] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedModal, toggleSelectedModal] = useState(false);

  const rejectInvite = (invite) => {
    axios
      .delete(`/mentor/invite/${invite}`)
      .then((response) => {
        message.success("Invite Removed");
      })
      .catch((err) => {
        if (!!err.response && err.response.status === 401) {
          message.error("Some error occured");
        }
      });
  };

  return (
    <>
      <Layout>
        <SideMenu
          isMentor={props?.location?.pathname === "/mentorinvitations"}
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
              title={`${role === "Mentor" ? "Mentee" : "Mentor"} Details`}
              centered
              visible={selectedModal}
              footer={null}
              onOk={() => toggleSelectedModal(false)}
              onCancel={() => toggleSelectedModal(false)}
            >
              <Row>
                <Col span={12}>
                  <h4>Name : </h4>
                </Col>
                <Col span={12}>{selected.name}</Col>
              </Row>
              <Row>
                <Col span={12}>
                  <h4>Email : </h4>
                </Col>
                <Col span={12}>{selected.email}</Col>
              </Row>
              <Row>
                <Col span={12}>
                  <h4>Profile Heading : </h4>
                </Col>
                <Col span={12}>{selected.profileHeading}</Col>
              </Row>
              <Row>
                <Col span={12}>
                  <h4>Qualifications : </h4>
                </Col>
                <Col span={12}>{selected.qualifications}</Col>
              </Row>
              {role === "Mentee" && (
                <Row>
                  <Col span={24}>
                    <a
                      href={selected.profileurl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View LinkedIn Profile
                    </a>
                  </Col>
                </Row>
              )}
            </Modal>
            <S.Heading>
              {role === "Mentor" ? "Invitations" : "Sent Invites"}
            </S.Heading>
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
                        {moment(invite.date).format("Do MMMM YYYY")}
                      </Col>
                    </Row>

                    <hr />

                    <Row style={{ marginTop: "10px" }}>
                      <Col
                        span={24}
                        style={{
                          color: "gray",
                          textDecoration: "underline",
                        }}
                      >
                        Invite Message
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "10px" }}>
                      <Col span={24}>{invite.message}</Col>
                    </Row>

                    <hr />

                    <br />

                    <div style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          if (role === "Mentor") {
                            setSelected(invite.mentee);
                          } else {
                            setSelected(invite.mentor);
                          }
                          toggleSelectedModal(true);
                        }}
                        size="small"
                      >
                        View {role === "Mentor" ? "Mentee" : "Mentor"}
                      </Button>
                    </div>

                    <br />
                    {role === "Mentor" && (
                      <Row>
                        <Col
                          style={{
                            textAlign: "center",
                          }}
                          span={12}
                        >
                          <Button onClick={() => acceptInvite(invite._id)}>
                            Accept
                          </Button>
                        </Col>
                        <Col
                          style={{
                            textAlign: "center",
                          }}
                          span={12}
                        >
                          <Button
                            onClick={() => rejectInvite(invite._id)}
                            danger
                          >
                            Reject
                          </Button>
                        </Col>
                      </Row>
                    )}
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
