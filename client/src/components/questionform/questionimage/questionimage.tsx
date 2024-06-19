import { FC, useCallback, useEffect, useState } from 'react';
import { ImageWrapperProps, QuestionProps } from '../../../interfaces/interfaces';
import './questionimage.css';
import { AccordionDetails, IconButton } from '@material-ui/core';
import { useTextContext } from '../../../contexts/TextContext';
import { Delete, FilterNone, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, FormatBoldOutlined, FormatItalic, FormatUnderlined, HeatPump, Link, MoreVert } from '@mui/icons-material';
import img from './qweasd.jpg';
import ReactDOM from 'react-dom';
import React from 'react';
import { useResizable } from '../../../hooks/useResizable';
import { Button } from '@mui/material';
import { CustomizedInput } from '../../customizedinput/customizedinput';

interface QuestionImageProps{
    question: QuestionProps,
    index: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

export const QuestionImage: FC<QuestionImageProps> = ({question, index, questions, setQuestions}) => {
    const textContext = useTextContext();
    const [ref] = useResizable({setValue});

    const [isOpenLinkModel, setIsOpenLinkModal] = useState(false);

    function onChange(target: string){
        let newQues = [...questions];
        newQues[index].questionText = target;
        setQuestions(newQues);
    }

    function onSetClassName(values: string[]){
        let newQues = [...questions];
        newQues[index].classNames = values;
        setQuestions(newQues);
    }

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
                <CustomizedInput id='input_question' standardClassName='question default_input' classNames={question.classNames} setClassNames={onSetClassName} 
                    inputText={question.questionText} setInputText={onChange} fontFamily={question.elementStyle.fontFamily} fontSize={question.elementStyle.fontSize}/>

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
        </>
    );
}