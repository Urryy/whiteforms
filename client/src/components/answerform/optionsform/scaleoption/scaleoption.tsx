import React, { FC } from "react";
import { QuestionFilledProps, QuestionProps, ScaleValueProps } from "../../../../interfaces/interfaces";
import { Slider } from "@mui/material";

interface ScaleOption{
    question: QuestionProps,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void,
    index: number
}

export const ScaleOption: FC<ScaleOption> = ({question, filledQuestions, setFilledQuestions, index}) => {

    const getStyle = (type: string) => {
        if(type === 'fontFamily')
            return question.options[0].elementStyle.fontFamily
        else
            return question.options[0].elementStyle.fontSize
    }

    const getScaleMarks = () => {
        let marks: ScaleValueProps[] = []
        for (let index = question.startScaleValue!; index <= question.endScaleValue!; index++) {
            marks.push({label: index.toString(), value: index})
        }
        return marks;
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

    return <div className="slider_flex">
                <span style={{fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}>{question.descStartScaleValue}</span>
                    <Slider min={question.startScaleValue!} max={question.endScaleValue!} step={1} defaultValue={question.startScaleValue!} marks={getScaleMarks()}
                                        aria-label="slider" style={{flex: '1', margin: '0 20px'}} onChange={(e, value, activeThumb) => onChangeAnswer(question.options[0].id, value.toString())}/>
                <span style={{fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}>{question.descEndScaleValue}</span>
            </div>
}