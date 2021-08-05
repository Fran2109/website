import './App.css';
import Header from '../Header/Header';
import LogIn from '../LogIn/LogIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {

  const token = getToken();

  /* if(!token) {
    return <LogIn setToken={setToken} />
  } */
  return (
    <div className="principal">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {!token? <LogIn setToken={setToken} /> : <Header />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
