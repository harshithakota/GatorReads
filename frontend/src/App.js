import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Header from './components/Header';
import StudentDashboard from './components/StudentDashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0021A5', // UF Blue
      light: '#6C9AC3',
      dark: '#001433',
    },
    secondary: {
      main: '#FA4616', // UF Orange
      light: '#FF8E6C',
      dark: '#C83812',
    },
    background: {
      default: '#E5F0FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#001433',
      secondary: '#0021A5',
    },
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover fieldset': {
              borderColor: '#FA4616',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },

});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;