import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About Gator Reads</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixid=MnwxMjA3fDB8MHxwaGooto-pagefHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=913&q=80" alt="Gator Library" />
                </div>
                <div>
                    <p className="about-text">
                        The Gator Library Management System (GLMS) provides a comprehensive solution 
                        for the administration of libraries across the Gator network. Established in 
                        2021, GLMS aims to modernize library interactions and access for students and 
                        faculty alike, making it simpler and faster to locate and check out materials.<br/>
                        <br/>
                        Our system features state-of-the-art technology that supports both physical 
                        and digital borrowing, real-time tracking of available resources, and an 
                        intuitive recommendation system tailored to user preferences and academic needs. 
                        GLMS integrates seamlessly with academic databases to provide a robust research 
                        toolset for serious scholarship.<br/>
                        <br/>
                        The Gator Library Management System is built on a foundation of accessibility 
                        and user-friendliness, ensuring that all members of the community, regardless 
                        of their technical proficiency, can benefit from our services. With GLMS, 
                        users can easily manage their accounts, extend their loans, and reserve 
                        books and materials with just a few clicks.<br/>
                        <br/>
                        We are committed to continuous improvement and eagerly welcome suggestions 
                        from our users. Your feedback drives our evolution, helping us to better meet 
                        your educational needs and enhance your library experience.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;
