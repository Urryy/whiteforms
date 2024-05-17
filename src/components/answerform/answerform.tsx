import React, { useEffect, useState } from "react";

import './answerform.css';
import { Button, Typography } from "@material-ui/core";
import { useStateValue } from "../../reduce/stateprovider";
import { AnswerProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export const AnswerForm = () => {
    const [{ questions, doc_name, doc_desc }, dispatch] = useStateValue()
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

    return (
        <>
        <div className="submit">
            <div className="user_form">
                <div className="user_form_section">
                    <div className="user_title_section">
                        <Typography style={{fontSize:"26px"}} >{doc_name}</Typography>
                        <Typography style={{fontSize:"15px"}} >{doc_desc}</Typography>
                    </div>
                    {questions!.map((question,qindex)=>(
                        <div className="user_form_questions">
                            <Typography className="use_form_title">{qindex+1}. {question.questionText}</Typography>
                            {question.options.map((ques,index)=>(
                                <div key={index} style={{marginBottom:"5px"}}>
                                    <div style={{display: 'flex'}}>
                                        <div className="form-check">
                                            {question.questionType !== "radio" 
                                            ? (question.questionType !== 'text' 
                                                ? (<label>
                                                        <input type={question.questionType} value= {ques.optionText} className="form-check-input"
                                                            required={question.required} onChange={(e)=>{selectcheck(e.target.checked,question.questionText,ques.optionText)}}/> 
                                                            {ques.optionText}
                                                    </label>)
                                                : ( <label>
                                                        <input type={question.questionType} value= {ques.optionText} className="form-check-input" 
                                                            required={question.required} onChange={(e)=>{selectinput(question.questionText,e.target.value)}}/> 
                                                            {ques.optionText}
                                                    </label>))   
                                            :(<label>
                                                <input type={question.questionType} value= {ques.optionText} className="form-check-input"
                                                    required={question.required} onChange={()=>{select(question.questionText,ques.optionText)}}/>
                                                {ques.optionText}
                                             </label>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}         
                    
                    <div className="user_form_submit">
                        <Button  variant="contained" color="primary" onClick={handleSubmit} style={{fontSize:"14px"}}>Заверщить</Button>
                    </div>
                    <div className="user_footer">
                        WHITE FORMS
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}