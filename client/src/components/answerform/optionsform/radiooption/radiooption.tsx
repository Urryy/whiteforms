import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { FC } from "react";
import { OptionsProps, QuestionFilledProps, QuestionProps } from "../../../../interfaces/interfaces";

interface RadioOptionProps{
    question: QuestionProps,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void,
    index: number
}

export const RadioOption: FC<RadioOptionProps> = ({question, filledQuestions, setFilledQuestions, index}) => {

    const getAnotherOption = (item: OptionsProps) => {
        return <div className="option_another">
            <span style={{fontFamily: item.elementStyle.fontFamily, fontSize: `${item.elementStyle.fontSize}pt`}}>Другое: </span>
            <TextField id={'input_text'+item.id} multiline maxRows={4} variant="standard" fullWidth onBlur={(e) => onAddAnother(item.id, e.target.value)}
                InputProps={{style: {fontSize: `${item.elementStyle.fontSize}pt`}}}/>
        </div>
    }
    
    const onChangeAnswer = (optionId: string | undefined, value: string, isAnother: boolean | undefined) => {
        if(!filledQuestions || !setFilledQuestions){
            return;
        }

        let newFilledQuestions = [...filledQuestions];
        let existFilledQuestion = newFilledQuestions.find(value => value.questionId === question.id);

        let newFilledQuestion: QuestionFilledProps = {questionId: question.id!, sequence: index, answers: [{optionId: optionId!, answerText: value}]};
        if(!existFilledQuestion){
            if(isAnother){
                newFilledQuestion.answers[0].answerText = (document.getElementById(`input_text${optionId}`) as HTMLTextAreaElement).value;
            }
            setFilledQuestions([...newFilledQuestions, newFilledQuestion]);
        }else{
            if(isAnother){
                newFilledQuestion.answers[0].answerText = (document.getElementById(`input_text${optionId}`) as HTMLTextAreaElement).value;
            }
            setFilledQuestions([...newFilledQuestions.filter(value => value.questionId !== question.id), newFilledQuestion]);
        }
    }

    const onAddAnother = (optionId: string | undefined, value: string) => {
        if(!filledQuestions || !setFilledQuestions){
            return;
        }

        let newFilledQuestions = [...filledQuestions];
        let existFilledQuestion = newFilledQuestions.find(value => value.questionId === question.id);
        if(existFilledQuestion){
            let option = existFilledQuestion.answers.find(value => value.optionId === optionId);
            if(option){
                let newFilledQuestion: QuestionFilledProps = {questionId: question.id!, sequence: index, answers: [{optionId: optionId!, answerText: value}]};
                setFilledQuestions([...newFilledQuestions.filter(value => value.questionId !== question.id), newFilledQuestion]);
            }
        }
    }

    return <RadioGroup name="radio_option">
            {question.options.map((item) => 
                item.isAnother 
                ? <FormControlLabel 
                    required={question.required}
                    className="label_option_another" 
                    value={item.optionText} 
                    control={<Radio onChange={() => onChangeAnswer(item.id, item.optionText, item.isAnother)}/>} 
                    label={getAnotherOption(item)}/>
                : <FormControlLabel 
                    value={item.optionText} 
                    control={<Radio onChange={() => onChangeAnswer(item.id, item.optionText, item.isAnother)}/>} 
                    required={question.required}
                    label={<span style={{fontFamily: item.elementStyle.fontFamily, fontSize: `${item.elementStyle.fontSize}pt`}}>{item.optionText}</span>}/>
            )}
        </RadioGroup>
}