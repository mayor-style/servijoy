import React from 'react'
import FAQHero from '../components/FAQSections/FAQHero'
import FAQAccordion from '../components/FAQSections/FAQAccordion'
import FAQCTA from '../components/FAQSections/FAQCTA'
import AboutClosing from '../components/AboutUsSections/AboutClosing'
import ContactUs from '../components/AboutUsSections/ContactUs'

const FAQpage = () => {
  return (
    <main>
      <FAQHero />
      <FAQAccordion />
      <ContactUs />
    </main>
  )
}

export default FAQpage
