import { createContext, useContext } from 'react';

export interface FormContextProps{
    formId: string,
    setFormId: (value: string) => void
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

export function useFormContext(){
    const formContext = useContext(FormContext);
    if(formContext === undefined){
        throw new Error("useFormContext must be used with a FormContext");
    }

    return formContext;
}

