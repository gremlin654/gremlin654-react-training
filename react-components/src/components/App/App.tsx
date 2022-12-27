import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router';
import { Main } from 'pages/Main/Main';
import { Header } from 'components/Header/Header';
import { AboutUs } from 'pages/AboutUs/AboutUs';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { PATH } from 'utils/constants';
import { BrowserRouter } from 'react-router-dom';
import { Form } from 'pages/Form/Form';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path={PATH.MAIN} element={<Main />} />
            <Route path={PATH.ABOUT_US} element={<AboutUs />} />
            <Route path={PATH.FORM} element={<Form />} />
            <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
