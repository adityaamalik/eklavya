import React, { useEffect, useState } from "react";
import {
  Input,
  Layout,
  Row,
  Col,
  Button,
  Divider,
  Card,
  Avatar,
  Select,
} from "antd";
import axios from "axios";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Content } = Layout;
const { Option } = Select;

const Queries = () => {
  const handleCategoryFilter = (value) => {
    console.log(value);
    setCategoryID(value);
    axios
      .get(`/mentor/questionList/${value}`, {
        params: {
          category: value,
        },
      })
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data);
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
  const [questions, setQuestions] = useState([]);
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

  let questionList = questions.map((question) => {
    return (
      <div>
        <Card
          style={{ marginTop: 16 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          {question.question}
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Question title"
            description="Question description"
          />
        </Card>
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
            <S.Heading>What's troubling you ?</S.Heading>
            <Row>
              <Col span={22}>
                <Input type="text" placeholder="Your question" />
              </Col>
              <Col span={2}>
                <Button disabled>POST</Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={24}>
                <Card title="Select a category for your question">
                  {categoryList}
                </Card>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={12}>
                <h1>Here's what your peers are asking about !</h1>
              </Col>
              <Col span={12}>
                <Select
                  placeholder="Filter by category"
                  style={{ width: 300 }}
                  onChange={handleCategoryFilter}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Col>
            </Row>

            {/* <Card
              style={{ marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Question title"
                description="Question description"
              />
            </Card>
            <Card
              style={{ marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Question title"
                description="Question description"
              />
            </Card>
            <Card
              style={{ marginTop: 16 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Question title"
                description="Question description"
              />
            </Card> */}
            {questionList}
            <br />
            <br />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Queries;
