import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Row, Col, Button, Card, Avatar, Modal, message } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Meta } = Card;
const { Content } = Layout;

const MentorDashboard = () => {
  const [mentees, setMentees] = useState([]);
  useEffect(() => {
    const mentor = localStorage.getItem("mentor");

    axios
      .get(`/mentor/mentee/${mentor}`)
      .then((response) => {
        console.log(response.data);

        setTitle(
          "Welcome !!! and Please Check Inviations if you don't have any Mentee"
        );
        setMentees(response.data.mentees);
      })
      .catch((err) => {
        if (!!err.response && err.response.status === 401) {
          setTimeout(() => {
            message.error("some error occured");
          }, 1000);
        }
      });
    // if (mentees.length === 0) {
    //   axios
    //     .get(`/mentee`)
    //     .then((response) => {
    //       console.log(response.data);
    //       setTitle(
    //         "You have no mentess, please check invitations. Here are some popular mentess"
    //       );
    //       setMentees(response.data);
    //     })
    //     .catch((err) => {
    //       if (!!err.response && err.response.status === 401) {
    //         setTimeout(() => {
    //           message.error("some error occured");
    //         }, 1000);
    //       }
    //     });
    // }
  }, []);

  const [reviews, setReviews] = useState([]);

  const [title, setTitle] = useState("");
  const [selectedMentee, setSelectedMentee] = useState({});
  const [menteeModal, toggleMentorModal] = useState(false);

  // if (mentees.length === 0) {
  //   axios
  //     .get(`/mentee`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setTitle(
  //         "You have no mentess, please check invitations. Here are some popular mentess"
  //       );
  //       setMentees(response.data);
  //     })
  //     .catch((err) => {
  //       if (!!err.response && err.response.status === 401) {
  //         setTimeout(() => {
  //           message.error("some error occured");
  //         }, 1000);
  //       }
  //     });
  // }

  const viewmentor = (mentee) => {
    setSelectedMentee(mentee);

    axios
      .get(`mentee/review/${mentee._id}`)
      .then((response) => {
        console.log(response.data.review);
        setReviews(response.data.review);
      })
      .catch((err) => {
        console.log(err);
        message.error("Some error occured");
      });
  };

  let menteeList = mentees.map((mentor, index) => {
    return (
      <React.Fragment key={index}>
        <Col md={12} sm={24} xs={24}>
          <Card style={{ marginTop: 16 }}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={mentor.name}
            />
            <p>{mentor.email}</p>
            <Row align="middle">
              <Col span={12}>
                <Button
                  onClick={() => {
                    viewmentor(mentor);
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
                <a href={mentor.profileurl} target="_blank" rel="noreferrer">
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
              title="Mentee Details"
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
                    <Col span={12}>{selectedMentee.name}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <h4>Email : </h4>
                    </Col>
                    <Col span={12}>{selectedMentee.email}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <h4>Qualifications : </h4>
                    </Col>
                    <Col span={12}>{selectedMentee.qualifications}</Col>
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
                  <Row>
                    <Col span={24}>
                      <h4>Reviews</h4>
                    </Col>
                  </Row>
                  {reviews.map((review) => {
                    return (
                      <Row style={{ marginTop: "10px" }} key={review._id}>
                        <Col span={24}>
                          <Card
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <p>{review.message}</p>
                            <Row>
                              <Col span={12}>
                                <p
                                  style={{
                                    color: "gray",
                                  }}
                                >
                                  Reviewed By: {review.mentor.name}
                                </p>
                              </Col>
                              <Col span={12}>
                                <p
                                  style={{
                                    color: "gray",
                                  }}
                                >
                                  {review.mentor.email}
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
