import './App.css';
import IHBox from '../IHBox/IHBox.tsx';
import LogIn from '../LogIn/LogIn';
import PageNotFound from '../PageNotFound/PageNotFound.tsx';
import ConfigurationPage from '../ConfigurationPage/ConfigurationPage';
import Overview from './../Overview/Overview.tsx';
import {  Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import LoginContext from './../../context/LoginContext';
import { useState, useEffect } from 'react';

function setToken(userToken) {
  sessionStorage.setItem('token', userToken);
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = tokenString;
  return userToken?.token;
}

function App() {

  const[token, setToken] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(sessionStorage.getItem("token")!==undefined);
      console.log(token);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    < LoginContext.Provider value={{ token }}>
      <div className="principal">
        <HashRouter>
          <Switch>
            <Route path="/Login" exact>
              <LogIn setToken={setToken} />
            </Route>
            <Route path="/IHBox" exact>
              <IHBox />
            </Route>
            <Route path="/IHBox/oeeOverview" exact>
              <Overview />
            </Route>
            <Route path="/IHBox/configuration" exact>
              <ConfigurationPage />
            </Route>
            <Route path="/" exact>
              {
              sessionStorage.getItem("token")!==undefined?
              <>
                <Redirect to="IHBox" />
              </>
              :
              <>
                <Redirect to="Login" />
              </>
              }
            </Route>
            <Route >
                <PageNotFound />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
