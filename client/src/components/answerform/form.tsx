import React, { useEffect, useState } from "react";
import { FormFillProps, FormFilledProps, QuestionFilledProps, QuestionProps } from "../../interfaces/interfaces";
import { useParams } from "react-router-dom";
import { createAPIEndpointService } from "../../services/ApiService";
import { QuestionHeaderImage } from "../questionform/questionheaderimage/questionheaderimage";
import { Option } from "./optionsform/option";
import { Button, Skeleton } from "@mui/material";
import { ArchiveOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";

export const Form = () => {
    const { id } = useParams();
    const [form, setForm] = useState<FormFillProps | null>(null);

    const [answerForm, setAnswerForm] = useState<FormFilledProps | null>(null);
    const [filledQuestions, setFilledQuestions] = useState<QuestionFilledProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

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

    function validateSubmitFields(){
        let questions = form!.questions;
        for (let index = 0; index < questions.length; index++) {
            const element = questions[index];
            if(element.required){
                let filledQuestion = filledQuestions.find(value => value.questionId === element.id);
                if(!filledQuestion || filledQuestion.answers.length === 0) 
                    return false;
                for (let j = 0; j < filledQuestion.answers.length; j++) {
                    const opt = filledQuestion.answers[j];
                    if(!opt.answerText || opt.answerText === '')
                        return false;
                }
            }
        }

        return true;
    }

    function onSaveForm(){
        if(!answerForm) return;
        if(!validateSubmitFields()) enqueueSnackbar('Не все обязательные поля были заполнены', {variant: 'warning'});

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
                            {question.questionImage && <div style={{width: '100%', display: 'flex', justifyContent: question.imageWrapper?.position}}>
                                <div className="image_wrapper image_wrapper_question" style={{height: `${question.imageWrapper?.height}`, width: `${question.imageWrapper?.width}`}}>
                                    <img alt="image1" src={question.questionImage}/>
                                </div>
                            </div>}
                            <Option question={question} filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions} index={qindex}/>
                        </div>
                    ))}         
                    <div className="user_form_submit">
                        <Button className="submit_btn" onClick={onSaveForm}><span>Отправить</span> <ArchiveOutlined className="archive_icon"/></Button>
                    </div>
                    <div className="user_footer">
                    FORMS
                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}