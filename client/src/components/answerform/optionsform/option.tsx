import React, { FC } from "react";
import { QuestionProps, ScaleValueProps } from "../../../interfaces/interfaces";
import { QuestionTypeConst } from "../../../interfaces/consts";

import './option.css';
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField } from "@mui/material";
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

    const getStyle = (type: string) => {
        console.log(question.options[0].elementStyle);
        if(type === 'fontFamily')
            return question.options[0].elementStyle.fontFamily
        else
            return question.options[0].elementStyle.fontSize
    }

    function getOption(){
        if(question.questionType === QuestionTypeConst.CHECKBOX){
            return <FormGroup>
                {question.options.map((item) => 
                    <FormControlLabel control={<Checkbox />} label={<span style={{fontFamily: item.elementStyle.fontFamily, fontSize: item.elementStyle.fontSize}}>{item.optionText}</span>} />
                )}
          </FormGroup>
        }else if(question.questionType === QuestionTypeConst.RADIO){
            return <RadioGroup name="radio_option">
                {question.options.map((item) => 
                    <FormControlLabel value={item.optionText} control={<Radio />} label={<span style={{fontFamily: item.elementStyle.fontFamily, fontSize: item.elementStyle.fontSize}}>{item.optionText}</span>}/>
                )}
            </RadioGroup>
        }else if(question.questionType === QuestionTypeConst.SELECT){
            return <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="select_option">Выбрать</InputLabel>
                <Select labelId="select_option" id="select_option" label="Выбрать">
                        <MenuItem value=""><em>Выбрать</em></MenuItem>
                        {question.options.map((item) => 
                            <MenuItem value={item.optionText} style={{fontFamily: item.elementStyle.fontFamily, fontSize: item.elementStyle.fontSize}}>{item.optionText}</MenuItem>
                        )}
                </Select>
            </FormControl>
            
        }else if(question.questionType === QuestionTypeConst.DATE){
            return <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="День, месяц, год" />
            </LocalizationProvider>
        }else if(question.questionType === QuestionTypeConst.DESCRIPTION){
            return question.options.map((item) => 
                <p style={{fontFamily: item.elementStyle.fontFamily, fontSize: item.elementStyle.fontSize}}>{item.optionText}</p>
            )
        }else if(question.questionType === QuestionTypeConst.IMAGE){
            return question.options.map((item) =>
                <div className="image_wrapper" style={{height: `${item.imageWrapper?.height}`, width: `${item.imageWrapper?.width}`}}>
                    <img alt="image1" src={item.optionText}/>
                </div>
            )
        }else if(question.questionType === QuestionTypeConst.SCALE){
            return <div className="slider_flex">
                <span style={{fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}>{question.descStartScaleValue}</span>
                    <Slider min={question.startScaleValue!} max={question.endScaleValue!} step={1} defaultValue={question.startScaleValue!} marks={getScaleMarks()}
                                        aria-label="slider" style={{flex: '1', margin: '0 20px'}}/>
                <span style={{fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}>{question.descEndScaleValue}</span>
            </div>
        }else if(question.questionType === QuestionTypeConst.TEXT){
            return <TextField id="input_text" label="Мой ответ" multiline maxRows={4} variant="standard" fullWidth
                inputProps={{style: {fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}}
                InputLabelProps={{style: {fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}}/>
        }else if(question.questionType === QuestionTypeConst.TEXTAREA){
            return <TextField id="input_textarea" label="Мой ответ" multiline rows={4} fullWidth
                inputProps={{style: {fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}}
                InputLabelProps={{style: {fontFamily: getStyle('fontFamily'), fontSize: getStyle('fontSize')}}}/>
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