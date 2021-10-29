import './App.css';
import IHBox from '../IHBox/IHBox.js';
import Login from '../Login/Login.js';
import PageNotFound from '../PageNotFound/PageNotFound';
import {  Route, Switch, Redirect, HashRouter } from 'react-router-dom';

function setToken(userToken : string) {
  sessionStorage.setItem('token', userToken);
}

/* function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = tokenString;
  return userToken?.token;
} */

function App() {

  /* const token = getToken(); */

  return (
    <div className="principal">
      <HashRouter>
        <Switch>
          <Route path="/Login">
             <Login setToken={setToken} />
          </Route>
          <Route path="/IHBox">
            <IHBox />
          </Route>
          <Route path="/" exact>
            { sessionStorage.getItem("token")!==undefined? <Redirect to="IHBox" /> : <Redirect to="Login" /> }
          </Route>          
          <Route >
              <PageNotFound />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
