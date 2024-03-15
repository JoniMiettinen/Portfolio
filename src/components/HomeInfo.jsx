import React from 'react'
import { Link } from 'react-router-dom';
import { arrow} from '../assets/icons'

const InfoBox = ({ text, link, btnText}) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain'/>
        </Link>
    </div>
)
const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi, I am <span className='font-semibold'>Joni</span>👋
            <br/>
            A Full-Stack Developer from Finland.
        </h1>
    ),
    2: (
        <InfoBox 
            text="Worked for some time as an full stack developer and always eager to learn more"
            link="/about"
            btnText="Learn more"
        />
    ),
    3: (
        <InfoBox 
        text="Looking for a dev? Feel free to contact me!"
        link="/contact"
        btnText="Let's talk"
        />
        )
        // 3: (
        //     <InfoBox 
        //         text="Jotain jännää"
        //         link="/projects"
        //         btnText="Visit my portfolio"
        //     />
        // ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo