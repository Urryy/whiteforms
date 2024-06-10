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
    elementStyle: ElementStyleProps,
    options: OptionsProps[]
}

export interface OptionsProps{
    id?: string,
    optionText: string,
    isAnother?: boolean,
    imageWrapper?: ImageWrapperProps,
    elementStyle: ElementStyleProps
}

export interface ImageWrapperProps{
    width: string,
    height: string,
    position: string
}

export interface FormProps{
    id?: string,
    questions: QuestionProps[],
    name: string,
    description: string,
    elementStyle: ElementStyleProps
}

export interface StateProps{
    questions?: QuestionProps[],
    questionType?: string,
    doc_name?: string,
    doc_desc?: string,
    doc_name_element_style?: ElementStyleProps,
    doc_desc_element_style?: ElementStyleProps,
    doc_name_classNames?: string[],
    doc_desc_classNames?: string[],
    kolontitul_image?: string
}

export interface ActionTypesProps{
    SET_QUESTIONS: string,
    CHANGE_TYPE: string,
    SET_DOC_NAME: string,
    SET_DOC_DESC: string,
    SET_STYLE_DOC_NAME: string,
    SET_STYLE_DOC_DESC: string,
    SET_DOC_NAME_CLASSNAMES: string,
    SET_DOC_DESC_CLASSNAMES: string,
    SET_KOLONTITUL_IMAGE: string
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

export interface ElementStyleProps{
    fontSize: string,
    fontFamily: string
}