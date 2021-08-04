import './App.css';
import Header from '../Header/Header';
import WebsiteContext from './../../context/WebsiteContext';
import LogIn from './../LogIn/LogIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="principal">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LogIn />
          </Route>
          <Route path="/IHBox" exact>
            <Header />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
