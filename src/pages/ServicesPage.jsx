import React from 'react'
import ServicesHero from '../components/ServiceSections/ServiceHero'
import ServiceCategories from '../components/ServiceSections/ServiceCategories'
import FeaturedServices from '../components/ServiceSections/FeaturedServices'
import ServicesList from '../components/ServiceSections/ServicesList'
import WhyChooseUs from '../components/HomeSections/WhyChooseUs'
import HowItWorks from '../components/HomeSections/HowItWorks'
import TestimonialsSection from '../components/HomeSections/TestimonialsSection'
import AboutClosing from '../components/AboutUsSections/AboutClosing'
import ContactUs from '../components/AboutUsSections/ContactUs'

const ServicesPage = () => {
  return (
    <main className=''>
      <ServicesHero />
      <ServiceCategories />
      <FeaturedServices />
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsSection />
      <AboutClosing/>
      <ContactUs />
    </main>
  )
}

export default ServicesPage
