import React from 'react';
import { Route, Routes } from 'react-router';
import { Main } from 'pages/Main/Main';
import { Header } from 'components/Header/Header';
import { AboutUs } from 'pages/AboutUs/AboutUs';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { PATH } from 'utils/constants';
import { Form } from 'pages/Form/Form';
import { CharacterPage } from 'pages/CharacterPage/CharacterPage';
import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path={PATH.CHARACTER_PAGE} element={<CharacterPage />} />
        <Route path={PATH.MAIN} element={<Main />} />
        <Route path={PATH.ABOUT_US} element={<AboutUs />} />
        <Route path={PATH.FORM} element={<Form />} />
        <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
