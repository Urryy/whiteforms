import { Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import React, { FC } from "react";
import { OptionsProps, QuestionFilledProps, QuestionProps } from "../../../../interfaces/interfaces";

interface CheckboxOptionProps{
    question: QuestionProps,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void,
    index: number
}

export const CheckboxOption: FC<CheckboxOptionProps> = ({question, filledQuestions, setFilledQuestions, index}) => {

    const getAnotherOption = (item: OptionsProps) => {
        return <div className="option_another">
            <span style={{fontFamily: item.elementStyle.fontFamily, fontSize: `${item.elementStyle.fontSize}pt`}}>Другое: </span>
            <TextField id={'input_text'+item.id} multiline maxRows={4} variant="standard" fullWidth onBlur={(e) => onAddAnother(item.id, e.target.value)}
                InputProps={{style: {fontSize: `${item.elementStyle.fontSize}pt`}}}/>
        </div>
    }

    const onChangeAnswerCheckbox = (optionId: string | undefined, value: string | undefined, checked: boolean, isAnother: boolean) => {
        if(!filledQuestions || !setFilledQuestions){
            return;
        }

        let newFilledQuestions = [...filledQuestions];
        let existFilledQuestion = newFilledQuestions.find(value => value.questionId === question.id!);

        if(!existFilledQuestion){
            let valueAns = value;
            if(isAnother){
                valueAns = (document.getElementById(`input_text${optionId}`) as HTMLTextAreaElement).value;
            }
            let newFilledQuestion: QuestionFilledProps = { questionId: question.id!, sequence: index, answers: [{ optionId: optionId!, answerText: valueAns }] };
            setFilledQuestions([...newFilledQuestions, newFilledQuestion]);
        }else{
            if(!checked){
                existFilledQuestion.answers = existFilledQuestion.answers.filter(value => value.optionId !== optionId!);
                setFilledQuestions([...newFilledQuestions.filter(value => value.questionId !== question.id!), existFilledQuestion]);
            }else{
                let valueAns = value;
                if(isAnother){
                    valueAns = (document.getElementById(`input_text${optionId}`) as HTMLTextAreaElement).value;
                }
                existFilledQuestion.answers = existFilledQuestion.answers.filter(value => value.optionId !== optionId!);
                existFilledQuestion.answers.push({optionId: optionId!, answerText: valueAns});
                setFilledQuestions([...newFilledQuestions.filter(value => value.questionId !== question.id!), existFilledQuestion]);
            }
        }
        
    }

    const onAddAnother = (optionId: string | undefined, value: string | undefined) =>{
        if(!filledQuestions || !setFilledQuestions){
            return;
        }

        let newFilledQuestions = [...filledQuestions];
        let existFilledQuestion = newFilledQuestions.find(value => value.questionId === question.id!);
        if(existFilledQuestion){
            let existOpt = existFilledQuestion.answers.find(value => value.optionId === optionId!);
            if(existOpt){
                existFilledQuestion.answers = existFilledQuestion.answers.filter(value => value.optionId !== optionId!);
                existFilledQuestion.answers.push({optionId: optionId!, answerText: value});
                setFilledQuestions([...newFilledQuestions.filter(value => value.questionId !== question.id!), existFilledQuestion]);
                console.log([...newFilledQuestions.filter(value => value.questionId !== question.id!), existFilledQuestion]);
            }
        }
    }
    
    return <FormGroup>
            {question.options.map((item) => 
                item.isAnother
                ? <FormControlLabel className="label_option_another" 
                    control={<Checkbox onChange={(e) => onChangeAnswerCheckbox(item.id, item.optionText, e.target.checked, true)}/>}
                    required={question.required}
                    label={getAnotherOption(item)}/>
                : <FormControlLabel required={question.required}
                    control={<Checkbox onChange={(e) => onChangeAnswerCheckbox(item.id, item.optionText, e.target.checked, false)}/>} 
                    label={<span style={{fontFamily: item.elementStyle.fontFamily, fontSize: `${item.elementStyle.fontSize}pt`}}>{item.optionText}</span>} />
            )}
            </FormGroup>
}