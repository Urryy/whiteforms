import { AddCircleOutline, CropOriginalOutlined, OndemandVideo, TextFields } from "@mui/icons-material";
import React, { FC, useState } from "react";
import { QuestionProps } from "../../../interfaces/interfaces";
import { IconButton } from "@material-ui/core";
import { ImageInsertModalWindow } from "../../modal/ImageInsertModalWindow";

interface QuestionToolbarProps{
    question: QuestionProps;
    setQuestions: (stateQuestions: QuestionProps[]) => void;
    questions: QuestionProps[];
}

export const QuestionToolbar: FC<QuestionToolbarProps> = ({question, questions, setQuestions}) => {
    const [isOpenImageInsert, setIsOpenImageInsert] = useState(false);

    function addQuestion(){
        expandeCloseAll();
        setQuestions([...questions, 
            {questionText: 'Вопрос без заголовка', questionType: 'radio', options: [{optionText: "Вариант 1"}], answerKey: '', points: 0, answer: false, open: true, required: false, classNames: []}]);
    }

    function addDescription(){
        expandeCloseAll();
        setQuestions([...questions,
            {questionText: 'Без названия', questionType: 'description', options: [{optionText: ''}], answerKey: '', points: 0, answer: false, open: true, required: false, classNames: []}])
    }

    function addImage(value: string){
        expandeCloseAll();
        setQuestions([...questions,
            {questionText: 'Без названия', questionType: 'image', options: [{optionText: value}], answerKey: '', points: 0, answer: false, open: true, required: false, classNames: []}])
    }

    function expandeCloseAll(){
        let ques = [...questions];
        for (let index = 0; index < ques.length; index++) {
            ques[index].open = false;
        }
        setQuestions(ques);
    }

    return (
        <>
        <div className="question_edit">
            <IconButton className="tool_button" title="добавить вопрос"><AddCircleOutline className="edit" onClick={addQuestion}/></IconButton>
            <IconButton className="tool_button" title="добавить видео"><OndemandVideo className="edit"/></IconButton>
            <IconButton className="tool_button" title="добавить изображение"><CropOriginalOutlined className="edit" onClick={() => setIsOpenImageInsert(!isOpenImageInsert)}/></IconButton>
            <IconButton className="tool_button" title="добавить описание"><TextFields className="edit" onClick={addDescription}/></IconButton>
        </div>
        <ImageInsertModalWindow isOpen={isOpenImageInsert} setIsOpen={setIsOpenImageInsert} addImage={addImage}/>
        </>
    );
}