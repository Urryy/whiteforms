import React, { useEffect, useState } from "react";

import './answerform.css';
import { Button, Typography } from "@material-ui/core";
import { useStateValue } from "../../reduce/stateprovider";
import { AnswerProps, QuestionProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { Option } from "./optionsform/option";
import { QuestionHeaderImage } from "../questionform/questionheaderimage/questionheaderimage";

export const AnswerForm = () => {
    const [
        { questions, doc_name, doc_desc, doc_name_classNames, doc_name_element_style, doc_desc_classNames, doc_desc_element_style, kolontitul_image }, 
        dispatch
    ] = useStateValue()

    const [answer,setAnswer] = useState<AnswerProps[]>([])
    const quest = [];

    const navigate = useNavigate();

    useEffect(()=>{
        questions!.map((q) => {
            answer.push({ questionText: q.questionText, answer : " " })     
        })

        questions!.map((q) => {
            quest.push({"header": q.questionText, "key": q.questionText })
        }
    )},[])

    function select(text: string, optAnswer: string){
        let k = answer.findIndex((ele)=>(ele.questionText === text));
        answer[k].answer= optAnswer;
        setAnswer(answer);
    }

    function selectinput(text: string, optAnswer: string){
        let k =answer.findIndex((ele)=>(ele.questionText === text));
        answer[k].answer = optAnswer;
        setAnswer(answer);
    }

    function selectcheck(e: boolean,text: string, optAnswer: string){
        let newAnswers: string[] =[]
        let k =answer.findIndex((ele)=>(ele.questionText === text))
        if(answer[k].answer){
            newAnswers = answer[k].answer.split(",")
        }

        if(e === true){
            newAnswers.push(optAnswer)
        }
        else{
            let n = newAnswers.findIndex(el =>el === optAnswer)
            newAnswers.splice(n,1)
        }
        answer[k].answer = newAnswers.join(",");
        setAnswer(answer)
    }

    function handleSubmit(){
        /* let answerData: AnswerProps[] = [];
        answer.map(ele=>{
            answerData[ele.questionText] = ele.answer
        })
           
        axios.post(`http://localhost:9000/student_response/${doc_name}`,{
            "column": quest,
            "answer_data" :[post_answer_data]
        }) */
        
        navigate(`/submitted`)
    }

    function getQuestionText(question: QuestionProps){
        let req = question.required ? '<span class="required">*</span>' : ''
        return question.questionText + req
    }

    return (
        <>
        <div className="submit">
            <div className="user_form">
                <div className="user_form_section">
                    <QuestionHeaderImage image={kolontitul_image}/>
                    
                    <div className="user_title_section">
                        <p className={"answer_form_name" + doc_name_classNames?.join(' ')} dangerouslySetInnerHTML={{__html: doc_name!}}
                            style={{fontSize: `${doc_name_element_style?.fontSize}pt`, fontFamily: `${doc_name_element_style?.fontFamily}` }}>
                        </p>
                        <p className={"answer_form_desc" + doc_desc_classNames?.join(' ')} dangerouslySetInnerHTML={{__html: doc_desc!}}
                            style={{fontSize: `${doc_desc_element_style?.fontSize}pt`, fontFamily: `${doc_desc_element_style?.fontFamily}`}}>
                        </p>
                    </div>

                    {questions!.map((question, qindex)=>(
                        <div className="user_form_questions">
                            <p className={"use_form_title " + question.classNames.join(" ")}
                                        style={{fontSize: question.elementStyle.fontSize, fontFamily: question.elementStyle.fontFamily}}
                                        dangerouslySetInnerHTML={{__html: getQuestionText(question) }}>
                            </p>
                            <Option question={question}/>
                        </div>
                    ))}         
                    
                    {/* <div className="user_form_submit">
                        <Button  variant="contained" color="primary" onClick={handleSubmit} style={{fontSize:"14px"}}>Завершить</Button>
                    </div> */}
                    <div className="user_footer">
                        WHITE FORMS
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}