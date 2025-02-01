import React from 'react'
import AboutHero from '../components/AboutUsSections/AboutHero'
import AboutMission from '../components/AboutUsSections/AboutMission'
import AboutStory from '../components/AboutUsSections/AboutStory'
import OurValues from '../components/AboutUsSections/OurValues'
import OurTeam from '../components/AboutUsSections/OurTeam'
import AboutClosing from '../components/AboutUsSections/AboutClosing'

const AboutPage = () => {
  return (
    <main className=''>
    <AboutHero />
    <AboutMission />
    <AboutStory />
    <OurValues />
    <OurTeam /> {/* This could be optional but well it serve as a placeholder for now! */}
    <AboutClosing />
    </main>
  )
}

export default AboutPage
