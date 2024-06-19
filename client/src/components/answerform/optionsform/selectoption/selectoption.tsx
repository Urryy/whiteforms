import React, { FC } from "react";
import { QuestionFilledProps, QuestionProps } from "../../../../interfaces/interfaces";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SelectOptionProps{
    question: QuestionProps,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void,
    index: number
}

export const SelectOption: FC<SelectOptionProps> = ({question, filledQuestions, setFilledQuestions, index}) =>{

    const onChangeAnswer = (e: SelectChangeEvent) => {
        if(!filledQuestions || !setFilledQuestions){
            return;
        }

        let existOption = question.options.find(value => value.optionText === e.target.value);
        if(!existOption)
            return;

        let newFilledQuestions = [...filledQuestions];
        let existFilledQuestion = newFilledQuestions.find(value => value.questionId === question.id!);
        let newFilledQuestion: QuestionFilledProps = { questionId: question.id!, sequence: index, answers: [{answerText: e.target.value, optionId: existOption.id!}]};
        if(!existFilledQuestion){
            setFilledQuestions([...filledQuestions, newFilledQuestion]); 
            console.log([...filledQuestions, newFilledQuestion]);
        }else{
            setFilledQuestions([...filledQuestions.filter(value => value.questionId !== question.id!), newFilledQuestion]);
            console.log([...filledQuestions.filter(value => value.questionId !== question.id!), newFilledQuestion]);
        }
    }

    return <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="select_option">Выбрать</InputLabel>
                <Select labelId="select_option" id="select_option" label="Выбрать" onChange={onChangeAnswer}>
                        <MenuItem value=""><em>Выбрать</em></MenuItem>
                        {question.options.map((item) => 
                            <MenuItem value={item.optionText} 
                                style={{fontFamily: item.elementStyle.fontFamily, fontSize: `${item.elementStyle.fontSize}pt`}}>
                                {item.optionText}
                            </MenuItem>
                        )}
                </Select>
            </FormControl>
}