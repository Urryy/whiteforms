import { ActionTypesProps, StateProps } from "../interfaces/interfaces";

export const initialState: StateProps = {
    questions: [{
        questionText: "Вопрос",
        questionType: "radio",
        options: [
            {optionText: "Значение 1"},
        ],
        points: 0,
        answerKey: '',
        answer: false,
        open: true,
        required: false
    }],
    questionType: 'radio',
    doc_name: 'Название формы',
    doc_desc: 'Описание формы'
};

export const actionTypes: ActionTypesProps = {
    SET_QUESTIONS: 'SET_QUESTIONS',
    SET_DOC_DESC: 'SET_DOC_DESC',
    SET_DOC_NAME: 'SET_DOC_NAME',
    CHANGE_TYPE: 'CHANGE_TYPE'
}

const reducer = (state: StateProps = initialState, action: any): StateProps => {
    switch(action.type){
        case actionTypes.SET_QUESTIONS:
            return {
                ...state, questions: action.questions
            };
        case actionTypes.CHANGE_TYPE:
            return {
                ...state, questionType: action.questions
            };
        case actionTypes.SET_DOC_NAME:
            return {
                ...state, doc_name: action.doc_name
            };
        case actionTypes.SET_DOC_DESC:
            return {
                ...state, doc_desc: action.doc_desc
            };
        default: 
            return state;
    }
}

export default reducer;

