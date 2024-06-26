import { Button, FormControlLabel } from "@material-ui/core";
import React, { FC } from "react";
import { QuestionProps } from "../../../interfaces/interfaces";
import { QuestionTypeConst } from "../../../interfaces/consts";
import { useTextContext } from "../../../contexts/TextContext";

interface OptionEditorProps{
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void,
    question: QuestionProps,
    questionIndex: number
}

export const OptionEditor: FC<OptionEditorProps> = ({ questions, setQuestions, question, questionIndex }) => {
    const textContext = useTextContext();

    function addOption(){
        if(question.questionType === 'text' || question.questionType === 'textarea')
            return;

        let ques = [...questions];
        if(ques[questionIndex].options.length < 5){   
            if(ques[questionIndex].options.find(item => item.isAnother)){
                ques[questionIndex].options.splice(ques[questionIndex].options.length - 1, 0, {optionText: `Вариант ${ques[questionIndex].options.length}`, 
                elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText} })
            }else{
                ques[questionIndex].options.push({optionText: `Вариант ${ques[questionIndex].options.length + 1}`, 
                elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText} })
            }
        }   
        setQuestions(ques);
    }

    function addAnother(){
        let ques = [...questions];
        if(ques[questionIndex].options.length < 5){
            if(ques[questionIndex].options.find(item => item.isAnother)){
                ques[questionIndex].options.splice(ques[questionIndex].options.length - 1, 0, {optionText: '', elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText}})
            }else{
                ques[questionIndex].options.push({optionText: ``, isAnother: true, elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText}})
            }
        }  
        setQuestions(ques);
    }

    function getPreviewInputByTypeForTools(){
        return (question.questionType !== QuestionTypeConst.TEXT && question.questionType !== QuestionTypeConst.TEXTAREA &&
            question.questionType !== QuestionTypeConst.DATE && question.questionType !== QuestionTypeConst.SELECT
            && question.questionType !== QuestionTypeConst.SCALE)
        ? <input type={question.questionType} style={{marginRight: '5px'}} disabled={true} size={50}/>
        : <></>;
    }

    function getToolsForAddingNewOption(){
        if(question.questionType === QuestionTypeConst.TEXT || question.questionType === QuestionTypeConst.TEXTAREA
            || question.questionType === QuestionTypeConst.DATE || question.questionType === QuestionTypeConst.SCALE){
            return (<></>);
        }

        if(question.questionType === QuestionTypeConst.SELECT){
            return <div>
                <Button size="small" className="add_question_button" style={{ marginLeft: '2px'}} 
                        onClick={addOption}>
                    Добавить вариант
                </Button>
            </div>
        }

        if(question.options.find(item => item.isAnother)){
            return <div>
                <Button size="small" className="add_question_button" style={{ marginLeft: '2px'}} 
                        onClick={addOption}>
                    Добавить вариант
                </Button>
            </div>
        }

        return (
        <div>
            <input type="text" className="text_input" 
                    style={{fontSize: '15px', width: '120px', color: 'blue', margin: '0 3px'}} 
                    placeholder="Добавить другое" 
                    onClick={addAnother}/>
            <span className="tool_text tool_option_title">или</span>
            <Button size="small" className="add_question_button" style={{ marginLeft: '2px'}} 
                    onClick={addOption}>
                Добавить вариант
            </Button>
        </div>) 
    }

    return (
        <>
        <div className="add_question_body">
            <FormControlLabel disabled 
                control={getPreviewInputByTypeForTools()}
                label={getToolsForAddingNewOption()}/>
        </div>
        </>
    )
}