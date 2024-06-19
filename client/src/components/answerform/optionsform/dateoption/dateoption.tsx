import React, { FC } from "react";
import { QuestionFilledProps, QuestionProps } from "../../../../interfaces/interfaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface DateOptionProps{
    question: QuestionProps,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void,
    index: number
}

export const DateOption: FC<DateOptionProps> = ({question, filledQuestions, setFilledQuestions, index}) => {

    const onChangeAnswer = (optionId: string | undefined, value: string | undefined) => {
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

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="День, месяц, год" onChange={(e) => onChangeAnswer(question.options[0].id, e?.toISOString())}/>
            </LocalizationProvider>
}