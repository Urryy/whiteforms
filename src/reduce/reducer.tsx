import { ActionTypesProps, StateProps, initialStateProps } from "../interfaces/interfaces";

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
        required: false,
        startScaleValue: null,
        descStartScaleValue: null,
        endScaleValue: null,
        descEndScaleValue: null,
        classNames: []
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

const reducer = (state: StateProps = initialState, action: initialStateProps): StateProps => {
    switch(action.type){
        case actionTypes.SET_QUESTIONS:
            return {
                ...state, questions: action.state.questions
            };
        case actionTypes.CHANGE_TYPE:
            return {
                ...state, questionType: action.state.questionType
            };
        case actionTypes.SET_DOC_NAME:
            return {
                ...state, doc_name: action.state.doc_name
            };
        case actionTypes.SET_DOC_DESC:
            return {
                ...state, doc_desc: action.state.doc_desc
            };
        default: 
            return state;
    }
}

export default reducer;