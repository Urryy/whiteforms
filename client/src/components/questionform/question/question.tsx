import { DragIndicator } from "@mui/icons-material";
import { Accordion } from "@material-ui/core"
import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { QuestionPanel } from "../questionpanel/questionpanel";
import { QuestionProps } from "../../../interfaces/interfaces";
import { QuestionToolbar } from "../questiontoolbar/questiontoolbar";
import { QuestionTypeConst } from "../../../interfaces/consts";
import { QuestionDescription } from "../questiondescription/QuestionDescription";
import { QuestionImage } from "../questionimage/questionimage";
import { QuestionEditor } from "../questioneditor/questioneditor";
import { QuestionAnswerKey } from "../questionanswerkey/questionanswerkey";

interface QuestionComponent{
    question: QuestionProps,
    index: number,
    questions: QuestionProps[],
    setQuestions: (value: QuestionProps[]) => void
}

export const QuestionComponent: FC<QuestionComponent> = ({question, questions, setQuestions, index}) => {

    function showQuestions(question: QuestionProps, index: number){
        if(question.questionType === QuestionTypeConst.DESCRIPTION){
            return <QuestionDescription question={question} index={index} questions={questions} setQuestions={setQuestions}/>
        }else if(question.questionType === QuestionTypeConst.IMAGE){
            return <QuestionImage question={question} index={index} questions={questions} setQuestions={setQuestions}/>
        }else{
            return !question.answer ?
                (<QuestionEditor question={question} index={index} questions={questions} setQuestions={setQuestions}/>)
                :(<QuestionAnswerKey question={question} index={index} questions={questions} setQuestions={setQuestions}/>)
        }
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

    return <Draggable key={index} draggableId={index + 'id'} index={index}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <div>
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <DragIndicator className="drag_indicator" fontSize="small"/>
                            </div>

                            <div>
                                <Accordion expanded={question.open} onChange={() => handleExpand(index)} className={question.open ? 'add_border' : ''}>
                                    <QuestionPanel question={question} index={index}/>
                                    <div className="question_box">
                                        {showQuestions(question, index)}

                                    {!question.answer
                                    ? (<QuestionToolbar question={question} questions={questions} setQuestions={setQuestions}/>)
                                    : <></>}
                                    </div> 
                                </Accordion>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
}