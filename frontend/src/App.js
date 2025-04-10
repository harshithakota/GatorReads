import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import Header from './components/Header';
import StudentDashboard from './components/StudentDashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBooks from './pages/SearchBooks';
import AddBook from "./pages/AddBook";
import LoanHistory from "./pages/LoanHistory";
import AdminDashboard from './components/AdminDashboard';
import ViewBooks from './pages/ViewBooks';
import ManageLoans from './pages/ManageLoans';
import ManageEvents from './pages/ManageEvents';
import AddEvent from './pages/AddEvent';

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
  const [ufid, setufid] = useState("");
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} setufid={setufid}/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/student-dashboard" element={<StudentDashboard userName={userName}/>} />
          <Route path="/search-books" element={<SearchBooks ufid={ufid}/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          <Route path="/admin/add-book" element={<AddBook />} /> 
          <Route path="/admin/view-books" element={<ViewBooks />} /> 
          <Route path="/admin/manage-loans" element={<ManageLoans />} /> 
          <Route path="/admin/manage-events" element={<ManageEvents />} /> 
          <Route path="/loan-history" element={<LoanHistory  ufid={ufid}/>} /> 
          <Route path="/addevent" element={<AddEvent  ufid={ufid}/>} /> 
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;