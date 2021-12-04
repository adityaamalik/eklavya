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

const MenteeProfile = (props) => {
  const [createBadgeModal, toggleCreateBadgeModal] = useState(false);

  const handleMenteeChoose = (value) => {
    console.log(value);
  };
  const achivementsChanges = () => {
    const mentee = localStorage.getItem("mentee");
    console.log(mentee);
    axios
      .put(`mentee/achievements/${mentee}`, {
        achievements: achievements,
      })
      .then((response) => {
        console.log(response.data);
        message.success("Achivements posted");
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
      .put(`mentee/review/${mentee}`, {
        achievements: achievements,
      })
      .then((response) => {
        console.log(response.data);
        message.success("Achivements posted");
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
        setAchivementList(response.data.achievements);
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
  const [achievements, setAchivements] = useState("");
  const [review, setReview] = useState("");
  const [profileHeading, setProfileHeading] = useState("");
  const [badges, setBadges] = useState([]);
  const [mentors, setMentors] = useState([]);

  const [AchievementList, setAchivementList] = useState([]);
  const [mentee, setmentee] = useState("");
  const [selectedMentor, setSelectedMentor] = useState({});
  const [mentorModal, toggleMentorModal] = useState(false);

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
      </div>
    );
  });
  let mentorList = mentors.map((mentor, index) => {
    return (
      <React.Fragment key={index}>
        <Col md={12} sm={24} xs={24}>
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
  let AchivementsList = AchievementList.map((Achivement) => {
    return (
      <Row align="end">
        <Col span={12}>
          <h3>{Achivement}</h3>
        </Col>
      </Row>
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
              <Col span={12} style={{ textAlign: "center" }}>
                <h3>Name :</h3>
              </Col>
              <Col span={12}>
                <h3>{mentee.name}</h3>
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={12} style={{ textAlign: "center" }}>
                <h3>Email :</h3>
              </Col>
              <Col span={12}>
                <h3>{mentee.email}</h3>
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={12} style={{ textAlign: "center" }}>
                <h3>Qualifications :</h3>
              </Col>
              <Col span={12}>
                <h3>{mentee.qualifications}</h3>
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={12} style={{ textAlign: "center" }}>
                <h3>LinkedIn Profile URL :</h3>
              </Col>
              <Col span={12}>
                <h3>{mentee.profileurl}</h3>
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={12} style={{ textAlign: "center" }}>
                <h1>YOUR COIN BALANCE</h1>
              </Col>
              <Col span={12}>
                {mentee.totalCoins && <h1>{mentee.totalCoins.current}</h1>}
              </Col>
            </Row>
            <br />
            <Row align="middle">
              <Col span={8} style={{ textAlign: "center" }}>
                <h3>Achivements</h3>
              </Col>
            </Row>
            {AchivementsList}
            <Row align="end">
              <Col span={14}>
                <Input
                  type="text"
                  placeholder="Add achivements"
                  value={achievements}
                  onChange={(e) => setAchivements(e.target.value)}
                />
              </Col>
              <Col span={2}>
                <CheckCircleOutlined
                  style={{ fontSize: 24 }}
                  onClick={achivementsChanges}
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
                  <Row>
                    <Col span={24}>
                      <Input
                        type="text"
                        placeholder="Write Review of Mentor"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </Col>
                    <Button onClick={createReview}>Submit</Button>
                  </Row>
                </div>
              )}

              <br />
            </Modal>
            <Row>
              <Col span={24}>
                <h2>
                  My{" "}
                  {props?.location?.pathname === "/menteeprofile"
                    ? "Mentors"
                    : "Mentees"}
                </h2>
                {mentorList}
              </Col>
            </Row>
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
