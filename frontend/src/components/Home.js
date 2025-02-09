import React from 'react'

import About from '../components/About'
import WelcomeBox from '../components/WelcomeBox'
import Stats from '../components/Stats'

function Home() {
    return (
        <div id='home'>
            <WelcomeBox/>
            <About/>
            <Stats/>
        </div>
    )
}

export default Home;