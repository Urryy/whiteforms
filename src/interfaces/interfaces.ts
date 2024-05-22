export interface QuestionProps{
    id?: string,
    questionText: string,
    questionType: string,
    open: boolean,
    required: boolean,
    points: number,
    answerKey: string,
    answer: boolean,
    startScaleValue?: number | null,
    descStartScaleValue?: string | null,
    endScaleValue?: number | null,
    descEndScaleValue?: string | null,
    classNames: string[],
    options: OptionsProps[]
}

export interface OptionsProps{
    id?: string,
    optionText: string,
    isAnother?: boolean,
    imageWrapper?: ImageWrapperProps
}

export interface ImageWrapperProps{
    width: string,
    height: string
}

export interface FormProps{
    id?: string,
    questions: QuestionProps[],
    name: string,
    description: string
}

export interface StateProps{
    questions?: QuestionProps[],
    questionType?: string,
    doc_name?: string,
    doc_desc?: string
}

export interface ActionTypesProps{
    SET_QUESTIONS: string,
    CHANGE_TYPE: string,
    SET_DOC_NAME: string,
    SET_DOC_DESC: string
}

export interface initialStateProps {
    type: string,
    state: StateProps
}

export interface AnswerProps{
    questionText: string,
    answer: string
}

export interface ScaleValueProps{
    label: string,
    value: number
}