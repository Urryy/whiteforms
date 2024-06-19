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

export interface AxiosData<T>{
    fullFilled?: boolean,
    pending?: boolean,
    error?: boolean,
    data: T
}

export interface OptionsProps{
    id?: string,
    optionText: string,
    classNames?: string[]
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
    previewImage: string
}

export interface StateProps{
    questions?: QuestionProps[],
    doc_name?: string,
    doc_desc?: string,
    doc_name_element_style?: ElementStyleProps,
    doc_desc_element_style?: ElementStyleProps,
    doc_name_classNames?: string[],
    doc_desc_classNames?: string[],
    kolontitul_image?: string,
    preview_image?: string
}

export interface ActionTypesProps{
    SET_QUESTIONS: string,
    SET_DOC_NAME: string,
    SET_DOC_DESC: string,
    SET_STYLE_DOC_NAME: string,
    SET_STYLE_DOC_DESC: string,
    SET_DOC_NAME_CLASSNAMES: string,
    SET_DOC_DESC_CLASSNAMES: string,
    SET_KOLONTITUL_IMAGE: string,
    SET_PREVIEW_IMAGE: string
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

export interface FormFillProps {
    formId: string,
    documentName: string,
    documentDesc: string,
    documentNameElementStyle: ElementStyleProps,
    documentDescElementStyle: ElementStyleProps,
    documentNameClassNames: string[],
    documentDescClassNames: string[],
    headerImage: string,
    questions: QuestionProps[]
}

export interface FormFilledProps{
    formId: string,
    filledQuestions: QuestionFilledProps[]
}

export interface QuestionFilledProps{
    questionId: string,
    sequence: number,
    answers: AnswerOptionProps[]
}

export interface AnswerOptionProps{
    optionId: string,
    answerText?: string
}