import React from 'react'
import './WelcomeBox.css'

function WelcomeBox() {
    return (
        <div style={{ marginTop: "50px" }} className='welcome-box'>
            <p className='welcome-title'>WELCOME TO GATOR READS</p>
            <p className='welcome-message'>Feed Your Brain<br/>
            <span className='welcome-submessage'>Grab A Book To Read</span></p>
        </div>
    )
}

export default WelcomeBox;
