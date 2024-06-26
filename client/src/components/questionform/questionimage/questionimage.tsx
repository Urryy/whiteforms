import { FC, useCallback, useEffect, useState } from 'react';
import { ImageWrapperProps, QuestionProps } from '../../../interfaces/interfaces';
import './questionimage.css';
import { AccordionDetails, IconButton } from '@material-ui/core';
import { Delete, FilterNone } from '@mui/icons-material';
import { useResizable } from '../../../hooks/useResizable';
import { CustomizedInput } from '../../customizedinput/customizedinput';
import { ImageCropper } from '../../image/imagecropper';

interface QuestionImageProps{
    question: QuestionProps,
    index: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

export const QuestionImage: FC<QuestionImageProps> = ({question, index, questions, setQuestions}) => {
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

    function deleteQuestion(){
        let ques = [...questions];
        if(ques.length > 1){
            ques.splice(index, 1);
        }
        setQuestions(ques);
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

    function formattedImage(type: string){
        let wrapper = document.getElementById('body_image') as HTMLElement;
        let navigationTool = document.getElementById('navigation_tool') as HTMLElement;
        let newQues = [...questions];

        if(!newQues[index].options[0].imageWrapper){
            newQues[index].options[0].imageWrapper = { width: '100', height: '100', position: 'left'};
        }

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
                    <IconButton aria-label="Delete" onClick={deleteQuestion}>
                        <Delete />
                    </IconButton>
                </div>
            </div>
            <ImageCropper imageData={question.options[0].optionText} formattedImage={formattedImage} handleDeleteImage={deleteQuestion} setValue={setValue}/>
        </AccordionDetails>
        </>
    );
}