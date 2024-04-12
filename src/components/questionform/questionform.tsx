import React, { useState } from "react";
import './questionform.css';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, IconButton, MenuItem, Select, Switch, Typography } from "@material-ui/core";
import { AddCircleOutline, ArrowOutward, ArticleOutlined, CheckBox, Close, CropOriginal, CropOriginalOutlined, Delete, DragIndicator, FilterNone, MoreVert, OndemandVideo, Radio, ShortText, ShortTextOutlined, Subject, TextFields } from "@mui/icons-material";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { QuestionProps } from "../../interfaces/interfaces";

export const QuestionForm = () => {
    const [questions, setQuestions] = useState<QuestionProps[]>([
        {
            questionText: "TEXT",
            questionType: "radio",
            options: [
                {optionText: "Bengalv"},
                {optionText: "Merlin"},
                {optionText: "Hubli"},
                {optionText: "Mandya"}
            ],
            points: 0,
            answerKey: '',
            answer: false,
            open: true,
            required: false
        }
    ]);

    const [documentName, setDocumentName] = useState<string>("Неизвестная форма");
    const [documentDesc, setDocumentDesc] = useState<string>("Описание формы");

    function onChange(target: string, index: number){
        let newQues = [...questions];
        newQues[index].questionText = target;
        setQuestions(newQues);
    }

    function addQuestionType(type: string, index: number){
        let newQues = [...questions];
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

    function addOption(indexQues: number){
        let ques = [...questions];
        if(ques[indexQues].options.length < 5){
            ques[indexQues].options.push({optionText: "Новое поле " + (ques[indexQues].options.length + 1)})
        }   
        setQuestions(ques);
    }

    function copyQuestion(index: number){
        expaneCloseAll();
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

    function addQuestion(){
        expaneCloseAll();
        setQuestions([...questions, 
            {questionText: 'Новый вопрос', questionType: 'radio', options: [{optionText: "Новое поле"}], answerKey: '', points: 0, answer: false, open: true, required: false}]);
    }

    function onDragEndResult(result: DropResult){
        if(!result.destination){
            return;
        }
        var ques = [...questions];
        const reorderQues = reorder(ques, result.source.index, result.destination.index);
        setQuestions(reorderQues);
    }

    function reorder(ques: QuestionProps[], startIndex: number, endIndex: number ): QuestionProps[]{
        const result = Array.from(ques);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    function expaneCloseAll(){
        let ques = [...questions];
        for (let index = 0; index < ques.length; index++) {
            ques[index].open = false;
        }
        setQuestions(ques);
    }

    function handleExpand(indexQues: number){
        let ques = [...questions];
        for (let index = 0; index < ques.length; index++) {
            if(indexQues === index){
                ques[index].open = true;
            }else{
                ques[index].open = false;
            }
        }
        setQuestions(ques);
    }

    function setOptionAnswer(key: string, index: number){
        let ques = [...questions];
        ques[index].answerKey = key;
        setQuestions(ques);
    }

    function setOptionPoints(points: string, index: number){
        let ques = [...questions];
        ques[index].points = Number(points);
        setQuestions(ques);
    }

    function doneAnswer(index: number){
        let ques = [...questions];
        ques[index].answer = !ques[index].answer;
        setQuestions(ques);
    }

    function addAnswer(index: number){
        let ques = [...questions];
        ques[index].answer = !ques[index].answer;
        setQuestions(ques);
    }

    function saveForm(){

    }

    function questionUI(){
        return questions.map((ques, i) => 
            <Draggable key={i} draggableId={i + 'id'} index={i}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} 
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}>
                        <div>
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <DragIndicator className="drag_indicator" fontSize="small"/>
                            </div>

                            <div>
                                <Accordion expanded={ques.open} onChange={() => handleExpand(i)}className={ques.open ? 'add_border' : ''}>

                                    <AccordionSummary id="panel1a-header" style={{width: '100%'}}>
                                        {!ques.open 
                                            ? <div>
                                                <Typography className="saved_questions_title">{i+1}. {ques.questionText}</Typography>
                                                {ques.options.map((opt, j) => (
                                                    <div key={j}>
                                                        <div style={{display:"flex"}}>
                                                            <FormControlLabel style={{marginLeft: '5px', marginBottom: '5px'}} disabled
                                                                control={<input type={ques.questionType} color="primary" required={ques.required} style={{marginRight: '5px'}}/>}
                                                                label={<Typography className="label_formcontrolelabel">{opt.optionText}</Typography>}/>
                                                        </div>
                                                    </div>
                                                ))}
                                             </div> : ""}
                                    </AccordionSummary>

                                    
                                    <div className="question_boxes">
                                        {!ques.answer ?
                                        (<AccordionDetails className="add_question">
                                            <div className="add_question_top">
                                                <input type="text" className="question" placeholder="Вопрос" value={ques.questionText} onChange={(e) => onChange(e.target.value, i)}/>
                                                <CropOriginal style={{color: '#5f6368'}}/>
                                                <Select className="select" style={{color: '#5f6368', fontSize: '13px'}}>
                                                    <MenuItem id='text' value='text' onClick={() => addQuestionType('text', i)}><Subject style={{marginRight: '10px'}} /> Paragraph</MenuItem>
                                                    <MenuItem id='checkbox' value='Checkbox' onClick={() => addQuestionType('checkbox', i)}><CheckBox style={{marginRight: '10px', color: '#70757a'}}/> Checkbox</MenuItem>
                                                    <MenuItem id='radio' value='Radio' onClick={() => addQuestionType('radio', i)}><Radio style={{marginRight:'10px', color: '#70757a'}}/> Multiply choice</MenuItem>
                                                </Select>
                                            </div>
                                            {ques.options.map((opt, j) => 
                                                <div key={j} className="add_question_body">
                                                    {ques.questionType !== 'text' 
                                                        ? <input type={ques.questionType} style={{marginRight: '10px'}}/>
                                                        : <ShortText style={{marginRight: '10px'}}/>}
                                                    <div>
                                                        <input type="text" className="text_input" placeholder="option" value={opt.optionText} onChange={(e) => changeValueOptions(e.target.value, i, j)}/>
                                                    </div>
                                                    <CropOriginal style={{color: '#5f6368'}}/>
                                                    <IconButton onClick={() => removeOption(i, j)}><Close/></IconButton>
                                                </div>
                                            )}
                                            {ques.options.length < 5 
                                                ?  (<div className="add_question_body">
                                                        <FormControlLabel disabled 
                                                            control={ques.questionType !== 'text' 
                                                                ? <input type={ques.questionType} color="primary" style={{margin: '0 30px 0 10px'}}/>
                                                                : <ShortTextOutlined />}
                                                            label={
                                                                <div>
                                                                    <input type="text" className="text_input" style={{fontSize: '13px', width: '120px'}} placeholder="Добавить другое"/>
                                                                    <Button size="small" style={{textTransform: 'none', color: '#4285f4', fontSize:'13px', fontWeight: 600}} onClick={() => addOption(i)}>Добавить поле</Button>
                                                                </div>}/>
                                                    </div>) 
                                                :  ""}
                                            <div className="add_footer">
                                                <div className="add_question_bottom_left">
                                                    <Button style={{textTransform: 'none', color: '#4285f4', fontSize: '13px', fontWeight: 600}} onClick={()=>addAnswer(i)}>
                                                        <ArrowOutward style={{border: '2px solid #4285f4', padding: '2px', marginRight: '8px'}}/> Answere key
                                                    </Button>
                                                </div>
                                                <div className="add_question_bottom">
                                                    <IconButton aria-label="Copy" onClick={() => {copyQuestion(i)}}>
                                                        <FilterNone />
                                                    </IconButton>
                                                    <IconButton aria-label="Delete" onClick={() => {deleteQuestion(i)}}>
                                                        <Delete />
                                                    </IconButton>
                                                    <span style={{color: '5f6368', fontSize: '14px'}}>Обязательно <Switch name="checkedA" color="primary" checked={ques.required} onClick={() => requireQuestion(i)}/></span>
                                                    <IconButton >
                                                        <MoreVert />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </AccordionDetails>)
                                        :(
                                        <AccordionDetails className="add_question">
                                            <div className="top_header">Choose correct answer</div>
                                            <div>
                                                <div className="add_question_top">
                                                    <input type="text" className="question" placeholder="Вопрос" value={ques.questionText} disabled/>
                                                    <input type="number" className="points" min={0} step={1} placeholder="0" onChange={(e) => setOptionPoints(e.target.value, i)}/>
                                                </div>
                                                {ques.options.map((opt, j) => (
                                                    <div className="add_question_body" key={j} style={{marginLeft:'8px', marginBottom:'10px', marginTop: '5px'}}>
                                                        <div key={j}>
                                                            <div style={{display: 'flex'}}>
                                                                <div className="form-check">
                                                                    <label style={{fontSize: '13px'}} onClick={() => setOptionAnswer(opt.optionText, i)}>
                                                                        {ques.questionType !== 'text' 
                                                                            ? <input type={ques.questionType} name={ques.questionText} value="option3"
                                                                            className="form-check-input" required={ques.required} style={{margin: '5px 10px 10px 0px'}}/>
                                                                            : <ShortText style={{marginRight: '10px'}}/>}
                                                                            {opt.optionText}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="add_question_body">
                                                    <Button size="small" style={{textTransform: 'none', color: '#4285f4', fontSize: '13px', fontWeight: 600}}>
                                                        <ArticleOutlined style={{fontSize: '20px', marginRight: '8px'}}/>Add Answer Feedback
                                                    </Button>
                                                </div>
                                                <div className="add_question_bottom">
                                                    <Button variant="outlined" color="primary" onClick={() => doneAnswer(i)}
                                                        style={{textTransform: 'none', color: '#4285f4', fontSize: '12px', marginTop: '12px', fontWeight: 600}}>
                                                        Done
                                                    </Button>
                                                </div>
                                            </div>
                                        </AccordionDetails>
                                        )}

                                        {!ques.answer
                                            ? (<div className="question_edit">
                                                <AddCircleOutline className="edit" onClick={addQuestion}/>
                                                <OndemandVideo className="edit"/>
                                                <CropOriginalOutlined className="edit"/>
                                                <TextFields className="edit"/>
                                            </div>)
                                            : ""}
                                    </div> 
                                </Accordion>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }

    return (
        <div>
            <div className="question_form">
                <br/>
                <div className="section">
                    <div className="question_title_section">
                        <div className="question_form_top">
                            <input type="text" className="question_form_top_name" style={{color: 'black'}} placeholder="Неизвестная форма" onChange={(e) => setDocumentName(e.target.value)}/>
                            <input type="text" className="question_form_top_desc" placeholder="Описание формы" onChange={(e) => setDocumentDesc(e.target.value)}/>
                        </div>
                    </div>

                    <DragDropContext onDragEnd={(e) => onDragEndResult(e)}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {questionUI()}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className="save_form">
                        <Button variant="contained" color="primary" onClick={saveForm} style={{fontSize: '14px'}}>Сохранить</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}