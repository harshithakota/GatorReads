import React from 'react'

import About from '../components/About'
import WelcomeBox from '../components/WelcomeBox'

function Home() {
    return (
        <div id='home'>
            <WelcomeBox/>
            <About/>
        </div>
    )
}

export default Home;