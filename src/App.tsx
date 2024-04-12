import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Template } from './components/template/template';
import { MainBody } from './components/mainbody/mainbody';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FormHeader } from './components/formheader/formheader';
import { CenteredTabs } from './components/tabs/tabs';
import { QuestionForm } from './components/questionform/questionform';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={(<>
            <Header />
            <Template />
            <MainBody />
          </>)}/>
          <Route path='form/:id' element={(<>
            <FormHeader/>
            <CenteredTabs />
            <QuestionForm />
          </>)}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
