import { ActionTypesProps, StateProps, initialStateProps } from "../interfaces/interfaces";

export const initialState: StateProps = {
    questions: [{
        questionText: "Вопрос",
        questionType: "radio",
        options: [
            {optionText: "Значение 1", elementStyle: {fontSize: '11', fontFamily: 'Roboto, Arial, sans-serif'}},
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
        classNames: [], 
        elementStyle: {fontSize: '12', fontFamily: 'Roboto, Arial, sans-serif'}
    }],
    doc_name: 'Название формы',
    doc_desc: 'Описание формы'
};

export const actionTypes: ActionTypesProps = {
    SET_QUESTIONS: 'SET_QUESTIONS',
    SET_DOC_DESC: 'SET_DOC_DESC',
    SET_DOC_NAME: 'SET_DOC_NAME',
    SET_STYLE_DOC_NAME: 'SET_STYLE_DOC_NAME',
    SET_STYLE_DOC_DESC: 'SET_STYLE_DOC_DESC',
    SET_DOC_NAME_CLASSNAMES: 'SET_DOC_NAME_CLASSNAMES',
    SET_DOC_DESC_CLASSNAMES: 'SET_DOC_DESC_CLASSNAMES',
    SET_KOLONTITUL_IMAGE: 'SET_KOLONTITUL_IMAGE',
    SET_PREVIEW_IMAGE: 'SET_PREVIEW_IMAGE'
}

const reducer = (state: StateProps = initialState, action: initialStateProps): StateProps => {
    switch(action.type){
        case actionTypes.SET_QUESTIONS:
            return {
                ...state, questions: action.state.questions
            };
        case actionTypes.SET_DOC_NAME:
            return {
                ...state, doc_name: action.state.doc_name
            };
        case actionTypes.SET_DOC_DESC:
            return {
                ...state, doc_desc: action.state.doc_desc
            };
        case actionTypes.SET_STYLE_DOC_NAME:
            return {
                ...state, doc_name_element_style: action.state.doc_name_element_style
            };
        case actionTypes.SET_STYLE_DOC_DESC:
            return {
                ...state, doc_desc_element_style: action.state.doc_desc_element_style
            };
        case actionTypes.SET_DOC_NAME_CLASSNAMES:
            return {
                ...state, doc_name_classNames: action.state.doc_name_classNames
            }
        case actionTypes.SET_DOC_DESC_CLASSNAMES:
            return {
                ...state, doc_desc_classNames: action.state.doc_desc_classNames
            }
        case actionTypes.SET_KOLONTITUL_IMAGE:
            return {
                ...state, kolontitul_image: action.state.kolontitul_image
            }
        case actionTypes.SET_PREVIEW_IMAGE:
            return {
                ...state, preview_image: action.state.preview_image
            }
        default: 
            return state;
    }
}

export default reducer;