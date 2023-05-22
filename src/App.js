import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Play from './pages/Play';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/play" component={ Play } />
    </Switch>
  );
}
