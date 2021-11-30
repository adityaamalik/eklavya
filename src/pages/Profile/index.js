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

const Profile = (props) => {
  const [createBadgeModal, toggleCreateBadgeModal] = useState(false);
  const handleCategoryFilter = (value) => {
    console.log(value);
    setCategoryID(value);
    axios
      .get(`/mentor/mentors/${value}`, {
        params: {
          category: value,
        },
      })
      .then((response) => {
        console.log(response.data);
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

  const handleMenteeChoose = (value) => {
    console.log(value);
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
      .get(`/mentor/category/6198e265da2c0d17668aec19`)
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
              };base64,${new Buffer.from(category.image.data).toString(
                "base64"
              )}`}
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
  let mentorList = mentors.map((mentor) => {
    return (
      <div>
        <Col span={7}>
          <Card style={{ marginTop: 16 }}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={mentor.mentor.name}
              description="Mentor description"
            />
            {mentor.mentor.name}
          </Card>
        </Col>
      </div>
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
            <Modal
              title="Create a new Badge"
              centered
              visible={createBadgeModal}
              footer={null}
              onOk={() => toggleCreateBadgeModal(false)}
              onCancel={() => toggleCreateBadgeModal(false)}
            >
              <Input type="text" placeholder="Name of this badge" />
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
            {props?.location?.pathname === "/menteeprofile" && (
              <>
                <Row>
                  <Col span={24}>
                    <Card title="What are you good at ?">{categoryList}</Card>
                  </Col>
                </Row>
                <br />
              </>
            )}

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

export default Profile;
