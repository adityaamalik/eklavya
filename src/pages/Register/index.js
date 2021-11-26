import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./styles";
import { Button, message, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const Register = (props) => {
  useEffect(() => {
    if (
      props?.location?.state?.role === null ||
      props?.location?.state?.role === undefined
    ) {
      window.location.pathname = "/";
    }
  }, [props?.location?.state?.role]);

  useEffect(() => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [profileurl, setProfileUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState("asd");

  const register = () => {
    if (name === "") {
      message.error("Please enter your name !");
    } else if (email === "") {
      message.error("Please enter email !");
    } else if (props?.location?.state?.role === "mentor" && profileurl === "") {
      message.error("Please enter linkedIn Profile !");
    } else if (password === "") {
      message.error("Please enter password !");
    } else if (confirmPassword === "") {
      message.error("Please confirm password !");
    } else if (password !== confirmPassword) {
      message.error("Passwords not matching !");
    } else if (props?.location?.state?.role === "mentor" && categoryID === "") {
      message.error("Please select a category !");
    } else {
      const role = props?.location?.state?.role?.toLowerCase();

      axios
        .post(`/${props?.location?.state?.role}/register`, {
          name: name,
          email: email,
          password: password,
          profileurl: profileurl,
          category: categoryID,
        })
        .then((response) => {
          console.log(response.data);

          localStorage.setItem("Mentor", response.data.mentor._id);
          localStorage.setItem("token", response.data.token);

          props.history.push(`/${role}dashboard`);
        })
        .catch((err) => {
          console.log(err);
          message.error("Some error occured !");
        });
    }
  };

  let categoryList = categories.map((category) => {
    return (
      <div onClick={() => setCategoryID(category._id)}>
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
  return (
    <>
      <S.Container>
        <img src="assets/imgs/attendance.png" height={100} alt="logo" />
        <h1>Welcome {props?.location?.state?.role}</h1>
        <br />
        <h3>Register</h3>
        <br />
        <br />
        <S.AuthInput
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <S.AuthInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        {props?.location?.state?.role === "mentor" && (
          <div>
            <S.AuthInput
              type="text"
              placeholder="LinkedIn Profile URL"
              value={profileurl}
              onChange={(e) => setProfileUrl(e.target.value)}
            />
            <br />
            <br />
          </div>
        )}

        <S.AuthInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <S.AuthInput
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <br />

        {props?.location?.state?.role === "mentor" && (
          <>
            <Row>
              <Col md={4}></Col>
              <Col md={16}>
                <Card title="Select among following categories">
                  {/* <Card.Grid
                    style={{
                      width: "32%",
                      margin: "5px",
                      textAlign: "center",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    Computer Science
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
                    Sports
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
                  </Card.Grid> */}
                  {categoryList}
                </Card>
              </Col>
              <Col md={4}></Col>
            </Row>

            <br />
            <br />
          </>
        )}

        <Button
          disabled={
            name === "" &&
            email === "" &&
            profileurl === "" &&
            password === "" &&
            confirmPassword === ""
          }
          onClick={register}
        >
          Register
        </Button>

        <br />
        <br />
        <Link
          to={{
            pathname: "/login",
            state: { role: props?.location?.state?.role },
          }}
        >
          Already Registered ?
        </Link>
        <br />
        <br />
        <br />
      </S.Container>
    </>
  );
};

export default Register;
