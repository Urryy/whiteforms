import React, { FC } from "react";
import { QuestionFilledProps, QuestionProps } from "../../../../interfaces/interfaces";
import { TextField, TextFieldVariants } from "@mui/material";
import { stringify } from "querystring";

interface TextOptionProps{
    id: string,
    variant: TextFieldVariants,
    question: QuestionProps,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void,
    index: number,
    rows: number
}

export const TextOption: FC<TextOptionProps> = ({id, variant, question, filledQuestions, setFilledQuestions, index, rows}) => {
    const getStyle = (type: string) => {
        if(type === 'fontFamily')
            return question.options[0].elementStyle.fontFamily
        else
            return question.options[0].elementStyle.fontSize
    }

    const onChangeAnswer = (optionId: string | undefined, value: string) => {
        if(!filledQuestions || !setFilledQuestions){
            return;
        }

        let newFilledQuestions = [...filledQuestions];
        let existFilledQuestion = newFilledQuestions.find(value => value.questionId === question.id);
        let newFilledQuestion: QuestionFilledProps = {questionId: question.id!, sequence: index, answers: [{optionId: optionId!, answerText: value}]}
        if(!existFilledQuestion){
            setFilledQuestions([...newFilledQuestions, newFilledQuestion]);
        }else{
            setFilledQuestions([...newFilledQuestions.filter(value => value.questionId !== question.id!), newFilledQuestion]);
        }
    }
    
    return <>
        <TextField id={id} label="Мой ответ" multiline rows={rows} variant={variant} fullWidth
                InputLabelProps={{style: {fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}} 
                onChange={(e) => onChangeAnswer(question.options[0].id, e.target.value)}/>
        {question.options[0].optionImage && 
        <div className="image_wrapper_option">
                <img alt="image1" src={question.options[0].optionImage}/>
        </div>}
    </>
}