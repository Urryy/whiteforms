import React, { useEffect, useState } from "react";

import './answerform.css';
import { useStateValue } from "../../reduce/stateprovider";
import { AnswerProps, QuestionProps } from "../../interfaces/interfaces";
import { Option } from "./optionsform/option";
import { QuestionHeaderImage } from "../questionform/questionheaderimage/questionheaderimage";

export const AnswerForm = () => {
    const [
        { questions, doc_name, doc_desc, doc_name_classNames, doc_name_element_style, doc_desc_classNames, doc_desc_element_style, kolontitul_image }, 
        dispatch
    ] = useStateValue()

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
                        <p className={"answer_form_name " + doc_name_classNames?.join(" ")} dangerouslySetInnerHTML={{__html: doc_name!}}
                            style={{fontSize: `${doc_name_element_style?.fontSize}pt`, fontFamily: `${doc_name_element_style?.fontFamily}` }}>
                        </p>
                        <p className={"answer_form_desc " + doc_desc_classNames?.join(" ")} dangerouslySetInnerHTML={{__html: doc_desc!}}
                            style={{fontSize: `${doc_desc_element_style?.fontSize}pt`, fontFamily: `${doc_desc_element_style?.fontFamily}`}}>
                        </p>
                    </div>

                    {questions!.map((question, qindex)=>(
                        <div className="user_form_questions">
                            <p className={"use_form_title " + question.classNames?.join(" ")}
                                        style={{fontSize: `${question.elementStyle.fontSize}pt`, fontFamily: question.elementStyle.fontFamily}}
                                        dangerouslySetInnerHTML={{__html: getQuestionText(question) }}>
                            </p>
                            {question.questionImage && <div style={{width: '100%', display: 'flex', justifyContent: question.imageWrapper?.position}}>
                                <div className="image_wrapper image_wrapper_question" style={{height: `${question.imageWrapper?.height}`, width: `${question.imageWrapper?.width}`}}>
                                    <img alt="image1" src={question.questionImage}/>
                                </div>
                            </div>}
                            <Option question={question} index={qindex}/>
                        </div>
                    ))}         
                
                    <div className="user_footer">
                        FORMS
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}