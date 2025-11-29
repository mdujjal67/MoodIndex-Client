import React from "react";
import faqData from "../../../public/Json files/faq.json";

const Faq = () => {
  return (
    <section className="w-full dark:bg-gray-100 dark:text-gray-800 py-10 mt-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-serif font-bold sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-4 mb-8 text-gray-600">
          Find answers to the most common questions about our e-mental-health platform,
          card sorting method, accessibility features, and user experience decisions.
        </p>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <details
              key={index}
              className="w-full border rounded-lg bg-white shadow-sm"
            >
              <summary className="px-4 py-4 cursor-pointer text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1BA9B5]">
                {item.question}
              </summary>
              <p className="px-4 pb-4 text-gray-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
