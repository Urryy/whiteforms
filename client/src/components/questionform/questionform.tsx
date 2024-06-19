import React, { FC, createRef, useEffect, useState } from "react";
import './questionform.css';
import { Accordion, Button, IconButton, TextField } from "@material-ui/core";
import { DragIndicator } from "@mui/icons-material";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { AxiosData, QuestionProps, StateProps } from "../../interfaces/interfaces";
import { QuestionPanel } from "./questionpanel/questionpanel";
import { QuestionEditor } from "./questioneditor/questioneditor";
import { QuestionToolbar } from "./questiontoolbar/questiontoolbar";
import { QuestionAnswerKey } from "./questionanswerkey/questionanswerkey";
import { createAPIEndpointService } from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../reduce/stateprovider";
import { actionTypes } from "../../reduce/reducer";
import { QuestionFormsProps } from "../tabs/tabs";
import { useTextContext } from "../../contexts/TextContext";
import { QuestionTypeConst } from "../../interfaces/consts";
import { QuestionDescription } from "./questiondescription/QuestionDescription";
import { QuestionImage } from "./questionimage/questionimage";
import { FormToolbar } from "../formtoolbar/formtoolbar";
import { QuestionHeaderImage } from "./questionheaderimage/questionheaderimage";
import * as htmlToImage from "html-to-image";
import { CustomizedInput } from "../customizedinput/customizedinput";
import { QuestionComponent } from "./question/question";
import { Skeleton } from "@mui/material";
import { useFormContext } from "../../contexts/FormContxet";

export const QuestionForm: FC<QuestionFormsProps> = ({questions, setQuestions, isOpenToolbar, setIsOpenToolbar}) => {
    const { id } = useParams();
    const [{}, dispatch] = useStateValue();
//const axiosData = useState<AxiosData<>>
    const [isLoading, setIsLoading] = useState(false);

    const ref = createRef<any>();
    const textContext = useTextContext();
    const formContext = useFormContext();

    const [documentName, setDocumentName] = useState<string>("Новая форма");
    const [documentDesc, setDocumentDesc] = useState<string>("Описание формы");

    const [documentNameClassNames, setDocumentNameClassNames] = useState<string[]>([]);
    const [documentDescClassNames, setDocumentDescClassNames] = useState<string[]>([]);

    const [headerImage, setHeaderImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const takeScreenShot = async (node: any) => {
        const data = await htmlToImage.toJpeg(node);
        return data;
    }

    const downloadScreenshot = () => takeScreenShot(ref.current).then(res => setPreviewImage(res));

    useEffect(() => {
        console.log(formContext);
        if(formContext.formId || id){
            setIsLoading(true);
            let srvcApi = createAPIEndpointService(`form`)
            srvcApi.fetchById((formContext.formId === '' || formContext.formId !== id) ? id! : formContext.formId)
            .then(res => {
                if(res.status === 200 && res.data){
                    setDocumentName(res.data.name);
                    setDocumentDesc(res.data.description);
                    textContext.setFontKolontitul(res.data.nameElementStyle.fontFamily);
                    textContext.setSizeKolontitul(res.data.nameElementStyle.fontSize);
                    textContext.setFontQuestionText(res.data.questionElementStyle.fontFamily);
                    textContext.setSizeQuestionText(res.data.questionElementStyle.fontSize);
                    textContext.setFontOptionText(res.data.descriptionElementStyle.fontFamily);
                    textContext.setSizeOptionText(res.data.descriptionElementStyle.fontSize);
                    formContext.setFormId(res.data.id);
                    setQuestions(res.data.questions);
                    setDocumentNameClassNames(res.data.nameClassNames);
                    setDocumentDescClassNames(res.data.descriptionClassNames);
                    setHeaderImage(res.data.kolontitulImage);
                    setPreviewImage(res.data.previewImage);
                    setIsLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            if(questions.length === 0){
                setQuestions([{
                    questionText: "Вопрос без заголовка",
                    questionType: "radio",
                    options: [
                        {optionText: "Вариант 1", elementStyle: { fontFamily: textContext.fontOptionText, fontSize: textContext.sizeOptionText }}
                    ],
                    points: 0,
                    answerKey: '',
                    answer: false,
                    open: true,
                    required: false,
                    startScaleValue: 1,
                    descStartScaleValue: null,
                    endScaleValue: 5,
                    classNames: [],
                    descEndScaleValue: null,
                    elementStyle: { fontFamily: textContext.fontQuestionText, fontSize: textContext.sizeQuestionText }
                }]);
            }
        }  

        let initialState: StateProps = { 
            questions: questions, doc_name: documentName, doc_desc: documentDesc, 
            doc_name_element_style: { fontFamily: textContext.fontKolontitul, fontSize: textContext.sizeKolontitul }, 
            doc_desc_element_style: { fontFamily: textContext.fontOptionText, fontSize: textContext.sizeOptionText }, 
            doc_name_classNames: documentNameClassNames, doc_desc_classNames: documentDescClassNames, 
            kolontitul_image: headerImage, preview_image: previewImage
        }

        dispatch({ type: actionTypes.SET_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC, state: initialState});
        dispatch({ type: actionTypes.SET_QUESTIONS, state: initialState});
        dispatch({ type: actionTypes.SET_STYLE_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_STYLE_DOC_DESC, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_NAME_CLASSNAMES, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC_CLASSNAMES, state: initialState});
        dispatch({ type: actionTypes.SET_KOLONTITUL_IMAGE, state: initialState})
        dispatch({ type: actionTypes.SET_PREVIEW_IMAGE, state: initialState});
    }, [])

    function onDragEndResult(result: DropResult){
        if(!result.destination){
            return;
        }
        var ques = [...questions];
        const reorderQues = reorder(ques, result.source.index, result.destination.index);
        setQuestions(reorderQues);
    }

    function reorder(ques: QuestionProps[], startIndex: number, endIndex: number ): QuestionProps[]{
        const result = Array.from(ques);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    function saveForm(){
        downloadScreenshot();
        let initialState: StateProps = { 
            questions: questions, 
            doc_name: documentName, 
            doc_desc: documentDesc, 
            doc_name_classNames: documentNameClassNames,
            doc_desc_classNames: documentDescClassNames,
            doc_name_element_style: { fontFamily: textContext.fontKolontitul, fontSize: textContext.sizeKolontitul },
            doc_desc_element_style: { fontFamily: textContext.fontOptionText, fontSize: textContext.sizeOptionText },
            kolontitul_image: headerImage,
            preview_image: previewImage
        };
        dispatch({ type: actionTypes.SET_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC, state: initialState});
        dispatch({ type: actionTypes.SET_QUESTIONS, state: initialState});
        dispatch({ type: actionTypes.SET_STYLE_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_STYLE_DOC_DESC, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_NAME_CLASSNAMES, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC_CLASSNAMES, state: initialState});
        dispatch({ type: actionTypes.SET_KOLONTITUL_IMAGE, state: initialState})
        dispatch({ type: actionTypes.SET_PREVIEW_IMAGE, state: initialState});

        let srvcApi = createAPIEndpointService('form');
        if(formContext.formId){
            srvcApi.patch({
                id: formContext.formId,
                name: documentName, 
                description: documentDesc, 
                questions: questions,
                nameClassNames: documentNameClassNames,
                descriptionClassNames: documentDescClassNames,
                kolontitulImage: headerImage,
                previewImage: previewImage,
                nameElementStyle: { fontFamily: textContext.fontKolontitul, fontSize: textContext.sizeKolontitul },
                descriptionElementStyle: { fontFamily: textContext.fontOptionText, fontSize: textContext.sizeOptionText }
            })
            .then(res => {
                if(res.status === 200){
                    formContext.setFormId(res.data.formId);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }else{
            srvcApi.post({
                name: documentName, 
                description: documentDesc, 
                questions: questions,
                nameClassNames: documentNameClassNames,
                descriptionClassNames: documentDescClassNames,
                kolontitulImage: headerImage,
                previewImage: previewImage,
                nameElementStyle: { fontFamily: textContext.fontKolontitul, fontSize: textContext.sizeKolontitul },
                descriptionElementStyle: { fontFamily: textContext.fontOptionText, fontSize: textContext.sizeOptionText }
            })
            .then(res => {
                if(res.status === 200){
                    formContext.setFormId(res.data.formId);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <>
        <div className="question_form">
            <div className="section" ref={ref}>
                <QuestionHeaderImage image={headerImage}/>
                <div className="question_title_section">
                    <div className="question_form_top">
                        <CustomizedInput id="DocumentName" standardClassName="question_form_top_name" classNames={documentNameClassNames} setClassNames={setDocumentNameClassNames} 
                            inputText={documentName} setInputText={setDocumentName} fontFamily={textContext.fontKolontitul} fontSize={textContext.sizeKolontitul}/>
                        <CustomizedInput id="DocumentDescription" standardClassName="question_form_top_desc" classNames={documentDescClassNames} setClassNames={setDocumentDescClassNames} 
                            inputText={documentDesc} setInputText={setDocumentDesc} fontFamily={textContext.fontOptionText} fontSize={textContext.sizeOptionText}/>
                    </div>
                </div>
                <DragDropContext onDragEnd={(e) => onDragEndResult(e)}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {isLoading 
                                ? Array.from(new Array(3)).map(i => 
                                <div className="skeleton_wrapper">
                                    <Skeleton variant="rounded" height={50} style={{margin: '10px 0'}}/>
                                    <Skeleton variant="rounded" height={140} style={{margin: '10px 0'}}/>
                                </div>) 
                                : questions.map((ques, i) => <QuestionComponent question={ques} index={i} questions={questions} setQuestions={setQuestions}/>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="save_form">
                    <Button variant="contained" color="primary" onClick={saveForm}>Сохранить</Button>
                </div>
            </div>
        </div>
        <FormToolbar isOpen={isOpenToolbar} setIsOpen={setIsOpenToolbar} questionsForm={questions} 
            setQuestionsForm={setQuestions} setHeaderImage={setHeaderImage} headerImage={headerImage}/>
        </>
    );
}