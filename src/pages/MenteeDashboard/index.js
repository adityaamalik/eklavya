import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Row, Col, Divider, Card, Avatar } from "antd";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Meta } = Card;
const { Content } = Layout;

const MenteeDashboard = () => {
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
            window.location.pathname = "/";
          }, 1000);
        }
      });
  };

  useEffect(() => {
    console.log(categoryID);
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
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [categoryID, setCategoryID] = useState("asd");

  let categoryList = categories.map((category) => {
    return (
      <div onClick={() => handleCategoryFilter(category._id)}>
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

  let mentorList = mentors.map((mentor) => {
    return (
      <div>
        <Col span={7}>
          <Card style={{ marginTop: 16 }}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={mentor.name}
              description="Mentor description"
            />
            {mentor.name}
          </Card>
        </Col>
      </div>
    );
  });
  return (
    <>
      <Layout>
        <SideMenu />
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
              <Col md={24}>
                <Card title="Select a category to find your ideal mentor">
                  {/* <Card.Grid
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
                  
                  */}

                  {categoryList}
                </Card>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={24}>
                <h1>Here are your perfect mentors !</h1>
              </Col>
            </Row>

            <Row>
              {/* <Col span={7}>
                <Card style={{ marginTop: 16 }}>
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Mentor Name"
                    description="Mentor description"
                  />
                </Card>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Card style={{ marginTop: 16 }}>
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Mentor Name"
                    description="Mentor description"
                  />
                </Card>
              </Col>
              <Col span={1}></Col>
              <Col span={7}>
                <Card style={{ marginTop: 16 }}>
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="Mentor Name"
                    description="Mentor description"
                  />
                </Card>
              </Col>
              <Col span={1}></Col> */}
              {mentorList}
            </Row>

            <br />
            <br />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MenteeDashboard;
