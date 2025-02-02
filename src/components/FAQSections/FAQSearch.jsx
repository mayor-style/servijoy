import { useState } from "react";
import { faqCategories } from "./faqData";

const FAQSearch = ({ setFilteredFAQs }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);

    const filtered = faqCategories.flatMap(category =>
      category.items.filter(faq =>
        faq.question.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setFilteredFAQs(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search FAQs..."
      className="w-full p-3 mt-4 border rounded-md focus:ring-2 focus:ring-blue-500"
      value={query}
      onChange={handleSearch}
    />
  );
};

export default FAQSearch;
