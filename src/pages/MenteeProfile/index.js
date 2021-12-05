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
  message,
} from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;

const MenteeProfile = (props) => {
  const skillssChanges = () => {
    const mentee = localStorage.getItem("mentee");
    console.log(mentee);
    axios
      .put(`mentee/skills/${mentee}`, {
        skills: skills,
      })
      .then((response) => {
        console.log(response.data);
        message.success("Skills posted");
      })
      .catch((err) => {
        console.log(err);
        message.error("Some error occured");
      });
  };

  const profileChanges = () => {
    const mentee = localStorage.getItem("mentee");
    console.log(mentee);
    axios
      .put(`mentee/${mentee}`, {
        profileHeading: profileHeading,
      })
      .then((response) => {
        console.log(response.data);
        message.success("Heading posted");
      })
      .catch((err) => {
        console.log(err);
        message.error("Some error occured");
      });
  };
  const profileChangesurl = () => {
    const mentee = localStorage.getItem("mentee");
    console.log(mentee);
    axios
      .put(`mentee/${mentee}`, {
        profileurl: profileurl,
      })
      .then((response) => {
        console.log(response.data);
        message.success("Url posted");
      })
      .catch((err) => {
        console.log(err);
        message.error("Some error occured");
      });
  };

  const profileChangesquali = () => {
    const mentee = localStorage.getItem("mentee");
    console.log(mentee);
    axios
      .put(`mentee/${mentee}`, {
        qualifications: qualifications,
      })
      .then((response) => {
        console.log(response.data);
        message.success("qualification posted");
      })
      .catch((err) => {
        console.log(err);
        message.error("Some error occured");
      });
  };

  const createReview = () => {
    console.log(selectedMentor);
    const reviewobj = {};
    reviewobj.message = review;
    reviewobj.mentee = mentee._id;
    axios
      .put(`mentor/reviews/${selectedMentor.mentor._id}`, {
        review: reviewobj,
      })
      .then((response) => {
        console.log(response.data);
        message.success("Review posted");
      })
      .catch((err) => {
        console.log(err);
        message.error("Some error occured");
      });
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
        setSkills(response.data.skills);
        setProfileHeading(response.data.profileHeading);
        setQualifications(response.data.qualifications);
        setUrl(response.data.profileurl);
        setMentors(response.data.mentors);
      })
      .catch((err) => {
        if (!!err.response && err.response.status === 401) {
          setTimeout(() => {
            window.location.pathname = "/";
          }, 1000);
        }
      });
  }, []);

  const viewmentor = (mentor) => {
    setSelectedMentor(mentor);
    console.log(mentor);

    axios
      .get(`mentor/review/${mentor.mentor._id}`)
      .then((response) => {
        console.log(response.data.review);
        setReviews(response.data.review);
      })
      .catch((err) => {
        console.log(err);
        message.error("Some error occured");
      });
  };

  const [profileurl, setUrl] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [review, setReview] = useState("");
  const [profileHeading, setProfileHeading] = useState("");
  const [badges, setBadges] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [skills, setSkills] = useState("");
  const [mentee, setmentee] = useState("");
  const [selectedMentor, setSelectedMentor] = useState({});
  const [mentorModal, toggleMentorModal] = useState(false);

  let BadgesList = badges.map((badge) => {
    return (
      <React.Fragment key={badge._id} style={{ marginTop: "16px" }}>
        <Col md={7} sm={23} xs={23}>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src={`data:image/${
                  badge.image.contentType
                };base64,${new Buffer.from(badge.image.data).toString(
                  "base64"
                )}`}
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
        <Col span={1} />
      </React.Fragment>
    );
  });
  let mentorList = mentors.map((mentor, index) => {
    return (
      <React.Fragment key={index}>
        <Col md={11} sm={23} xs={23}>
          <Card style={{ marginTop: 16 }}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={mentor.mentor.name}
            />
            <p>{mentor.mentor.email}</p>
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
        <Col span={1} />
      </React.Fragment>
    );
  });

  return (
    <>
      <Layout>
        <SideMenu isMentor={props?.location?.pathname === "/mentorprofile"} />
        <Layout style={{ backgroundColor: "white" }}>
          <Content
            style={{
              height: "100vh",
              marginLeft: "200px",
              padding: "50px",
            }}
          >
            <S.Heading>Profile</S.Heading>
            <br />
            <br />
            <Row align="middle">
              <Col span={8} style={{ textAlign: "center" }}>
                <h3>Name :</h3>
              </Col>
              <Col span={16}>
                <h3>{mentee.name}</h3>
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={8} style={{ textAlign: "center" }}>
                <h3>Email :</h3>
              </Col>
              <Col span={16}>
                <h3>{mentee.email}</h3>
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={8} style={{ textAlign: "center" }}>
                <h3>Qualifications</h3>
              </Col>
              <Col span={14}>
                <Input
                  type="text"
                  placeholder="Add Qualifications"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                />
              </Col>
              <Col span={2}>
                <CheckCircleOutlined
                  style={{ fontSize: 24 }}
                  onClick={profileChangesquali}
                />
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={8} style={{ textAlign: "center" }}>
                <h3>LinkedIn Url</h3>
              </Col>
              <Col span={14}>
                <Input
                  type="text"
                  placeholder="Add Url"
                  value={profileurl}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Col>
              <Col span={2}>
                <CheckCircleOutlined
                  style={{ fontSize: 24 }}
                  onClick={profileChangesurl}
                />
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={8} style={{ textAlign: "center" }}>
                <h1>YOUR COIN BALANCE</h1>
              </Col>
              <Col span={16}>
                {mentee.totalCoins && <h1>{mentee.totalCoins.current}</h1>}
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={8} style={{ textAlign: "center" }}>
                <h3>Skills</h3>
              </Col>
              <Col span={14}>
                <Input
                  type="text"
                  placeholder="Add Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </Col>
              <Col span={2}>
                <CheckCircleOutlined
                  style={{ fontSize: 24 }}
                  onClick={skillssChanges}
                />
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
                  value={profileHeading}
                  onChange={(e) => setProfileHeading(e.target.value)}
                />
              </Col>
              <Col span={2}>
                <CheckCircleOutlined
                  style={{ fontSize: 24 }}
                  onClick={profileChanges}
                />
              </Col>
            </Row>

            <Modal
              title="Mentor Details"
              centered
              visible={mentorModal}
              footer={null}
              onOk={() => toggleMentorModal(false)}
              onCancel={() => toggleMentorModal(false)}
            >
              {selectedMentor.mentor && (
                <div>
                  <Row>
                    <Col span={12}>
                      <h4>Name : </h4>
                    </Col>
                    <Col span={12}>{selectedMentor.mentor.name}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <h4>Email : </h4>
                    </Col>
                    <Col span={12}>{selectedMentor.mentor.email}</Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <h4>Qualifications : </h4>
                    </Col>
                    <Col span={12}>{selectedMentor.mentor.qualifications}</Col>
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
                                  Reviewd By: {review.mentee.name}
                                </p>
                              </Col>
                              <Col span={12}>
                                <p
                                  style={{
                                    color: "gray",
                                  }}
                                >
                                  {review.mentee.email}
                                </p>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    );
                  })}
                  <Row>
                    <Col span={24}>
                      <Input
                        type="text"
                        placeholder="Write Review of Mentor"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Button onClick={createReview}>Submit</Button>
                </div>
              )}

              <br />
            </Modal>
            <br />
            <br />
            <Row>
              <Col span={24}>
                <h2>My Mentors</h2>
              </Col>
            </Row>
            <Row>{mentorList}</Row>
            <br />
            <br />
            <h2>My Badges</h2>
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
