import React from 'react'
import Hero from '../components/HomeSections/Hero'
import HowItWorks from '../components/HomeSections/HowItWorks'
import FeaturedServices from '../components/HomeSections/FeaturedServices'
import TestimonialsSection from '../components/HomeSections/TestimonialsSection'
import CTA_bannerSection from '../components/HomeSections/CTA_bannerSection'
import FAQ from '../components/FAQ'

const HomePage = () => {
  return (
    <div className='z-0 '>
      <Hero />
      <HowItWorks />
      <FeaturedServices />
      <TestimonialsSection />
      <FAQ />
      <CTA_bannerSection />
    </div>
  )
}

export default HomePage
