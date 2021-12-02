import React, { useEffect, useState } from "react";

import {
  Layout,
  Row,
  Col,
  Divider,
  Card,
  Avatar,
  Button,
  Modal,
  message,
  Input,
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

const Queries = (props) => {
  const handleCategoryFilter = (value) => {
    setCategoryID(value);
  };
  const handleCategoryFilter2 = (value) => {
    console.log(value);
    setCategoryID2(value);
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

  const sendQuestion = () => {
    axios
      .post(`/mentee/question/${localStorage.getItem("mentee")}`, {
        askedby: localStorage.getItem("mentee"),
        question: question,
        category: categoryID,
      })
      .then((res) => {
        message.success("Question posted");
      })
      .catch((err) => {
        message.error("Could not post Question");
      });
  };

  useEffect(() => {
    axios
      .get(`/mentor/category`)
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
  const [categoryID, setCategoryID] = useState("");
  const [categoryID2, setCategoryID2] = useState("");
  const [question, setQuestion] = useState("");

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

  let categoryDrop = categories.map((category) => {
    return <Option value={category._id}>{category.name}</Option>;
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
        <SideMenu isMentor={props?.location?.pathname === "/mentorqueries"} />
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
                <Input
                  type="text"
                  placeholder="Your Question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Col>
              <Col span={2}>
                <Button
                  disabled={question === "" || categoryID === ""}
                  onClick={sendQuestion}
                >
                  POST
                </Button>
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
                  onChange={handleCategoryFilter2}
                >
                  {categoryDrop}
                </Select>
              </Col>
            </Row>

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
