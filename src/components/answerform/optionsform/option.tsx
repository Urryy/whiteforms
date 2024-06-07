import React, { FC } from "react";
import { QuestionProps, ScaleValueProps } from "../../../interfaces/interfaces";
import { QuestionTypeConst } from "../../../interfaces/consts";

import './option.css';
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface OptionProps{
    question: QuestionProps
}

export const Option: FC<OptionProps> = ({question}) =>{

    const getScaleMarks = () => {
        let marks: ScaleValueProps[] = []
        for (let index = question.startScaleValue!; index <= question.endScaleValue!; index++) {
            marks.push({label: index.toString(), value: index})
        }
        return marks;
    }

    function getOption(){
        if(question.questionType === QuestionTypeConst.CHECKBOX){
            return <FormGroup>
                {question.options.map((item) => 
                    <FormControlLabel control={<Checkbox />} label={item.optionText} />
                )}
          </FormGroup>
        }else if(question.questionType === QuestionTypeConst.RADIO){
            return <RadioGroup name="radio_option">
                {question.options.map((item) => 
                    <FormControlLabel value={item.optionText} control={<Radio />} label={item.optionText} />
                )}
            </RadioGroup>
        }else if(question.questionType === QuestionTypeConst.SELECT){
            return <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="select_option">Выбрать</InputLabel>
                <Select labelId="select_option" id="select_option" label="Выбрать">
                        <MenuItem value=""><em>Выбрать</em></MenuItem>
                        {question.options.map((item) => 
                            <MenuItem value={item.optionText}>{item.optionText}</MenuItem>
                        )}
                </Select>
            </FormControl>
            
        }else if(question.questionType === QuestionTypeConst.DATE){
            return <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="День, месяц, год" />
            </LocalizationProvider>
        }else if(question.questionType === QuestionTypeConst.DESCRIPTION){

        }else if(question.questionType === QuestionTypeConst.IMAGE){

        }else if(question.questionType === QuestionTypeConst.SCALE){
            return <>
                <span>{question.descStartScaleValue}</span>
                    <Slider min={question.startScaleValue!} max={question.endScaleValue!} step={1} defaultValue={question.startScaleValue!} marks={getScaleMarks()}
                                        aria-label="slider" style={{flex: '1', margin: '0 20px'}}/>
                <span>{question.descEndScaleValue}</span>
            </>
        }else if(question.questionType === QuestionTypeConst.TEXT){

        }else if(question.questionType === QuestionTypeConst.TEXTAREA){

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