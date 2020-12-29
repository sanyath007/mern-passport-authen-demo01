import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Context from './pages/Context';
import './main.css';

function App() {
  return (
    <Router>
      <Context>
        <Navbar />

        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/admin' exact component={AdminPage} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </Switch>
      </Context>
    </Router>
  );
}

export default App;
