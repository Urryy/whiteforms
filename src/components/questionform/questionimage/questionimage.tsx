import { FC, useState } from 'react';
import { QuestionProps } from '../../../interfaces/interfaces';
import './questionimage.css';
import { AccordionDetails, IconButton } from '@material-ui/core';
import { useTextContext } from '../../../contexts/TextContext';
import { LinkModalModelQuestionProps, LinkModalWindow } from '../../modal/LinkModalWindow';
import { Delete, FilterNone, FormatBoldOutlined, FormatItalic, FormatUnderlined, Link } from '@mui/icons-material';
import img from './qweasd.jpg';
import ReactDOM from 'react-dom';
import React from 'react';
import { useResizable } from '../../../hooks/useResizable';

interface QuestionImageProps{
    question: QuestionProps,
    index: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

enum Direction {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
}

export const QuestionImage: FC<QuestionImageProps> = ({question, index, questions, setQuestions}) => {
    const [ref] = useResizable();
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

    function getValue(value: string | null | undefined){
        if(value){
            return value;
        }
        return "";
    }
    

    return (
        <>
        <AccordionDetails className='add_image'>
            <div className='add_image_top'>
                <div className="input_tool" onBlur={handleBlur} onClick={onAddToolsInput}>
                    <div role="input" id="input_question" className="question default_input" contentEditable="true" 
                        style={{fontFamily: textContext.fontQuestionText, fontSize: `${textContext.sizeQuestionText}pt`}}
                        dangerouslySetInnerHTML={{__html: question.questionText}}>
                    </div>
                </div>
                <div className="add_image_right">
                    <IconButton aria-label="Copy" onClick={() => {copyQuestion(index)}}>
                        <FilterNone />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => {deleteQuestion(index)}}>
                        <Delete />
                    </IconButton>
                </div>
            </div>

            <div className="add_image_body">
                <div className="body_image">
                    <div className="input_image_wrapper resizable" ref={ref}>
                        <img alt='imgasd' src={getValue(question.options[0].optionText)} width={400} height={400}/>
                        <div className="resizer resizer--r"/>
                        <div className="resizer resizer--b"/>
                    </div>
                </div>
            </div>
        </AccordionDetails>
        <LinkModalWindow isOpen={isOpenLinkModel} setIsOpen={setIsOpenLinkModal} linkModalModel={elementLink}/>
        </>
    );
}