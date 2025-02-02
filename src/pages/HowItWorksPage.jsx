import React from 'react'
import HowItWorksHero from '../components/HowItWorksSection/HowItWorkHero'
import HowItWorksSteps from '../components/HowItWorksSection/HowItWorkSteps'
import TestimonialsSection from '../components/HomeSections/TestimonialsSection'
import FAQ from '../components/FAQ'
import ContactUs from '../components/AboutUsSections/ContactUs'

const HowItWorksPage = () => {
  return (
    <main className=''>
      <HowItWorksHero />
    <HowItWorksSteps />
    <FAQ />
    <TestimonialsSection />
    <ContactUs />
    </main>
  )
}

export default HowItWorksPage
