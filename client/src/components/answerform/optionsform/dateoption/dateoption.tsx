import React, { FC } from "react";
import { QuestionFilledProps, QuestionProps } from "../../../../interfaces/interfaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

interface DateOptionProps{
    question: QuestionProps,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void,
    index: number
}

export const DateOption: FC<DateOptionProps> = ({question, filledQuestions, setFilledQuestions, index}) => {

    const onChangeAnswer = (optionId: string | undefined, value: Dayjs | null) => {
        if(!filledQuestions || !setFilledQuestions){
            return;
        }

        let valueDate = value?.toString();
        console.log(valueDate);
        let newFilledQuestions = [...filledQuestions];
        let existFilledQuestion = newFilledQuestions.find(value => value.questionId === question.id);
        let newFilledQuestion: QuestionFilledProps = {questionId: question.id!, sequence: index, answers: [{optionId: optionId!, answerText: valueDate}]}

        if(!existFilledQuestion){
            setFilledQuestions([...newFilledQuestions, newFilledQuestion]);
        }else{
            setFilledQuestions([...newFilledQuestions.filter(value => value.questionId !== question.id!), newFilledQuestion]);
        }
    }

    return <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker label="День, месяц, год" format="DD/MM/YYYY"
                    onChange={(e) => onChangeAnswer(question.options[0].id, e)}/>
            </LocalizationProvider>
}