import React from 'react'

import About from '../components/About'
import WelcomeBox from '../components/WelcomeBox'
import Stats from '../components/Stats'
import PopularBooks from '../components/PopularBooks'
import RecentAddedBooks from '../components/RecentAddedBooks'
import Events from '../components/Events'

function Home() {
    return (
        <div id='home'>
            <WelcomeBox/>
            <About/>
            <Stats/>
            <RecentAddedBooks/>
            <PopularBooks/>
            <Events />
        </div>
    )
}

export default Home;