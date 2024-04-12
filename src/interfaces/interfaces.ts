export interface QuestionProps{
    questionText: string,
    questionType: string,
    open: boolean,
    required: boolean,
    points: number,
    answerKey: string,
    answer: boolean,
    options: OptionsProps[]
}

export interface OptionsProps{
    optionText: string
}

export interface StateProps{
    questions: QuestionProps[],
    questionType: string,
    doc_name: string,
    doc_desc: string
}

export interface ActionTypesProps{
    SET_QUESTIONS: string,
    CHANGE_TYPE: string,
    SET_DOC_NAME: string,
    SET_DOC_DESC: string
}