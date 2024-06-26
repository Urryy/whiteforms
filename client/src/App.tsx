import React, { useEffect, useState } from 'react';
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
import { HeaderSection } from './components/headersection/headersection';
import { Footer } from './components/footer/footer';
import { FormContext } from './contexts/FormContxet';
import { SnackbarProvider } from 'notistack';
import { Form } from './components/answerform/form';
import { useKeycloak } from '@react-keycloak/web';

function App() {
  const { keycloak, initialized } = useKeycloak();
  
  localStorage.setItem('TOKEN', keycloak?.token ?? '');

  const [isOpenToolbar, setIsOpenToolbar] = useState(false);
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [formId, setFormId] = useState('');

  const [fontKolontitul, setFontKolontitul] = useState('Roboto, Arial, sans-serif');
  const [sizeKolontitul, setSizeKolontitul] = useState('24');

  const [fontQuestionText, setFontQuestionText] = useState('Roboto, Arial, sans-serif');
  const [sizeQuestionText, setSizeQuestionText] = useState('12');

  const [fontOptionText, setFontOptionText] = useState('Roboto, Arial, sans-serif');
  const [sizeOptionText, setSizeOptionText] = useState('11');

  return (
    <div className="App">
      {!initialized 
      ? (<div></div>)
      : (keycloak.authenticated 
          ? (<SnackbarProvider>
            <FormContext.Provider value={{formId: formId, setFormId: setFormId}}>
              <TextContext.Provider value={{fontKolontitul, setFontKolontitul, sizeKolontitul, setSizeKolontitul,
                                            fontQuestionText, setFontQuestionText, sizeQuestionText, setSizeQuestionText, 
                                            fontOptionText, setFontOptionText, sizeOptionText, setSizeOptionText}}>
                <BrowserRouter>
                  <Routes>
                    <Route path='/' element={(<div className='section_start'>
                      <HeaderSection />
                      <MainBody />
                      <Footer />
                    </div>)}/>
                    <Route path='/response' element={(<>
                      <AnswerForm />
                    </>)}/>
                    <Route path='/filling/form/:id' element={(<>
                      <Form />
                    </>)}/>
                    <Route path='form/:id' element={(<div className='section_form'>
                      <FormHeader questions={questions} setQuestions={setQuestions} isOpenToolbar={isOpenToolbar} setIsOpenToolbar={setIsOpenToolbar}/>
                      <CenteredTabs questions={questions} setQuestions={setQuestions} isOpenToolbar={isOpenToolbar} setIsOpenToolbar={setIsOpenToolbar}/>
                    </div>)}/>
                    <Route path='form' element={(<div className='section_form'>
                      <FormHeader questions={questions} setQuestions={setQuestions} isOpenToolbar={isOpenToolbar} setIsOpenToolbar={setIsOpenToolbar}/>
                      <CenteredTabs questions={questions} setQuestions={setQuestions} isOpenToolbar={isOpenToolbar} setIsOpenToolbar={setIsOpenToolbar}/>
                    </div>)}/>
                  </Routes>
                </BrowserRouter>
              </TextContext.Provider>
            </FormContext.Provider>
          </SnackbarProvider>)
            : (keycloak.login()))}
    </div>
  );
}

export default App;
