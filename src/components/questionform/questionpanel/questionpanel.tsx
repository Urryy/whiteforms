import { AccordionSummary, Box, FormControlLabel, Slider, Typography } from "@material-ui/core";
import React, { FC } from "react";
import { OptionsProps, QuestionProps, ScaleValueProps } from "../../../interfaces/interfaces";
import { QuestionTypeConst } from "../../../interfaces/consts";
import { useTextContext } from "../../../contexts/TextContext";
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface QuestionPanelProps{
    question: QuestionProps;
    index: number;
}

export const QuestionPanel: FC<QuestionPanelProps> = ({question, index}) => {
    const titleQuestion = question.questionText.length === 0 ? 'Вопрос' : `${question.questionText}`
    const textContext = useTextContext();
    const getScaleMarks = () => {
        let marks: ScaleValueProps[] = []
        for (let index = question.startScaleValue!; index <= question.endScaleValue!; index++) {
            marks.push({label: index.toString(), value: index})
        }
        return marks;
    }

    const getOption = (opt: OptionsProps, optIndex: number) => {
        if(question.questionType === QuestionTypeConst.TEXT)
            return (<FormControlLabel style={{marginLeft: '5px', marginBottom: '5px'}} disabled
                control={<></>}
                label={<input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Краткий ответ" value=""
                style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}/>}/>)
        else if(question.questionType === QuestionTypeConst.TEXTAREA)
            return (<FormControlLabel style={{marginLeft: '5px', marginBottom: '5px'}} disabled
                    control={<></>}
                    label={<input type="text" className="text_input text_input_border" id='input_option' disabled placeholder="Развернутый ответ" value=""
                    style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}/>}/>)
        else if(question.questionType === QuestionTypeConst.DATE)
            return (<FormControlLabel style={{marginLeft: '5px', marginBottom: '5px'}} disabled
                    control={<></>}
                    label={<LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker label="День, месяц, год" disabled /></LocalizationProvider>}
                    />)
        else if(question.questionType === QuestionTypeConst.SELECT)
            return (<FormControlLabel style={{marginLeft: '5px', marginBottom: '5px'}} disabled
                    control={<span style={{marginRight: '5px'}}>{optIndex + 1}. </span>}
                    label={<Typography className="label_formcontrolelabel" id='input_option'
                            style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}>
                                {opt.optionText}
                            </Typography>}/>
            )
        else if(question.questionType === QuestionTypeConst.SCALE)
            return (
            <>
                <span>{question.descStartScaleValue}</span>
                <Slider min={question.startScaleValue!} max={question.endScaleValue!} step={1} defaultValue={question.startScaleValue!} marks={getScaleMarks()}
                                        aria-label="Disabled slider" disabled style={{flex: '1', margin: '0 20px'}}/>
                <span>{question.descEndScaleValue}</span>
            </>  
            )
        else if(question.questionType === QuestionTypeConst.DESCRIPTION)
            return(
            <>
                <p className="description_question" style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}>
                    {opt.optionText === "" ? "Описание не обязательно" : opt.optionText}
                </p>
            </>
            )
        else if(question.questionType === QuestionTypeConst.IMAGE)
            return(
            <div className="image_wrapper" style={{height: `${question.options[0].imageWrapper?.height}`, width: `${question.options[0].imageWrapper?.width}`}}>
                <img alt="image1" src={question.options[0].optionText}/>
            </div>
            )
        else
            return (<FormControlLabel style={{marginLeft: '5px', marginBottom: '5px'}} disabled
                control={<input type={question.questionType} color="primary" required={question.required} style={{marginRight: '5px'}}/>}
                label={opt.isAnother
                        ? <Typography className="label_formcontrolelabel_another" style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}>
                            Другое...
                        </Typography>
                        : <Typography className="label_formcontrolelabel" id='input_option' style={{fontFamily: textContext.fontOptionText, fontSize: `${textContext.sizeOptionText}pt`}}>
                            {opt.optionText}
                        </Typography>}/>)
    }

    return (
        <>
        {!question.open 
            ?  
            <AccordionSummary id="panel1a-header" style={{width: '100%'}}>
                <div className="common_question">
                    <Typography className={"saved_questions_title " + question.classNames.join(' ')} id='input_question' style={{fontFamily: textContext.fontQuestionText, fontSize: `${textContext.sizeQuestionText}pt`}}>
                        {titleQuestion}
                    </Typography>
                    {question.options.map((opt, j) => (
                        <div key={j}>
                            <div style={{display:"flex", paddingRight: '35px'}}>
                                {getOption(opt, j)}
                            </div>
                        </div>
                    ))}
                </div>
            </AccordionSummary>
            : ""}
            
        </>
    );
}