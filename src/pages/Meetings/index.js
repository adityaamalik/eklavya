import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Layout,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Input,
  message,
  DatePicker,
  Radio,
} from "antd";
import moment from "moment";
import * as S from "./styles";
import SideMenu from "../../components/SideMenu";

const { Content } = Layout;

const Meetings = (props) => {
  const [createMeetingModal, toggleCreateMeetingModal] = useState(false);

  const onOk = (value) => {
    console.log("onOk : ", value._d);
    setDate(value._d);
  };

  useEffect(() => {
    const mentee = localStorage.getItem("mentee");
    axios
      .get(`/mentee/${mentee}`)
      .then((response) => {
        console.log(response.data.mentors);
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
      .get(`/mentee/meeting/${mentee}`)
      .then((response) => {
        setMeetings(response.data);
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

  const createmeeting = () => {
    if (mentorID === "") {
      message.error("Please select A Mentor");
    }
    axios
      .post(`/mentee/meeting/${localStorage.getItem("mentee")}`, {
        mentee: localStorage.getItem("mentee"),
        message: messages,
        mentor: mentorID,
        url: url,
        date: date,
      })
      .then((res) => {
        message.success("Meeting posted");
      })
      .catch((err) => {
        message.error("Could not post Meeting");
      });
  };
  const [meetings, setMeetings] = useState([]);
  const [mentorID, setMentorID] = useState("");
  const [messages, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const [mentors, setMentors] = useState([]);
  const handleMenteeChoose = (value) => {
    setMentorID(value);
  };
  //   isMentor={props?.location?.pathname === "mentormeetings"}

  let MeetingsList = meetings.map((meeting) => {
    return (
      <div>
        <Card style={{ marginTop: 16 }}>
          <Row>
            <Col span={24}>
              <h2>Meeting Details</h2>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <strong>Date</strong> :{" "}
              {moment(meeting.date).format("Do MMMM YYYY")}
            </Col>
            <Col span={12}>
              <strong>Time</strong> :{" "}
              {moment(meeting.date).format(" HH:mm:ss ")}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <strong>Mentee Name</strong> :{meeting.mentee.name}
            </Col>
            <Col span={12}>
              <strong>Mentor Name</strong>: {meeting.mentor.name}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <strong>Message</strong> :{meeting.message}
            </Col>
          </Row>
          <br />
          <a target="_blank" rel="noreferrer" href={meeting.url}>
            Join Now
          </a>
        </Card>
      </div>
    );
  });

  let categoryDropdown = mentors.map((mentor, index) => {
    return (
      <Radio.Button key={index} value={mentor.mentor._id}>
        {mentor.mentor.name}
      </Radio.Button>
    );
  });
  return (
    <>
      <Layout>
        <SideMenu isMentor={props?.location?.pathname === "/mentormeetings"} />

        <Layout>
          <Content
            style={{
              height: "100vh",
              marginLeft: "200px",
              padding: "50px",
            }}
          >
            <Modal
              title="Create a new meeting"
              centered
              visible={createMeetingModal}
              footer={null}
              onOk={() => toggleCreateMeetingModal(false)}
              onCancel={() => toggleCreateMeetingModal(false)}
            >
              <Input
                type="text"
                placeholder="Meeting URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <br />
              <br />
              <Input
                type="text"
                placeholder="What's this meeting about ?"
                value={messages}
                onChange={(e) => setMessage(e.target.value)}
              />
              <br />
              <br />
              <h3>Choose A Mentor</h3>
              <Radio.Group onChange={(e) => handleMenteeChoose(e.target.value)}>
                {categoryDropdown}
              </Radio.Group>

              <br />
              <br />
              <DatePicker showTime onOk={onOk} />
              <br />
              <br />
              <Button onClick={createmeeting}>Create</Button>
            </Modal>
            <Row>
              <Col span={12}>
                <S.Heading>Scheduled Meetings</S.Heading>
              </Col>
              <Col span={12}>
                <Button
                  onClick={() => toggleCreateMeetingModal(true)}
                  style={{ marginTop: "15px" }}
                >
                  + Create New Meeting
                </Button>
              </Col>
            </Row>
            {MeetingsList}
            <br />
            <br />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Meetings;
