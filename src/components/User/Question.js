import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
    const { data, index } = props;

    const [isPreviewImage, setIsPreviewImage] = useState(false);

    if (_.isEmpty(data)) {
        return <></>;
    }

    const handleHandleCheckBox = (event, answerID, questionID) => {
        props.handleCheckBox(answerID, questionID);
    };
    return (
        <>
            {data.image ? (
                <div className="question-image">
                    <img
                        src={`data:image/jpeg;base64, ${data.image}`}
                        onClick={() => setIsPreviewImage(true)}
                        style={{ cursor: "pointer" }}
                    />
                    {isPreviewImage === true && (
                        <Lightbox
                            image={`data:image/jpeg;base64, ${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}
                        ></Lightbox>
                    )}
                </div>
            ) : (
                <div className="question-image"></div>
            )}

            <div className="question">
                Question {index + 1}: {data.questionDescription} ?
            </div>
            <div className="answer">
                {data.answers &&
                    data.answers.length &&
                    data.answers.map((answer, index) => {
                        return (
                            <div
                                key={`answers-${index}`}
                                className="answer-child"
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={answer.isSelected}
                                        onChange={(event, questionID) =>
                                            handleHandleCheckBox(
                                                event,
                                                answer.id,
                                                data.questionID
                                            )
                                        }
                                    />
                                    <label className="form-check-label">
                                        {answer.description}
                                    </label>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Question;
