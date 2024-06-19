import { AccordionDetails, IconButton, Switch, TextField } from '@material-ui/core';
import { QuestionProps } from '../../../interfaces/interfaces';
import './QuestionaDescription.css';
import React, { FC, useState } from 'react';
import { Delete, FilterNone } from '@mui/icons-material';
import { CustomizedInput } from '../../customizedinput/customizedinput';

interface QuestionDescriptionProps {
    question: QuestionProps,
    index: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

export const QuestionDescription: FC<QuestionDescriptionProps> = ({question, index, questions, setQuestions}) => {
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

    function onSetOptionClassName(values: string[]){
        let newQues = [...questions];
        newQues[index].options[0].classNames = values;
        setQuestions(newQues);
    }

    function onChangeOptionText(value: string){
        let newQues = [...questions];
        newQues[index].options[0].optionText = value;
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

    return (
        <>
        <AccordionDetails className='add_description'>
            <div className='add_description_top'>
                <CustomizedInput id='input_question' standardClassName='question default_input' classNames={question.classNames} setClassNames={onSetClassName}
                    inputText={question.questionText} setInputText={onChange} fontFamily={question.elementStyle.fontFamily} fontSize={question.elementStyle.fontSize}/>
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
                    <CustomizedInput id='input_option' standardClassName='text_input_option text_input_border description_input' classNames={question.options[0].classNames!} 
                        setClassNames={onSetOptionClassName} inputText={question.options[0].optionText} setInputText={onChangeOptionText} dataText='Описание (не обязательное)'
                        fontFamily={question.options[0].elementStyle.fontFamily} fontSize={question.options[0].elementStyle.fontSize} />                   
                </div>
            </div>
        </AccordionDetails>
        </>
    );
}