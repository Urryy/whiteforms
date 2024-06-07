import React, { useState } from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Template } from './components/template/template';
import { MainBody } from './components/mainbody/mainbody';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FormHeader } from './components/formheader/formheader';
import { CenteredTabs } from './components/tabs/tabs';
import { AnswerForm } from './components/answerform/answerform';
import { QuestionProps } from './interfaces/interfaces';
import { TextContext } from './contexts/TextContext';


function App() {
  const [isOpenToolbar, setIsOpenToolbar] = useState(false);
  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
        questionText: "Вопрос без заголовка",
        questionType: "radio",
        options: [
            {optionText: "Вариант 1", elementStyle: {fontSize: '11', fontFamily: 'Roboto, Arial, sans-serif'}}
        ],
        points: 0,
        answerKey: '',
        answer: false,
        open: true,
        required: false,
        startScaleValue: 1,
        descStartScaleValue: null,
        endScaleValue: 5,
        classNames: [],
        descEndScaleValue: null,
        elementStyle: {fontSize: '12', fontFamily: 'Roboto, Arial, sans-serif'}
    }
  ]);

  const [fontKolontitul, setFontKolontitul] = useState('Roboto, Arial, sans-serif');
  const [sizeKolontitul, setSizeKolontitul] = useState('24');

  const [fontQuestionText, setFontQuestionText] = useState('Roboto, Arial, sans-serif');
  const [sizeQuestionText, setSizeQuestionText] = useState('12');

  const [fontOptionText, setFontOptionText] = useState('Roboto, Arial, sans-serif');
  const [sizeOptionText, setSizeOptionText] = useState('11');

  return (
    <div className="App">
      <TextContext.Provider value={{fontKolontitul, setFontKolontitul, sizeKolontitul, setSizeKolontitul,
                fontQuestionText, setFontQuestionText, sizeQuestionText, setSizeQuestionText, 
                fontOptionText, setFontOptionText, sizeOptionText, setSizeOptionText}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={(<>
              <Header />
              <Template />
              <MainBody />
            </>)}/>
            <Route path='/response' element={(<>
              <AnswerForm />
            </>)}/>
            <Route path='form/:id' element={(<>
              <FormHeader questions={questions} setQuestions={setQuestions} isOpenToolbar={isOpenToolbar} setIsOpenToolbar={setIsOpenToolbar}/>
              <CenteredTabs questions={questions} setQuestions={setQuestions} isOpenToolbar={isOpenToolbar} setIsOpenToolbar={setIsOpenToolbar}/>
            </>)}/>
          </Routes>
        </BrowserRouter>
      </TextContext.Provider>
    </div>
  );
}

export default App;
