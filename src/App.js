import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Login from "./Login";
import TodoList from './TodoList';
import './todo.css'

function App() {
  
  return (<Router>
    <div className="App">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          </div>
        </div>

      <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <TodoList />
          </Switch>
      </div>
    </div></Router>
  );
}

export default App;