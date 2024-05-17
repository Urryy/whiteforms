import { createContext, useContext } from "react";

export interface TextContextProps{
    fontKolontitul: string,
    setFontKolontitul: (value: string) => void,
    sizeKolontitul: string,
    setSizeKolontitul: (value: string) => void,

    fontQuestionText: string,
    setFontQuestionText: (value: string) => void,
    sizeQuestionText: string,
    setSizeQuestionText: (value: string) => void,

    fontOptionText: string,
    setFontOptionText: (value: string) => void,
    sizeOptionText: string,
    setSizeOptionText: (value: string) => void,
}

export const TextContext = createContext<TextContextProps | undefined>(undefined);

export function useTextContext(){
    const textContext = useContext(TextContext);
    if(textContext === undefined){
        throw new Error("useTextContext must be used with a TextContext");
    }

    return textContext;
}