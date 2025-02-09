import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';


function Header() {

    const [menutoggle, setMenutoggle] = useState(false)

    const Toggle = () => {
        setMenutoggle(!menutoggle)
    }

    const closeMenu = () => {
        setMenutoggle(false)
    }

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
            padding: '5px 10px', // Adjusting padding
            boxSizing: 'border-box', // Ensuring padding and border are included in the height
            fontSize: '14px' // Optional: adjusting font size
        }} className='search-input' type='text' placeholder='Search a Book'/>
                <ul className={menutoggle ? "nav-options active" : "nav-options"}>
                    {/* <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/'>
                            <a href="#home">Home</a>
                        </Link>
                    </li> */}
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/register'>
                        <a href="#books">Register</a>
                        </Link>
                    </li>
                    <li className="option" onClick={() => { closeMenu() }}>
                        <Link to='/login'>
                        <a href='signin'>SignIn</a>
                        </Link>
                    </li>
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
