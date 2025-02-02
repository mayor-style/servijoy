import React, { useState } from 'react'
import FAQHero from '../components/FAQSections/FAQHero'
import FAQAccordion from '../components/FAQSections/FAQAccordion'
import FAQCTA from '../components/FAQSections/FAQCTA'
import AboutClosing from '../components/AboutUsSections/AboutClosing'
import ContactUs from '../components/AboutUsSections/ContactUs'
import { faqCategories } from '../components/FAQSections/faqData'
import FAQSearch from '../components/FAQSections/FAQSearch'

const FAQpage = () => {
  const [filteredFAQs, setFilteredFAQs] = useState([]);
  return (
    <main className='min-h-screen py-10 gradient'>
      <FAQHero />

      <FAQSearch setFilteredFAQs={setFilteredFAQs} />
      <div className="mt-8">
          {filteredFAQs.length > 0
            ? filteredFAQs.map((faq, index) => <FAQAccordion key={index} category={{ title: "", items: [faq] }} />)
            : faqCategories.map((category, index) => <FAQAccordion key={index} category={category} />)}
        </div>
    </main>
  )
}

export default FAQpage
