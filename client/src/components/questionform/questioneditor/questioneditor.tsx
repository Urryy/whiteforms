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

interface QuestionEditorProps{
    question: QuestionProps;
    index: number;
    setQuestions: (stateQuestions: QuestionProps[]) => void;
    questions: QuestionProps[];
}

export const QuestionEditor: FC<QuestionEditorProps> = ({question, index, setQuestions, questions}) => {
    const textContext = useTextContext();

    function onChange(value: string){
        let newQues = [...questions];
        newQues[index].questionText = value;
        setQuestions(newQues);
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

    function addQuestionType(type: string, index: number){
        let newQues = [...questions];
        if((type === QuestionTypeConst.TEXT || type === QuestionTypeConst.TEXTAREA || type === QuestionTypeConst.DATE || type === QuestionTypeConst.SCALE) 
        && newQues[index].options.length > 1){
            newQues[index].options.splice(1, newQues[index].options.length - 1)
        }
        
        newQues[index].questionType = type;
        setQuestions(newQues);
    }

    function changeValueOptions(target: string, indexQues: number, indexOpt: number){
        let newQues = [...questions];
        newQues[indexQues].options[indexOpt].optionText = target;
        setQuestions(newQues);
    }

    function removeOption(indexQues: number, indexOpt: number){
        let ques = [...questions];
        if(ques[indexQues].options.length > 1){
            ques[indexQues].options.splice(indexOpt, 1);
        }
        setQuestions(ques);
    }

    function addOption(indexQues: number, quesType: string){
        if(quesType === 'text' || quesType === 'textarea')
            return;

        let ques = [...questions];
        if(ques[indexQues].options.length < 5){   
            if(ques[index].options.find(item => item.isAnother)){
                ques[index].options.splice(ques[index].options.length - 1, 0, {optionText: `Вариант ${ques[indexQues].options.length}`, 
                elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText} })
            }else{
                ques[index].options.push({optionText: `Вариант ${ques[indexQues].options.length + 1}`, 
                elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText} })
            }
        }   
        setQuestions(ques);
    }

    function addAnother(index: number){
        let ques = [...questions];
        if(ques[index].options.length < 5){
            if(ques[index].options.find(item => item.isAnother)){
                ques[index].options.splice(ques[index].options.length - 1, 0, {optionText: '', elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText}})
            }else{
                ques[index].options.push({optionText: ``, isAnother: true, elementStyle: {fontSize: textContext.sizeOptionText, fontFamily: textContext.fontOptionText}})
            }
        }  
        setQuestions(ques);
    }

    function copyQuestion(index: number){
        expandeCloseAll();
        let ques = [...questions];
        let newQuestion = {...ques[index]};
        setQuestions([...questions, newQuestion]);
    }

    function deleteQuestion(index: number){
        let ques = [...questions];
        if(ques.length > 1){
            ques.splice(index, 1);
        }
        setQuestions(ques);
    }

    function requireQuestion(index: number){
        var ques = [...questions];
        ques[index].required = !ques[index].required;
        setQuestions(ques); 
    }

    function expandeCloseAll(){
        let ques = [...questions];
        for (let index = 0; index < ques.length; index++) {
            ques[index].open = false;
        }
        setQuestions(ques);
    }

    function addAnswer(index: number){
        let ques = [...questions];
        ques[index].answer = !ques[index].answer;
        setQuestions(ques);
    }

    function getInputByType(opt: OptionsProps, j: number){ 
        if(opt.isAnother){
            return <input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Другое..." value="" 
            style={{fontFamily: opt.elementStyle.fontFamily, fontSize: `${opt.elementStyle.fontSize}pt`}}/>
        }

        if(question.questionType === QuestionTypeConst.TEXT)
            return <input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Краткий ответ" value="" 
            style={{fontFamily: opt.elementStyle.fontFamily, fontSize: `${opt.elementStyle.fontSize}pt`}}/>
        else if(question.questionType === QuestionTypeConst.DATE){
            return <LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker label="День, месяц, год" disabled /></LocalizationProvider>
        }
        else if(question.questionType === QuestionTypeConst.TEXTAREA)
            return <input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Развернутый ответ" value=""
            style={{fontFamily: opt.elementStyle.fontFamily, fontSize: `${opt.elementStyle.fontSize}pt`}}/>
        else if(question.questionType === QuestionTypeConst.SCALE)
            return <div>
                        <div className="scale_selects">
                            <Select labelId="start_select" id="start_select" value={question.startScaleValue} style={{marginRight: '25px'}}
                            onChange={(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => onChangeScaleValue(e.target.value as number, index, true)}>
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                            </Select>
                            <span>_</span>
                            <Select labelId="end_select" id="end_select" value={question.endScaleValue} style={{marginLeft: '27px'}}
                            onChange={(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => onChangeScaleValue(e.target.value as number, index, false)}>
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
                                    onChange={(e) => onChangeScaleDescription(e.target.value, index, true)}/>
                            </div>
                            <div className="scale_description_end">
                                <span>{question.endScaleValue}</span>
                                <input type="text" className="text_input text_input_border scale_input" id='input_option' placeholder="Подпись (необязательно)"
                                    style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}
                                    onChange={(e) => onChangeScaleDescription(e.target.value, index, false)}/>
                            </div>
                        </div>
                   </div>
        else 
            return <input type="text" className="text_input text_input_border" id='input_option' value={opt.optionText}
            onChange={(e) => changeValueOptions(e.target.value, index, j)} style={{fontFamily: opt.elementStyle.fontFamily, fontSize: `${opt.elementStyle.fontSize}pt`}}/>
    }

    function getPreviewInputByType(indexOpt: number){
        if(question.questionType === QuestionTypeConst.SELECT){
            return <span>{indexOpt + 1}. </span>
        }

        return (question.questionType !== QuestionTypeConst.TEXT && question.questionType !== QuestionTypeConst.TEXTAREA &&
            question.questionType !== QuestionTypeConst.DATE && question.questionType !== QuestionTypeConst.SCALE)
        ? <input type={question.questionType} style={{marginRight: '5px'}} disabled={true} size={50}/>
        : <></>;
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
                <Button size="small" className="add_question_button" style={{ marginLeft: '2px'}} onClick={() => addOption(index, question.questionType)}>Добавить вариант</Button>
            </div>
        }

        if(question.options.find(item => item.isAnother)){
            return <div>
                <Button size="small" className="add_question_button" style={{ marginLeft: '2px'}} onClick={() => addOption(index, question.questionType)}>Добавить вариант</Button>
            </div>
        }

        return (
        <div>
            <input type="text" className="text_input" style={{fontSize: '15px', width: '120px', color: 'blue', margin: '0 3px'}} placeholder="Добавить другое" onClick={() => addAnother(index)}/>
            <span className="tool_text tool_option_title">или</span>
            <Button size="small" className="add_question_button" style={{ marginLeft: '2px'}} onClick={() => addOption(index, question.questionType)}>Добавить вариант</Button>
        </div>) 
    }

    function onSetClassName(values: string[]){
        let newQues = [...questions];
        newQues[index].classNames = values;
        setQuestions(newQues);
    }

    return (
        <>
        <AccordionDetails className="add_question">
            <div className="add_question_top">
                <CustomizedInput id="input_question" standardClassName="question default_input" classNames={question.classNames} setClassNames={onSetClassName}
                    inputText={question.questionText} setInputText={onChange} fontFamily={question.elementStyle.fontFamily} fontSize={question.elementStyle.fontSize}/>
                <IconButton><CropOriginal style={{color: '#5f6368'}}/></IconButton>
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
            {question.options.map((opt, j) => 
                <div key={j} className="add_question_body">
                    <div className="body_question">
                        {getPreviewInputByType(j)}
                        {getInputByType(opt, j)}  
                    </div>
                    <div className="body_question">
                        <IconButton><CropOriginal style={{color: '#5f6368'}}/></IconButton>
                        <IconButton onClick={() => removeOption(index, j)}><Close/></IconButton>
                    </div>
                </div>
            )}
            {question.options.length < 5 
                ?  (<div className="add_question_body">
                        <FormControlLabel disabled 
                            control={getPreviewInputByTypeForTools()}
                            label={getToolsForAddingNewOption()}/>
                    </div>) 
                :  ""}
            <div className="add_footer">
                <div className="add_question_bottom_left">
                    <Button style={{textTransform: 'none', color: '#4285f4', fontSize: '13px', fontWeight: 600}} onClick={()=>addAnswer(index)}>
                        <ArrowOutward style={{border: '2px solid #4285f4', padding: '2px', marginRight: '8px'}}/> Answere key
                    </Button>
                </div>
                <div className="add_question_bottom_right">
                    <IconButton aria-label="Copy" onClick={() => {copyQuestion(index)}}>
                        <FilterNone />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => {deleteQuestion(index)}}>
                        <Delete />
                    </IconButton>
                    <span className="whitesmoke">Обязательно 
                        <Switch name="checkedA" color="primary" checked={question.required} onClick={() => requireQuestion(index)}/>
                    </span>
                </div>
            </div>
        </AccordionDetails>
        </>
    );
}