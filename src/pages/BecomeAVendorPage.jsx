import React from 'react'
import BecomeVendorHero from '../components/BecomeAVendorSections/BecomeVendorHero'
import HowItWorksVendor from '../components/BecomeAVendorSections/HowItWorks'
import WhyBecomeVendor from '../components/BecomeAVendorSections/WhyBecomeVendor'
import BecomeVendorFAQ from '../components/BecomeAVendorSections/BecomeVendorFAQ'
import BecomeVendorCTA from '../components/BecomeAVendorSections/BecomeVendorCTA'

const BecomeAVendorPage = () => {
  return (
    <main>
      <BecomeVendorHero />
      <WhyBecomeVendor />
      <HowItWorksVendor />
      <BecomeVendorFAQ />
      <BecomeVendorCTA />
    </main>
  )
}

export default BecomeAVendorPage
