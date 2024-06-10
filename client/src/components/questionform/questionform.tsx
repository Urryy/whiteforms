import React, { FC, useEffect, useState } from "react";
import './questionform.css';
import { Accordion, Button, IconButton, TextField } from "@material-ui/core";
import { DragIndicator, FormatBoldOutlined, FormatItalic, FormatUnderlined, Link } from "@mui/icons-material";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { ElementStyleProps, QuestionProps, StateProps } from "../../interfaces/interfaces";
import { QuestionPanel } from "./questionpanel/questionpanel";
import { QuestionEditor } from "./questioneditor/questioneditor";
import { QuestionToolbar } from "./questiontoolbar/questiontoolbar";
import { QuestionAnswerKey } from "./questionanswerkey/questionanswerkey";
import { createAPIEndpointService } from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../reduce/stateprovider";
import { actionTypes } from "../../reduce/reducer";
import ReactDOM from "react-dom";
import { QuestionFormsProps } from "../tabs/tabs";
import { useTextContext } from "../../contexts/TextContext";
import { LinkModalModelProps, LinkModalWindow } from "../modal/LinkModalWindow";
import { QuestionTypeConst } from "../../interfaces/consts";
import { QuestionDescription } from "./questiondescription/QuestionDescription";
import { QuestionImage } from "./questionimage/questionimage";
import { FormToolbar } from "../formtoolbar/formtoolbar";
import { QuestionHeaderImage } from "./questionheaderimage/questionheaderimage";


export const QuestionForm: FC<QuestionFormsProps> = ({questions, setQuestions, isOpenToolbar, setIsOpenToolbar}) => {
    const {id} = useParams();
    const [{}, dispatch] = useStateValue();

    const [formId, setFormId] = useState();
    const [documentName, setDocumentName] = useState<string>("Новая форма");
    const [documentDesc, setDocumentDesc] = useState<string>("Описание формы");

    const [documentNameElementStyle, setDocumentNameElementStyle] = useState<ElementStyleProps>();
    const [documentDescElementStyle, setDocumentDescElementStyle] = useState<ElementStyleProps>();

    const [documentNameClassNames, setDocumentNameClassNames] = useState<string[]>([]);
    const [documentDescClassNames, setDocumentDescClassNames] = useState<string[]>([]);

    const [headerImage, setHeaderImage] = useState('');

    const [isOpenLinkModel, setIsOpenLinkModal] = useState(false);
    const [elementLink, setElementLink] = useState<LinkModalModelProps | null>(null);

    const textContext = useTextContext();

    useEffect(() => {
        if(id){
            let srvcApi = createAPIEndpointService(`form`)
            srvcApi.fetchById(id!)
            .then(res => {
                if(res.data){
                    setDocumentName(res.data.name);
                    setDocumentDesc(res.data.description);
                    setDocumentNameElementStyle(res.data.documentNameElementStyle);
                    setDocumentDescElementStyle(res.data.DocumentDescElementStyle)
                    setFormId(res.data.id);
                    setQuestions(res.data.questions);
                    setDocumentNameClassNames(res.data.documentNameClassNames);
                    setDocumentDescClassNames(res.data.documentDescClassNames);
                    setHeaderImage(res.data.headerImage);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }  

        let initialState: StateProps = { questions: questions, doc_name: documentName, doc_desc: documentDesc, doc_name_element_style: documentNameElementStyle, 
            doc_desc_element_style: documentDescElementStyle, doc_name_classNames: documentNameClassNames, doc_desc_classNames: documentDescClassNames, 
            kolontitul_image: headerImage}

        dispatch({ type: actionTypes.SET_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC, state: initialState});
        dispatch({ type: actionTypes.SET_QUESTIONS, state: initialState});
        dispatch({ type: actionTypes.SET_STYLE_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_NAME_CLASSNAMES, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC_CLASSNAMES, state: initialState});
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

    function handleExpand(indexQues: number){
        let ques = [...questions];
        for (let index = 0; index < ques.length; index++) {
            if(indexQues === index){
                ques[index].open = true;
            }else{
                ques[index].open = false;
            }
        }
        setQuestions(ques);
    }

    function saveForm(){
        let initialState: StateProps = { 
            questions: questions, 
            doc_name: documentName, 
            doc_desc: documentDesc, 
            doc_name_classNames: documentNameClassNames,
            doc_desc_classNames: documentDescClassNames,
            doc_name_element_style: { fontFamily: textContext.fontKolontitul, fontSize: textContext.sizeKolontitul },
            doc_desc_element_style: { fontFamily: textContext.fontOptionText, fontSize: textContext.sizeOptionText },
            kolontitul_image: headerImage
        };
        dispatch({ type: actionTypes.SET_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC, state: initialState});
        dispatch({ type: actionTypes.SET_QUESTIONS, state: initialState});
        dispatch({ type: actionTypes.SET_STYLE_DOC_NAME, state: initialState});
        dispatch({ type: actionTypes.SET_STYLE_DOC_DESC, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_NAME_CLASSNAMES, state: initialState});
        dispatch({ type: actionTypes.SET_DOC_DESC_CLASSNAMES, state: initialState});
        dispatch({ type: actionTypes.SET_KOLONTITUL_IMAGE, state: initialState})
        console.log(initialState);
        /* let srvcApi = createAPIEndpointService('form');
        srvcApi.post({name: documentName, description: documentDesc, questions: questions})
            .then(res => {
                let initialState: StateProps = { 
                    questions: questions, 
                    doc_name: documentName, 
                    doc_desc: documentDesc, 
                    classNames: documentClassNames,
                    elementStyle: {fontFamily: textContext.fontKolontitul, fontSize: textContext.sizeKolontitul}
                };
                dispatch({ type: actionTypes.SET_DOC_NAME, state: initialState});
                dispatch({ type: actionTypes.SET_DOC_DESC, state: initialState});
                dispatch({ type: actionTypes.SET_QUESTIONS, state: initialState});
                dispatch({ type: actionTypes.SET_STYLE, state: initialState});
                dispatch({ type: actionTypes.SET_CLASSNAMES, state: initialState});
            })
            .catch(err => {
                console.log(err);
            }); */
    }

    function showQuestions(question: QuestionProps, index: number){
        if(question.questionType === QuestionTypeConst.DESCRIPTION){
            return <QuestionDescription question={question} index={index} questions={questions} setQuestions={setQuestions}/>
        }else if(question.questionType === QuestionTypeConst.IMAGE){
            return <QuestionImage question={question} index={index} questions={questions} setQuestions={setQuestions}/>
        }else{
            return !question.answer ?
                (<QuestionEditor question={question} index={index} questions={questions} setQuestions={setQuestions}/>)
                :(<QuestionAnswerKey question={question} index={index} questions={questions} setQuestions={setQuestions}/>)
        }
    }

    function addModification(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, className: string){
        let target = e.target as HTMLElement;
        let parentNode = target.parentNode as HTMLElement;
        let parentNodeTool = findParentNodeByClassName(parentNode!, "input_tool");
        if(parentNodeTool !== null){
            let input = parentNodeTool.firstChild as HTMLElement;
            if(input.classList.contains(className)){
                input.classList.remove(className);
                if(input.id === 'DocumentName'){
                    setDocumentNameClassNames(documentNameClassNames.filter(i => i !== className));
                }
                if(input.id === 'DocumentDesc'){
                    setDocumentDescClassNames(documentDescClassNames.filter(i => i !== className));
                }
            }else{
                input.classList.add(className);
                if(input.id === 'DocumentName'){
                    setDocumentNameClassNames([...documentNameClassNames, className])
                }
                if(input.id === 'DocumentDesc'){
                    setDocumentDescClassNames([...documentDescClassNames, className]);
                }
            }
        }
    }

    function setLinkElement(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        let target = e.target as HTMLElement;
        let parentNode = target.parentNode as HTMLElement;
        let parentNodeTool = findParentNodeByClassName(parentNode!, "input_tool");
        if(parentNodeTool !== null){
            let input = parentNodeTool.firstChild as HTMLElement;

            if(input.id === 'DocumentName'){
                setElementLink({element: documentName, setElement: setDocumentName})
            }

            if(input.id === 'DocumentDescription'){
                setElementLink({element: documentDesc, setElement: setDocumentDesc})
            }
        }
    }

    function findParentNodeByClassName(parent: HTMLElement, className: string): HTMLElement | null{
        if(parent.className && parent.classList.contains(className)){
            return parent;
        }
        if(parent.parentNode === null || parent.parentNode === undefined){
            return null;
        }
        let nextParentNode = parent.parentNode as HTMLElement;
        return findParentNodeByClassName(nextParentNode, className)
    }

    function getToolsForText(){
        return (<>
            <IconButton onClick={(e) => addModification(e, 'bold_text')} className="tool_btn"><FormatBoldOutlined className="icon_formatted"/></IconButton>
            <IconButton onClick={(e) => addModification(e, 'underline_text')} className="tool_btn"><FormatUnderlined className="icon_formatted"/></IconButton>
            <IconButton onClick={(e) => addModification(e, 'italic_text')} className="tool_btn"><FormatItalic className="icon_formatted"/></IconButton>
            <IconButton onClick={(e) => { setLinkElement(e); setIsOpenLinkModal(!isOpenLinkModel); }} className="tool_btn"><Link className="icon_formatted"/></IconButton>
        </>)
    }

    function onAddToolsInput(event: React.MouseEvent<HTMLElement, MouseEvent>){
        let target = event.target as HTMLElement;
        if (target.role !== 'input')
            return;

        let elementTool = document.createElement('div');
        elementTool.className = 'tools_button'

        ReactDOM.render(getToolsForText(), elementTool);
        
        if (target.parentNode!.children.length >= 2)
            return;

        if (target.nextSibling) {
            target.parentNode?.insertBefore(elementTool, target.nextSibling);
        } else {
            target.parentNode?.appendChild(elementTool);
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLElement, Element>) => {
        const currentTarget = e.currentTarget;

        requestAnimationFrame(() => {
            if (!currentTarget.contains(document.activeElement)) {
                if (currentTarget.parentNode) {
                    const children = currentTarget.children;

                    let input = children[0] as HTMLElement;
                    if(input.id === 'DocumentName'){
                        setDocumentName(input.innerHTML);
                    }
        
                    if(input.id === 'DocumentDescription'){
                        setDocumentDesc(input.innerHTML);
                    }

                    if (children.length > 1) {
                        currentTarget.removeChild(children[1]);
                    }
                }
            }
        });
    };

    function questionUI(){
        return questions.map((ques, i) => 
            <Draggable key={i} draggableId={i + 'id'} index={i}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} 
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}>
                        <div>
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <DragIndicator className="drag_indicator" fontSize="small"/>
                            </div>

                            <div>
                                <Accordion expanded={ques.open} onChange={() => handleExpand(i)} className={ques.open ? 'add_border' : ''}>
                                    <QuestionPanel question={ques} index={i}/>
                                    <div className="question_box">
                                        {showQuestions(ques, i)}

                                        {!ques.answer
                                            ? (<QuestionToolbar question={ques} questions={questions} setQuestions={setQuestions}/>)
                                            : ""}
                                    </div> 
                                </Accordion>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }

    return (
        <>
        <div className="question_form">
            <div className="section">
                <QuestionHeaderImage image={headerImage}/>
                <div className="question_title_section">
                    <div className="question_form_top">
                        <div className="input_tool" onBlur={handleBlur} onClick={onAddToolsInput}>
                            <div role="input" id="DocumentName" className="question_form_top_name" contentEditable="true" 
                                style={{fontFamily: textContext.fontKolontitul, fontSize: `${textContext.sizeKolontitul}pt`}}
                                dangerouslySetInnerHTML={{__html: documentName}}>
                            </div>
                        </div>
                        <div className="input_tool" onBlur={handleBlur} onClick={onAddToolsInput}>
                            <div role="input" id="DocumentDescription" className="question_form_top_desc" contentEditable="true" 
                                style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}
                                dangerouslySetInnerHTML={{__html: documentDesc}}>
                            </div>
                        </div>
                    </div>
                </div>

                <DragDropContext onDragEnd={(e) => onDragEndResult(e)}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {questionUI()}
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
        <LinkModalWindow isOpen={isOpenLinkModel} setIsOpen={setIsOpenLinkModal} linkModalModel={elementLink}/>
        <FormToolbar isOpen={isOpenToolbar} setIsOpen={setIsOpenToolbar} questionsForm={questions} 
            setQuestionsForm={setQuestions} setHeaderImage={setHeaderImage} headerImage={headerImage}/>
        </>
    );
}