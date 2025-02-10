import React from 'react'
import './WelcomeBox.css'

function WelcomeBox() {
    return (
        <div style={{ marginTop: "50px" }} className='welcome-box'>
            <p className='welcome-title'>WELCOME TO GATOR READS</p>
            <p className='welcome-message'>Where Gator Brilliance Begins<br/>
            <span className='welcome-submessage'>Begin Your Journey with Books</span></p>
        </div>
    )
}

export default WelcomeBox;
