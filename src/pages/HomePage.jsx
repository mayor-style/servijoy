import React from 'react'
import Hero from '../components/HomeSections/Hero'
import HowItWorks from '../components/HomeSections/HowItWorks'
import FeaturedServices from '../components/HomeSections/FeaturedServices'
import TestimonialsSection from '../components/HomeSections/TestimonialsSection'
import CTA_bannerSection from '../components/HomeSections/CTA_bannerSection'
import FAQ from '../components/FAQ'
import WhyChooseUs from '../components/HomeSections/WhyChooseUs'
import BecomeAVendor from '../components/HomeSections/BecomeAVendor'
import AboutClosing from '../components/AboutUsSections/AboutClosing'

const HomePage = () => {
  return (
    <main className='z-0 '>
      <Hero />
      <HowItWorks />
      <FeaturedServices />
      <WhyChooseUs />
      <TestimonialsSection />
      <BecomeAVendor />
      <FAQ />
      <AboutClosing />
    </main>
  )
}

export default HomePage
