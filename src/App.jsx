import React from 'react';
import './assets/css/index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import useLoadUser from './hooks/useLoadUser';

function App() {
  useLoadUser();
  const user = useSelector((state) => state.user, shallowEqual);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
