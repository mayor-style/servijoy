import React from 'react'
import HowItWorksHero from '../components/HowItWorksSection/HowItWorkHero'
import HowItWorksSteps from '../components/HowItWorksSection/HowItWorkSteps'
import TestimonialsSection from '../components/HomeSections/TestimonialsSection'
import FAQ from '../components/FAQ'

const HowItWorksPage = () => {
  return (
    <main className=''>
      <HowItWorksHero />
    <HowItWorksSteps />
    <TestimonialsSection />
    <FAQ />
    </main>
  )
}

export default HowItWorksPage
