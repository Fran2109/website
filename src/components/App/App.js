import './App.css';
import Header from '../Header/Header';
import LogIn from '../LogIn/LogIn';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from 'react-router-dom';

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
      <BrowserRouter>
        <Switch>
          <Route path="/Login" exact>
             <LogIn setToken={setToken} />
          </Route>
          <Route path="/IHBox" exact>
            <Header />
          </Route>
          <Route path="/">
            {(token)?
              <Redirect to="IHBox" />
            :
              <Redirect to="Login" />
            /* <>
              {sessionStorage.getItem("token")!=undefined?
              <Redirect to="IHBox" />
              :
              <Redirect to="Login" />
              }
            </> */
            }
            {/* {sessionStorage.getItem("token")!=undefined?
              <Redirect to="IHBox" />
              :
              <Redirect to="Login" />
            } */}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
