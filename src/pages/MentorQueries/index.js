import React, { useEffect, useState } from "react";

import { Layout, Card, Avatar, Select } from "antd";
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

const MentorQueries = () => {
    const [questions, setQuestions] = useState([]);
    const [categoryID, setCategoryID] = useState("");

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
                        avatar={
                            <Avatar src="https://joeschmoe.io/api/v1/random" />
                        }
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
                        <S.Heading>Go ahead, spread your knowledge !</S.Heading>

                        {questionList}
                        <br />
                        <br />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default MentorQueries;
