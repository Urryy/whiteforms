import { AccordionDetails, Button, Divider, FormControlLabel, IconButton, MenuItem, Select, Switch } from "@material-ui/core";
import { ArrowOutward, CalendarMonth, CheckBoxOutlined, Close, CropOriginal, Delete, ExpandCircleDownOutlined, FilterNone, FormatBoldOutlined, FormatItalic, FormatUnderlined, LinearScale, Link, Menu, RadioButtonChecked, ShortText, Subject, Timeline } from "@mui/icons-material";
import React, { FC, useState } from "react";
import { OptionsProps, QuestionProps } from "../../../interfaces/interfaces";
import { QuestionTypeConst } from "../../../interfaces/consts";
import ReactDOM from "react-dom";
import { useTextContext } from "../../../contexts/TextContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CustomizedInput } from "../../customizedinput/customizedinput";
import { ImageInsertModalWindow } from "../../modal/ImageInsertModalWindow";
import { ImageCropper } from "../../image/imagecropper";
import { Option } from "../option/option";
import { OptionEditor } from "../option/optioneditor";
import { QuestionFooter } from "../question/questionfooter";

interface QuestionEditorProps{
    question: QuestionProps;
    index: number;
    setQuestions: (stateQuestions: QuestionProps[]) => void;
    questions: QuestionProps[];
}

export const QuestionEditor: FC<QuestionEditorProps> = ({question, index, setQuestions, questions}) => {
    const [isOpenImage, setIsOpenImage] = useState(false);

    function onChange(value: string){
        let newQues = [...questions];
        newQues[index].questionText = value;
        setQuestions(newQues);
    }

    function addQuestionImage(value: string){
        let newQues = [...questions];
        newQues[index].questionImage = value;
        setQuestions(newQues);
    }

    function addQuestionType(type: string, index: number){
        let newQues = [...questions];
        if((type === QuestionTypeConst.TEXT || type === QuestionTypeConst.TEXTAREA || type === QuestionTypeConst.DATE || type === QuestionTypeConst.SCALE) 
        && newQues[index].options.length > 1){
            newQues[index].options.splice(1, newQues[index].options.length - 1)
        }
        
        newQues[index].questionType = type;
        setQuestions(newQues);
    }

    function onSetClassName(values: string[]){
        let newQues = [...questions];
        newQues[index].classNames = values;
        setQuestions(newQues);
    }

    function formattedImage(type: string){
        let wrapper = document.getElementById('body_image') as HTMLElement;
        let navigationTool = document.getElementById('navigation_tool') as HTMLElement;
        let newQues = [...questions];

        if(!newQues[index].imageWrapper){
            newQues[index].imageWrapper = { width: '100', height: '100', position: 'left'};
        }

        if(type === 'left'){
            newQues[index].imageWrapper!.position = 'flex-start'; 
            wrapper.style.setProperty('justify-content', 'flex-start')
        }else if(type === 'right'){
            newQues[index].imageWrapper!.position = 'flex-end'; 
            wrapper.style.setProperty('justify-content', 'flex-end')
        }else if(type === 'center'){
            newQues[index].imageWrapper!.position = 'center'; 
            wrapper.style.setProperty('justify-content', 'center')
        }
        setQuestions(newQues);
        navigationTool.classList.add('display-none');
    }

    function setImageValues(height: string, width: string){
        let newQues = [...questions];
        if(!newQues[index].imageWrapper){
            newQues[index].imageWrapper = { height: height, width: width, position: 'left' }; 
        }else{
            newQues[index].imageWrapper = { position: newQues[index].imageWrapper!.position, width: width, height: height };
        }
        
        setQuestions(newQues);
    }

    function setEmptyImage(){
        let newQuestions = [...questions];
        newQuestions[index].questionImage = '';
        setQuestions(newQuestions);
    }

    return (
        <>
        <AccordionDetails className="add_question">
            <div className="add_question_top">
                <CustomizedInput id="input_question" standardClassName="question default_input" classNames={question.classNames} setClassNames={onSetClassName}
                    inputText={question.questionText} setInputText={onChange} fontFamily={question.elementStyle.fontFamily} fontSize={question.elementStyle.fontSize}/>
                <IconButton onClick={() => setIsOpenImage(true)}><CropOriginal style={{color: '#5f6368'}}/></IconButton>
                <Select className="select" value={question.questionType}>
                    <MenuItem id={QuestionTypeConst.TEXT} value={QuestionTypeConst.TEXT} onClick={() => addQuestionType(QuestionTypeConst.TEXT, index)}>
                        <div className="body_question">
                            <ShortText className="tools_icon" /> 
                            <span className="tool_text">Текст (строка)</span>
                        </div>
                    </MenuItem>
                    <MenuItem id={QuestionTypeConst.TEXTAREA} value={QuestionTypeConst.TEXTAREA} onClick={() => addQuestionType(QuestionTypeConst.TEXTAREA, index)}>
                        <div className="body_question">
                            <Subject className="tools_icon" /> 
                            <span className="tool_text">Текст (абзац)</span>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem id={QuestionTypeConst.CHECKBOX} value={QuestionTypeConst.CHECKBOX} onClick={() => addQuestionType(QuestionTypeConst.CHECKBOX, index)} >
                        <div className="body_question">
                            <CheckBoxOutlined className="tools_icon"/> 
                            <span className="tool_text">Несколько из списка</span>
                        </div>
                    </MenuItem>
                    <MenuItem id={QuestionTypeConst.SELECT} value={QuestionTypeConst.SELECT} onClick={() => addQuestionType(QuestionTypeConst.SELECT, index)}>
                        <div className="body_question">
                            <ExpandCircleDownOutlined className="tools_icon"/>
                            <span className="tool_text">Раскрывающийся список</span>
                        </div>
                    </MenuItem>
                    <MenuItem id={QuestionTypeConst.RADIO} value={QuestionTypeConst.RADIO} onClick={() => addQuestionType(QuestionTypeConst.RADIO, index)}>
                        <div className="body_question">
                            <RadioButtonChecked className="tools_icon"/> 
                            <span className="tool_text">Один из списка</span>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem id={QuestionTypeConst.SCALE} value={QuestionTypeConst.SCALE} onClick={() => addQuestionType(QuestionTypeConst.SCALE, index)}>
                        <div className="body_question">
                            <LinearScale className="tools_icon"/>
                            <span className="tool_text">Шкала</span>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem id={QuestionTypeConst.DATE} value={QuestionTypeConst.DATE} onClick={() => addQuestionType(QuestionTypeConst.DATE, index)}>
                        <div className="body_question">
                            <CalendarMonth className="tools_icon"/>
                            <span className="tool_text">Дата</span>
                        </div>
                    </MenuItem>
                </Select>
            </div>

            {question.questionImage && 
            <ImageCropper imageData={question.questionImage} handleDeleteImage={setEmptyImage} formattedImage={formattedImage} setValue={setImageValues}/>}

            {question.options.map((opt, j) => 
                <Option key={j} questions={questions} setQuestions={setQuestions} question={question} indexQuestion={index} option={opt} indexOption={j}/>
            )}

            {question.options.length < 5 
            ?  <OptionEditor questions={questions} setQuestions={setQuestions} question={question} questionIndex={index}/>
            :  <></>}

            <QuestionFooter questions={questions} setQuestions={setQuestions} question={question} indexQuestion={index}/>
        </AccordionDetails>
        <ImageInsertModalWindow isOpen={isOpenImage} setIsOpen={setIsOpenImage} addImage={addQuestionImage}/>
        </>
    );
}