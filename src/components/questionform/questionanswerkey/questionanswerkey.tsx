import React, { FC } from "react";
import { QuestionProps } from "../../../interfaces/interfaces";
import { AccordionDetails, Button } from "@material-ui/core";
import { ArticleOutlined, ShortText } from "@mui/icons-material";

interface QuestionAnswerKeyProps{
    question: QuestionProps;
    index: number;
    questions: QuestionProps[];
    setQuestions: (stateQuestions: QuestionProps[]) => void;
}

export const QuestionAnswerKey: FC<QuestionAnswerKeyProps> = ({question, index, questions, setQuestions}) => {
    function setOptionAnswer(key: string, index: number){
        let ques = [...questions];
        ques[index].answerKey = key;
        setQuestions(ques);
    }

    function setOptionPoints(points: string, index: number){
        let ques = [...questions];
        ques[index].points = Number(points);
        setQuestions(ques);
    }

    function doneAnswer(index: number){
        let ques = [...questions];
        ques[index].answer = !ques[index].answer;
        setQuestions(ques);
    }

    return (
      <>
        <AccordionDetails className="add_question">
            <div className="top_header">Choose correct answer</div>
            <div>
                <div className="add_question_top">
                    <input type="text" className="question" placeholder="Вопрос" value={question.questionText} disabled/>
                    <input type="number" className="points" min={0} step={1} placeholder="0" onChange={(e) => setOptionPoints(e.target.value, index)}/>
                </div>
                {question.options.map((opt, j) => (
                    <div className="add_question_body" key={j} style={{marginLeft:'8px', marginBottom:'10px', marginTop: '5px'}}>
                        <div key={j}>
                            <div style={{display: 'flex'}}>
                                <div className="form-check">
                                    <label style={{fontSize: '13px'}} onClick={() => setOptionAnswer(opt.optionText, index)}>
                                        {question.questionType !== 'text' 
                                            ? <input type={question.questionType} name={question.questionText} value="option3"
                                            className="form-check-input" required={question.required} style={{margin: '5px 10px 10px 0px'}}/>
                                            : <ShortText style={{marginRight: '10px'}}/>}
                                            {opt.optionText}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="add_question_body">
                    <Button size="small" style={{textTransform: 'none', color: '#4285f4', fontSize: '13px', fontWeight: 600}}>
                        <ArticleOutlined style={{fontSize: '20px', marginRight: '8px'}}/>Add Answer Feedback
                    </Button>
                </div>
                <div className="add_question_bottom_right">
                    <Button variant="outlined" color="primary" onClick={() => doneAnswer(index)}
                        style={{textTransform: 'none', color: '#4285f4', fontSize: '12px', marginTop: '12px', fontWeight: 600}}>
                        Done
                    </Button>
                </div>
            </div>
        </AccordionDetails>
      </>  
    );
}