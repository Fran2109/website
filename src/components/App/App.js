import './App.css';
import IHBox from '../IHBox/IHBox.tsx';
import LogIn from '../LogIn/LogIn';
import PageNotFound from '../PageNotFound/PageNotFound.tsx';
import ConfigurationPage from '../ConfigurationPage/ConfigurationPage';
import {  Route, Switch, Redirect, HashRouter } from 'react-router-dom';

function setToken(userToken) {
  sessionStorage.setItem('token', userToken);
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = tokenString;
  return userToken?.token;
}

function App() {

  const token = getToken();

  return (
    <div className="principal">
      <HashRouter>
        <Switch>
          <Route path="/Login" exact>
             <LogIn setToken={setToken} />
          </Route>
          <Route path="/IHBox" exact>
            <IHBox />
          </Route>
          <Route path="/IHBox/configuration" exact>
            <ConfigurationPage />
          </Route>
          <Route path="/" exact>
            {
            sessionStorage.getItem("token")!==undefined?
            <>
              <Redirect to="IHBox" />
              {console.log("true")}
            </>
            :
            <>
              <Redirect to="Login" />
              {console.log("false")}
            </>
            }
          </Route>
          <Route>
              <PageNotFound />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
