import React, { useEffect, useState } from "react";
import { FormFillProps, FormFilledProps, QuestionFilledProps, QuestionProps } from "../../interfaces/interfaces";
import { useParams } from "react-router-dom";
import { createAPIEndpointService } from "../../services/ApiService";
import { QuestionHeaderImage } from "../questionform/questionheaderimage/questionheaderimage";
import { Option } from "./optionsform/option";
import { Button, Skeleton } from "@mui/material";
import { ArchiveOutlined } from "@mui/icons-material";

export const Form = () => {
    const { id } = useParams();
    const [form, setForm] = useState<FormFillProps | null>(null);

    const [answerForm, setAnswerForm] = useState<FormFilledProps | null>(null);
    const [filledQuestions, setFilledQuestions] = useState<QuestionFilledProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let srvcApi = createAPIEndpointService(`form`)
            srvcApi.fetchById(id!)
            .then(res => {
                if(res.status === 200 && res.data){
                    setForm({
                        formId: res.data.id,
                        documentName: res.data.name,
                        documentDesc: res.data.description,
                        documentNameClassNames: res.data.nameClassNames,
                        documentDescClassNames: res.data.descriptionClassNames,
                        documentNameElementStyle: res.data.nameElementStyle,
                        documentDescElementStyle: res.data.descriptionElementStyle,
                        headerImage: res.data.kolontitulImage,
                        questions: res.data.questions
                    })
                    setAnswerForm({
                        formId: res.data.id,
                        filledQuestions: []
                    })
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function getQuestionText(question: QuestionProps){
        let req = question.required ? '<span class="required">*</span>' : ''
        return question.questionText + req
    }

    function onSaveForm(){
        if(!answerForm) return;

        let model: FormFilledProps = {formId: answerForm.formId, filledQuestions: filledQuestions} 
        let srvcApi = createAPIEndpointService(`answerform`)
        srvcApi.post(model)
            .then(res => {
                if(res.status === 200 && res.data){
                    console.log('success');
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
        {isLoading 
        ? Array.from(new Array(3)).map(i => 
            <div className="skeleton_wrapper">
                <Skeleton variant="rounded" height={50} style={{margin: '10px 0'}}/>
                <Skeleton variant="rounded" height={140} style={{margin: '10px 0'}}/>
            </div>)
        : <div className="submit">
            <div className="user_form">
                <div className="user_form_section">
                    <QuestionHeaderImage image={form?.headerImage}/>
                    <div className="user_title_section">
                        <p className={"answer_form_name " + form?.documentNameClassNames?.join(' ')} dangerouslySetInnerHTML={{__html: form?.documentName!}}
                            style={{fontSize: `${form?.documentNameElementStyle?.fontSize}pt`, fontFamily: `${form?.documentNameElementStyle.fontFamily}` }}>
                        </p>
                        <p className={"answer_form_desc " + form?.documentDescClassNames?.join(' ')} dangerouslySetInnerHTML={{__html: form?.documentDesc!}}
                            style={{fontSize: `${form?.documentDescElementStyle.fontSize}pt`, fontFamily: `${form?.documentDescElementStyle.fontFamily}`}}>
                        </p>
                    </div>
                    {form?.questions!.map((question, qindex)=>(
                        <div className="user_form_questions">
                            <p className={"use_form_title " + question.classNames?.join(" ")}
                                        style={{fontSize: `${question.elementStyle.fontSize}pt`, fontFamily: question.elementStyle.fontFamily}}
                                        dangerouslySetInnerHTML={{__html: getQuestionText(question) }}>
                            </p>
                            <Option question={question} filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions} index={qindex}/>
                        </div>
                    ))}         
                    <div className="user_form_submit">
                        <Button className="submit_btn" onClick={onSaveForm}><span>Сохранить</span> <ArchiveOutlined className="archive_icon"/></Button>
                    </div>
                    <div className="user_footer">
                        WHITE FORMS
                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}