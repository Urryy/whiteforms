import { AccordionDetails, IconButton, Switch } from '@material-ui/core';
import { QuestionProps } from '../../../interfaces/interfaces';
import './QuestionaDescription.css';
import React, { FC, useState } from 'react';
import { useTextContext } from '../../../contexts/TextContext';
import { Delete, FilterNone, FormatBoldOutlined, FormatItalic, FormatUnderlined, Link } from '@mui/icons-material';
import { LinkModalModelQuestionProps, LinkModalWindow } from '../../modal/LinkModalWindow';
import ReactDOM from 'react-dom';

interface QuestionDescriptionProps {
    question: QuestionProps,
    index: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

export const QuestionDescription: FC<QuestionDescriptionProps> = ({question, index, questions, setQuestions}) => {
    const textContext = useTextContext();
    
    const [isOpenLinkModel, setIsOpenLinkModal] = useState(false);
    const [elementLink, setElementLink] = useState<LinkModalModelQuestionProps | null>(null);

    function onChange(target: string, index: number){
        let newQues = [...questions];
        newQues[index].questionText = target;
        setQuestions(newQues);
    }

    function setLinkElement(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        let target = e.target as HTMLElement;
        let parentNode = target.parentNode as HTMLElement;
        let parentNodeTool = findParentNodeByClassName(parentNode!, "input_tool");
        if(parentNodeTool !== null){
            let input = parentNodeTool.firstChild as HTMLElement;

            if(input.id === 'input_question'){
                setElementLink({indexQuestion: index, questions: questions, setQuestions: setQuestions});
            }
        }
    }

    function getToolsForText(){
        return (<>
            <IconButton onClick={(e) => addModification(e, 'bold_text')} className="tool_btn"><FormatBoldOutlined className="icon_formatted"/></IconButton>
            <IconButton onClick={(e) => addModification(e, 'underline_text')} className="tool_btn"><FormatUnderlined className="icon_formatted"/></IconButton>
            <IconButton onClick={(e) => addModification(e, 'italic_text')} className="tool_btn"><FormatItalic className="icon_formatted"/></IconButton>
            <IconButton onClick={(e) => { setLinkElement(e); setIsOpenLinkModal(!isOpenLinkModel); }} className="tool_btn"><Link className="icon_formatted"/></IconButton>
        </>)
    }

    function addModification(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, className: string){
        let target = e.target as HTMLElement;
        let parentNode = target.parentNode as HTMLElement;
        let parentNodeTool = findParentNodeByClassName(parentNode!, "input_tool");
        if(parentNodeTool !== null){
            let input = parentNodeTool.firstChild as HTMLElement;
            if(input.classList.contains(className) && question.classNames.includes(className)){
                input.classList.remove(className);
                let newClassNames = question.classNames.filter(item => item !== className);
                question.classNames = newClassNames;
            }else{
                input.classList.add(className);
                question.classNames.push(className);
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

    function onAddToolsInput(e: React.MouseEvent<HTMLInputElement, MouseEvent>){
        let target = e.target as HTMLElement;
        if (target.role !== 'input')
            return;

        let elementTool = document.createElement('div');
        elementTool.className = 'tools_button'
        
        if (target.parentNode!.children.length >= 2)
            return;

        ReactDOM.render(getToolsForText(), elementTool);
        
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
                    if(input.id === 'input_question'){
                        onChange(input.innerHTML, index);
                    }
                    if(input.id === 'input_option'){
                        changeDescription(input.innerHTML, index);
                    }

                    if (children.length > 1) {
                        currentTarget.removeChild(children[1]);
                    }
                }
            }
        });
    };

    function expandeCloseAll(){
        let ques = [...questions];
        for (let index = 0; index < ques.length; index++) {
            ques[index].open = false;
        }
        setQuestions(ques);
    }

    function copyQuestion(index: number){
        expandeCloseAll();
        let ques = [...questions];
        let newQuestion = {...ques[index]};
        setQuestions([...questions, newQuestion]);
    }

    function deleteQuestion(index: number){
        let ques = [...questions];
        if(ques.length > 1){
            ques.splice(index, 1);
        }
        setQuestions(ques);
    }

    function changeDescription(target: string, index: number){
        let newQues = [...questions];
        newQues[index].options[0].optionText = target;
        setQuestions(newQues);
    }

    function getValue(value: string | null | undefined){
        if(value){
            return value;
        }
        return "";
    }

    return (
        <>
        <AccordionDetails className='add_description'>
            <div className='add_description_top'>
                <div className="input_tool" onBlur={handleBlur} onClick={onAddToolsInput}>
                    <div role="input" id="input_question" className="question default_input" contentEditable="true" 
                        style={{fontFamily: textContext.fontQuestionText, fontSize: `${textContext.sizeQuestionText}pt`}}
                        dangerouslySetInnerHTML={{__html: question.questionText}}>
                    </div>
                </div>
                <div className="add_description_right">
                    <IconButton aria-label="Copy" onClick={() => {copyQuestion(index)}}>
                        <FilterNone />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => {deleteQuestion(index)}}>
                        <Delete />
                    </IconButton>
                </div>
            </div>
            <div className="add_description_body">
                <div className="body_description">
                    <div className="input_tool" onBlur={handleBlur} onClick={onAddToolsInput}>
                        <div role='input' id='input_option' className="text_input_option text_input_border description_input"
                            style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}
                            dangerouslySetInnerHTML={{__html: getValue(question.options[0].optionText)}} contentEditable="true"
                            data-text="Описание (не обязательно)">  
                        </div>
                    </div>
                    {/* <input type="text" className="text_input text_input_border description_input" id='input_option' placeholder="Описание (необязательно)" value={getValue(question.options[0].optionText)} 
                        onChange={(e) => changeDescription(e.target.value, index)} style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}/> */}
                </div>
            </div>
        </AccordionDetails>
        <LinkModalWindow isOpen={isOpenLinkModel} setIsOpen={setIsOpenLinkModal} linkModalModel={elementLink}/>
        </>
    );
}