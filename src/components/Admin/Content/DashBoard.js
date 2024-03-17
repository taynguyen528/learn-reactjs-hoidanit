import "./DashBoard.scss";

import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer,
} from "recharts";
import { getOverview } from "../../Services/apiServices";
import { useState, useEffect } from "react";

const Dashboard = (props) => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getOverview();
        console.log("check data: ", res);
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            // process chart data
            let Quiz = 0,
                Question = 0,
                Answers = 0;
            Quiz = res?.DT?.others?.countQuiz ?? 0;
            Question = res?.DT?.others?.countQuestions ?? 0;
            Answers = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    name: "Quizzes",
                    Quiz: Quiz,
                },
                {
                    name: "Questions",
                    Question: Question,
                },
                {
                    name: "Answers",
                    Answers: Answers,
                },
            ];

            setDataChart(data);
        }
    };

    console.log("data overview: ", dataOverview);

    return (
        <div className="dashboard-content">
            <div className="title">Analytics Dashboard</div>
            <div className="content">
                <div className="content-left">
                    <div className="child">
                        <span className="text-1">Total Users</span>
                        <span className="text-2">
                            {dataOverview &&
                            dataOverview.users &&
                            dataOverview.users.total ? (
                                <>{dataOverview.users.total}</>
                            ) : (
                                0
                            )}
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Quiz</span>
                        <span className="text-2">
                            {dataOverview &&
                            dataOverview.others &&
                            dataOverview.others.countQuiz ? (
                                <>{dataOverview.others.countQuiz}</>
                            ) : (
                                0
                            )}
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Questions</span>
                        <span className="text-2">
                            {dataOverview &&
                            dataOverview.others &&
                            dataOverview.others.countQuestions ? (
                                <>{dataOverview.others.countQuestions}</>
                            ) : (
                                0
                            )}
                        </span>
                    </div>
                    <div className="child">
                        <span className="text-1">Total Answers</span>
                        <span className="text-2">
                            {dataOverview &&
                            dataOverview.others &&
                            dataOverview.others.countAnswers ? (
                                <>{dataOverview.others.countAnswers}</>
                            ) : (
                                0
                            )}
                        </span>
                    </div>
                </div>
                <div className="content-right">
                    <ResponsiveContainer width={"90%"} height={"100%"}>
                        <BarChart width={500} height={300} data={dataChart}>
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Quiz" fill="#8884d8" />
                            <Bar dataKey="Question" fill="#82ca9d" />
                            <Bar dataKey="Answers" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
