import { FC, useCallback, useEffect, useState } from 'react';
import { ImageWrapperProps, QuestionProps } from '../../../interfaces/interfaces';
import './questionimage.css';
import { AccordionDetails, IconButton } from '@material-ui/core';
import { useTextContext } from '../../../contexts/TextContext';
import { LinkModalModelQuestionProps, LinkModalWindow } from '../../modal/LinkModalWindow';
import { Delete, FilterNone, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, FormatBoldOutlined, FormatItalic, FormatUnderlined, HeatPump, Link, MoreVert } from '@mui/icons-material';
import img from './qweasd.jpg';
import ReactDOM from 'react-dom';
import React from 'react';
import { useResizable } from '../../../hooks/useResizable';
import { Button } from '@mui/material';

interface QuestionImageProps{
    question: QuestionProps,
    index: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

export const QuestionImage: FC<QuestionImageProps> = ({question, index, questions, setQuestions}) => {
    const textContext = useTextContext();
    const [ref] = useResizable({setValue});

    const [isOpenEditor, setIsOpenEditor] = useState(false);
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
    
    function setValue(height: string, width: string){
        let newQues = [...questions];
        if(!newQues[index].options[0].imageWrapper){
            newQues[index].options[0].imageWrapper = {height: height, width: width, position: 'left'}; 
        }else{
            newQues[index].options[0].imageWrapper = {position: newQues[index].options[0].imageWrapper!.position, width: width, height: height};
        }
        
        setQuestions(newQues);
    }

    function openNavigationTool(){
        let navigationTool = document.getElementById('navigation_tool') as HTMLElement;
        navigationTool.classList.remove('display-none');
    }

    function formattedImage(type: string){
        let wrapper = document.getElementById('body_image') as HTMLElement;
        let navigationTool = document.getElementById('navigation_tool') as HTMLElement;
        let newQues = [...questions];

        if(type === 'left'){
            newQues[index].options[0].imageWrapper!.position = 'flex-start'; 
            wrapper.style.setProperty('justify-content', 'flex-start')
        }else if(type === 'right'){
            newQues[index].options[0].imageWrapper!.position = 'flex-end'; 
            wrapper.style.setProperty('justify-content', 'flex-end')
        }else if(type === 'center'){
            newQues[index].options[0].imageWrapper!.position = 'center'; 
            wrapper.style.setProperty('justify-content', 'center')
        }
        setQuestions(newQues);
        navigationTool.classList.add('display-none');
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

            {typeof ref === 'function' 
                ? <div className="add_image_body"> 
                        <div className="body_image" id='body_image'>
                            <div className="input_image_wrapper resizable" ref={ref} id='image_wrapper'>
                                <div className='image_tools'>
                                    <IconButton onClick={openNavigationTool}>
                                        <MoreVert />
                                    </IconButton>
                                </div>
                                <div className='image_tools_navigation display-none' id='navigation_tool'>
                                    <Button fullWidth className='tools_navigation_button' onClick={() => formattedImage('left')}><FormatAlignLeft style={{padding: '1px 5px'}}/> Выровнять по левому краю</Button>
                                    <Button fullWidth className='tools_navigation_button' onClick={() => formattedImage('center')}><FormatAlignCenter style={{padding: '1px 5px'}}/> Выровнять по центру</Button>
                                    <Button fullWidth className='tools_navigation_button' onClick={() => formattedImage('right')}><FormatAlignRight style={{padding: '1px 5px'}}/> Выровнять по правому краю</Button>
                                    <Button fullWidth className='tools_navigation_button' onClick={() => {deleteQuestion(index)}}><Delete style={{padding: '1px 5px'}}/> Удалить</Button>
                                </div>
                                <img alt='no_image' src={getValue(question.options[0].optionText)} />
                                <div className="resizer resizer--r"/>
                                <div className="resizer resizer--b"/>
                            </div>
                        </div>
                    </div>
                : <></>}
        </AccordionDetails>
        <LinkModalWindow isOpen={isOpenLinkModel} setIsOpen={setIsOpenLinkModal} linkModalModel={elementLink}/>
        </>
    );
}