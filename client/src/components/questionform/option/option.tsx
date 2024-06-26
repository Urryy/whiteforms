import React, { FC, useState } from "react";
import { OptionsProps, QuestionProps } from "../../../interfaces/interfaces";
import { MenuItem, Select, IconButton } from "@material-ui/core";
import { Clear, Close, CropOriginal, HorizontalRule } from "@mui/icons-material";
import { QuestionTypeConst } from "../../../interfaces/consts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTextContext } from "../../../contexts/TextContext";
import { ImageInsertModalWindow } from "../../modal/ImageInsertModalWindow";

interface OptionProps{
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void,
    question: QuestionProps,
    indexQuestion: number,
    option: OptionsProps,
    indexOption: number
}

export const Option: FC<OptionProps> = ({ questions, setQuestions, question, option, indexOption, indexQuestion }) => {
    const textContext = useTextContext();
    const [isOpenImageModal, setIsOpenImageModal] = useState(false);
    
    function getPreviewInputByType(){
        if(question.questionType === QuestionTypeConst.SELECT){
            return <span>{indexOption + 1}. </span>
        }

        return (question.questionType !== QuestionTypeConst.TEXT && question.questionType !== QuestionTypeConst.TEXTAREA &&
            question.questionType !== QuestionTypeConst.DATE && question.questionType !== QuestionTypeConst.SCALE)
        ? <input type={question.questionType} style={{marginRight: '5px'}} disabled={true} size={50}/>
        : <></>;
    }

    function removeOption(){
        let ques = [...questions];
        if(ques[indexQuestion].options.length > 1){
            ques[indexQuestion].options.splice(indexOption, 1);
        }
        setQuestions(ques);
    }

    function onChangeScaleValue(target: number, index: number, isStart: boolean){
        let newQues = [...questions];
        if(isStart){
            newQues[index].startScaleValue = target;
        }else{
            newQues[index].endScaleValue = target;
        }
        setQuestions(newQues);
    }

    function onChangeScaleDescription(target: string, index: number, isStart: boolean){
        let newQues = [...questions];
        if(isStart){
            newQues[index].descStartScaleValue = target;
        }else{
            newQues[index].descEndScaleValue = target;
        }
        setQuestions(newQues);
    }

    function changeValueOptions(target: string, indexQues: number, indexOpt: number){
        let newQues = [...questions];
        newQues[indexQues].options[indexOpt].optionText = target;
        setQuestions(newQues);
    }

    function getInputByType(){ 
        if(option.isAnother){
            return <input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Другое..." value="" 
                        style={{fontFamily: option.elementStyle.fontFamily, fontSize: `${option.elementStyle.fontSize}pt`}}/>
        }

        if(question.questionType === QuestionTypeConst.TEXT)
            return <input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Краткий ответ" value="" 
                        style={{fontFamily: option.elementStyle.fontFamily, fontSize: `${option.elementStyle.fontSize}pt`}}/>
        else if(question.questionType === QuestionTypeConst.DATE){
            return <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="День, месяц, год" disabled />
                    </LocalizationProvider>
        }
        else if(question.questionType === QuestionTypeConst.TEXTAREA)
            return <input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Развернутый ответ" value=""
                        style={{fontFamily: option.elementStyle.fontFamily, fontSize: `${option.elementStyle.fontSize}pt`}}/>
        else if(question.questionType === QuestionTypeConst.SCALE)
            return <div>
                        <div className="scale_selects">
                            <Select labelId="start_select" id="start_select" value={question.startScaleValue} style={{marginRight: '20px'}}
                                    onChange={(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => 
                                        onChangeScaleValue(e.target.value as number, indexQuestion, true)}>
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                            </Select>
                            <span><HorizontalRule fontSize="medium" style={{color: 'gray'}}/></span>
                            <Select labelId="end_select" id="end_select" value={question.endScaleValue} style={{marginLeft: '25px'}}
                                    onChange={(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => 
                                        onChangeScaleValue(e.target.value as number, indexQuestion, false)}>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </div>
                        <div className="scale_description">
                            <div className="scale_description_start">
                                <span >{question.startScaleValue}</span>
                                <input type="text" className="text_input text_input_border scale_input" id='input_option' placeholder="Подпись (необязательно)"
                                    style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}} 
                                    onChange={(e) => onChangeScaleDescription(e.target.value, indexQuestion, true)}/>
                            </div>
                            <div className="scale_description_end">
                                <span>{question.endScaleValue}</span>
                                <input type="text" className="text_input text_input_border scale_input" id='input_option' placeholder="Подпись (необязательно)"
                                    style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}
                                    onChange={(e) => onChangeScaleDescription(e.target.value, indexQuestion, false)}/>
                            </div>
                        </div>
                   </div>
        else 
            return <input type="text" className="text_input text_input_border" id='input_option' value={option.optionText}
                            onChange={(e) => changeValueOptions(e.target.value, indexQuestion, indexOption)} 
                            style={{fontFamily: option.elementStyle.fontFamily, fontSize: `${option.elementStyle.fontSize}pt`}}/>
    }

    function getOptionActions(){
        if(question.questionType === QuestionTypeConst.RADIO || question.questionType === QuestionTypeConst.CHECKBOX){
            return <>
                <IconButton onClick={() => setIsOpenImageModal(prev => !prev)}>
                    <CropOriginal style={{color: '#5f6368'}}/>
                </IconButton>
                <IconButton onClick={removeOption}>
                    <Close/>
                </IconButton>
            </>
        }else if(question.questionType === QuestionTypeConst.TEXT || question.questionType === QuestionTypeConst.TEXTAREA){
            return <>
                <IconButton onClick={() => setIsOpenImageModal(prev => !prev)}>
                    <CropOriginal style={{color: '#5f6368'}}/>
                </IconButton>
            </>
        }else if(question.questionType === QuestionTypeConst.SELECT){
            return <>
                <IconButton onClick={removeOption}>
                    <Close/>
                </IconButton>
            </>
        }else {
            return <></>
        }
    }

    function addPreviewImage(value: string){
        let newQuestions = [...questions];
        newQuestions[indexQuestion].options[indexOption].optionImage = value;
        setQuestions(newQuestions);
    }

    function clearPreviewImage(){
        let newQuestions = [...questions];
        newQuestions[indexQuestion].options[indexOption].optionImage = '';
        setQuestions(newQuestions);
    }

    return (
        <>
            <div className="element_option">
                <div className="add_question_body">
                    <div className="body_question">
                        {getPreviewInputByType()}
                        {getInputByType()}  
                    </div>
                    <div className="body_question">
                        {getOptionActions()}
                    </div>
                </div>
                {option.optionImage 
                && <div className="element_option_image element_option_image_wrapper">
                    <div className="element_option_image_tools">
                        <IconButton onClick={clearPreviewImage}>
                            <Clear />
                        </IconButton>
                    </div>
                    <img src={option.optionImage}/>
                </div>}
            </div>
            <ImageInsertModalWindow isOpen={isOpenImageModal} setIsOpen={setIsOpenImageModal} addImage={addPreviewImage}/>
        </>
    )
}