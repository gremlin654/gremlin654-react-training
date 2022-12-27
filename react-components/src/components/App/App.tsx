import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router';
import { Main } from 'pages/Main/Main';
import { Header } from 'components/Header/Header';
import { AboutUs } from 'pages/AboutUs/AboutUs';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';
import { PATH } from 'utils/constants';
import { notebooks } from '../../data/notebooks';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path={PATH.MAIN} element={<Main notebooks={notebooks} />} />
            <Route path={PATH.ABOUT_US} element={<AboutUs />} />
            <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
