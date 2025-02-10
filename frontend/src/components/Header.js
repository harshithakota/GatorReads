import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

import { useNavigate } from 'react-router-dom';


function Header(props) {

    const [menutoggle, setMenuToggle] = useState(false);
    const navigate = useNavigate();

    const Toggle = () => {
        setMenuToggle(!menutoggle)
    }

    const closeMenu = () => {
        setMenuToggle(false)
    }

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.isLoggedIn) {
            props.setIsLoggedIn(true);
            setFullName(user.fullName);
        }
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('user');
        props.setIsLoggedIn(false);
        setFullName('');
        navigate('/');
    };


    return (
        <div className="header">
            <div className="logo-nav">
            <Link to='/'>
                <a href="#home">GATOR READS</a>
            </Link>
            </div>
            <div className='nav-right'>
                <input style={{ 
            height: '50px', // Reducing the height
            width: '250px',
            padding: '5px 10px', // Adjusting padding
            boxSizing: 'border-box', // Ensuring padding and border are included in the height
            fontSize: '14px' // Optional: adjusting font size
        }} className='search-input' type='text' placeholder='Search a Book'/>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    {/* <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/register'>
                        <a href="#books">Register</a>
                        </Link>
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/login'>
                        <a href='signin'>SignIn</a>
                        </Link>
                    </li> */}
                    {props.isLoggedIn ? (
                        <>
                            <li className="option" onClick={() => navigate('/student-dashboard')}>
                                <a href="#logout">Dashboard</a>
                            </li>
                            <li className="option" onClick={handleLogout}>
                                <a href="#logout">Logout</a>
                            </li>
                            {/* <li className="option">
                                <span>{props.userName}</span>
                            </li> */}
                        </>
                    ) : (
                        <>
                            <li className="option" onClick={() => setMenuToggle(false)}>
                                <Link to='/register'>
                                    Register
                                </Link>
                            </li>
                            <li className="option" onClick={() => setMenuToggle(false)}>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <div className="mobile-menu" onClick={() => { Toggle() }}>
                {menutoggle ? (
                    <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
                ) : (
                    <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
                )}
            </div>
        </div>
    )
}

export default Header;
