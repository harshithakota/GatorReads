import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Header from './components/Header';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard userName={userName}/>} />

        {/* <Route path="/" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;