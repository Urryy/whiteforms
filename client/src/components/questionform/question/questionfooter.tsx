import React, { FC } from "react";
import { QuestionProps } from "../../../interfaces/interfaces";
import { Button, IconButton, Switch } from "@material-ui/core";
import { ArrowOutward, Delete, FilterNone } from "@mui/icons-material";

interface QuestionFooterProps{
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void,
    question: QuestionProps,
    indexQuestion: number
}

export const QuestionFooter: FC<QuestionFooterProps> = ({ questions ,setQuestions, question, indexQuestion }) => {
    function copyQuestion(){
        expandeCloseAll();
        let ques = [...questions];
        let newQuestion = {...ques[indexQuestion]};
        setQuestions([...questions, newQuestion]);
    }

    function deleteQuestion(){
        let ques = [...questions];
        if(ques.length > 1){
            ques.splice(indexQuestion, 1);
        }
        setQuestions(ques);
    }

    function requireQuestion(){
        var ques = [...questions];
        ques[indexQuestion].required = !ques[indexQuestion].required;
        setQuestions(ques); 
    }

    function expandeCloseAll(){
        let ques = [...questions];
        for (let index = 0; index < ques.length; index++) {
            ques[index].open = false;
        }
        setQuestions(ques);
    }
    
    return (
        <>
            <div className="add_footer">
                <div className="add_question_bottom_left">{/*  onClick={()=>addAnswer(index)} */}
                    <Button style={{textTransform: 'none', color: '#4285f4', fontSize: '13px', fontWeight: 600}}>
                        <ArrowOutward style={{border: '2px solid #4285f4', padding: '2px', marginRight: '8px'}}/> 
                        <span>Answere key</span>
                    </Button>
                </div>
                <div className="add_question_bottom_right">
                    <IconButton aria-label="Copy" onClick={copyQuestion}>
                        <FilterNone />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={deleteQuestion}>
                        <Delete />
                    </IconButton>
                    <span className="whitesmoke">
                        <span>Обязательно</span> 
                        <Switch name="checkedA" color="primary" checked={question.required} onClick={requireQuestion}/>
                    </span>
                </div>
            </div>
        </>
    )
}