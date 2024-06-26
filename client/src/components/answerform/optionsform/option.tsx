import React, { FC, ReactNode, useState } from "react";
import { FormFilledProps, OptionsProps, QuestionFilledProps, QuestionProps, ScaleValueProps } from "../../../interfaces/interfaces";
import { QuestionTypeConst } from "../../../interfaces/consts";

import './option.css';
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Slider, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CheckboxOption } from "./checkboxoption/checkboxoption";
import { RadioOption } from "./radiooption/radiooption";
import { SelectOption } from "./selectoption/selectoption";
import { DateOption } from "./dateoption/dateoption";
import { ScaleOption } from "./scaleoption/scaleoption";
import { TextOption } from "./textoption/textoption";

interface OptionProps{
    question: QuestionProps,
    index: number,
    filledQuestions?: QuestionFilledProps[],
    setFilledQuestions?: (value: QuestionFilledProps[]) => void
}

export const Option: FC<OptionProps> = ({question, index, filledQuestions, setFilledQuestions}) =>{
    function getOption(){
        if(question.questionType === QuestionTypeConst.CHECKBOX){
            return <CheckboxOption index={index} question={question} filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions}/>
        }else if(question.questionType === QuestionTypeConst.RADIO){
            return <RadioOption index={index} question={question} filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions}/>
        }else if(question.questionType === QuestionTypeConst.SELECT){
            return <SelectOption index={index} question={question} filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions}/>     
        }else if(question.questionType === QuestionTypeConst.DATE){
            return <DateOption index={index} question={question} filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions}/>
        }else if(question.questionType === QuestionTypeConst.DESCRIPTION){
            return question.options.map((item) => 
                <p style={{fontFamily: item.elementStyle.fontFamily, fontSize: `${item.elementStyle.fontSize}pt`}}>{item.optionText}</p>
            )
        }else if(question.questionType === QuestionTypeConst.IMAGE){
            return question.options.map((item) =>
                <div className="image_box" style={{justifyContent: `${item.imageWrapper?.position}`}}>
                    <div className="image_wrapper" style={{ height: `${item.imageWrapper?.height}`, width: `${item.imageWrapper?.width}` }}>
                        <img alt="image1" src={item.optionText}/>
                    </div>
                </div>)
        }else if(question.questionType === QuestionTypeConst.SCALE){
            return <ScaleOption index={index} question={question} filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions}/>
        }else if(question.questionType === QuestionTypeConst.TEXT){
            return <TextOption id="input_text" variant="standard" index={index} question={question} 
            filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions} rows={1}/>
        }else if(question.questionType === QuestionTypeConst.TEXTAREA){
            return <TextOption id="input_text" variant="outlined" index={index} question={question} 
            filledQuestions={filledQuestions} setFilledQuestions={setFilledQuestions} rows={4}/>
        }else{
            return <></>
        }
    }

    return (
        <>  
            {getOption()}
        </>
    );
}