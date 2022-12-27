import React, { useReducer } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router';
import { Main } from 'pages/Main/Main';
import { Header } from 'components/Header/Header';
import { AboutUs } from 'pages/AboutUs/AboutUs';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { PATH } from 'utils/constants';
import { Form } from 'pages/Form/Form';
import { GlobalData, initialForm, initialSearch } from 'context/context';
import { CharacterPage } from 'pages/CharacterPage/CharacterPage';
import { ActionForm, ActionSearch, StateForm, StateSearch } from 'types/types';
import { reduserSearch } from 'redusers/reduserForm';
import { reduserForm } from 'redusers/reduserSearch';

const App = () => {
  const [stateSearch, dispatchSearch] = useReducer<React.Reducer<StateSearch, ActionSearch>>(
    reduserSearch,
    initialSearch
  );

  const [stateForm, dispatchForm] = useReducer<React.Reducer<StateForm, ActionForm>>(
    reduserForm,
    initialForm
  );

  return (
    <div className="app">
      <Header />
      <GlobalData.Provider value={{ stateSearch, dispatchSearch, stateForm, dispatchForm }}>
        <Routes>
          <Route path={PATH.CHARACTER_PAGE} element={<CharacterPage />} />
          <Route path={PATH.MAIN} element={<Main />} />
          <Route path={PATH.ABOUT_US} element={<AboutUs />} />
          <Route path={PATH.FORM} element={<Form />} />
          <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </GlobalData.Provider>
    </div>
  );
};

export default App;
