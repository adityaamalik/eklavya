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
  Radio,
} from "antd";
import axios from "axios";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";
import moment from "moment";

const { Meta } = Card;
const { Content } = Layout;
const { Option } = Select;

const MenteeQueries = (props) => {
  const handleCategoryFilter = (value) => {
    axios
      .get(`/mentee/questionList/${value}`, {
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
    const mentor = localStorage.getItem("mentor");
    setMentor(mentor);
    axios
      .get(`/mentor/category`)
      .then((response) => {
        setCategories(response.data);
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
  const [question, setQuestion] = useState("");
  const [questionModal, setQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [mentor, setMentor] = useState("");

  const categoryList = categories.map((category) => {
    return (
      <div key={category._id} onClick={() => setCategoryID(category._id)}>
        <Card.Grid
          style={{
            width: "32%",
            margin: "5px",
            textAlign: "center",
            color: category._id === categoryID ? "#1890FF" : "black",
            cursor: "pointer",
          }}
        >
          {category.name}
        </Card.Grid>
      </div>
    );
  });

  const postAnswer = () => {
    console.log(answer);
    axios
      .post(`/mentor/answers/${localStorage.getItem("mentor")}`, {
        answer: answer,
        question: selectedQuestion._id,
      })
      .then((res) => {
        message.success("Answer posted successfully !");
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Cannot post answer !");
        console.log(err.data);
      });
  };

  let categoryDropdown = categories.map((category) => {
    return (
      <Radio.Button key={category._id} value={category._id}>
        {category.name}
      </Radio.Button>
    );
  });

  const handleViewAnswer = (q) => {
    const questionObject = q;
    setQuestionModal(true);
    setSelectedQuestion(questionObject);
  };
  const marksolved = (q) => {
    const questionObject = q;
    axios
      .put(`/mentee/verify/${q._id}`)
      .then((res) => {
        message.success("Verified!");
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Cannot verify!");
        console.log(err.data);
      });
    setSelectedQuestion(questionObject);
  };
  const questionList =
    questions.length === 0 ? (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Select a Category to get questions.</h3>
      </div>
    ) : (
      questions.map((question) => {
        console.log(question);
        return (
          <div key={question._id}>
            <Card
              style={{ marginTop: 16 }}
              actions={[
                <span onClick={() => handleViewAnswer(question)}>
                  View Answers
                </span>,
                <div>
                  {!question.reseloved && question.askedby === mentor && (
                    <span onClick={() => marksolved(question)}>
                      Mark as Solved
                    </span>
                  )}
                </div>,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={question.question}
                description={moment(question.date).format("Do MMM YYYY")}
              />
            </Card>
          </div>
        );
      })
    );

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
            <Modal
              title="Question"
              centered
              visible={questionModal}
              footer={null}
              onOk={() => setQuestionModal(false)}
              onCancel={() => setQuestionModal(false)}
              width={800}
            >
              <h2>{selectedQuestion.question}</h2>
              <div style={{ color: "gray" }}>
                {moment(selectedQuestion.date).format("Do MMM YYYY")}
              </div>
              <hr />
              <span>Answers</span>
              <br />
              <Row>
                <Col span={22}>
                  <Input
                    type="text"
                    placeholder="Your Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </Col>
                <Col style={{ textAlign: "right" }} span={2}>
                  <Button onClick={postAnswer}>Post</Button>
                </Col>
              </Row>
              {selectedQuestion?.answers?.map((answer) => (
                <div key={answer._id}>{answer.answer}</div>
              ))}
            </Modal>
            <S.Heading>Solve Queries and Earn Coins</S.Heading>

            <Divider />
            <Row>
              <Col span={24}>
                <h1>
                  Here's what your peers are asking about ! Please choose a
                  category
                </h1>
                <Radio.Group
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                >
                  {categoryDropdown}
                </Radio.Group>
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

export default MenteeQueries;
