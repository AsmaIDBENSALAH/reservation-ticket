import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const faqs = t("faq.items", { returnObjects: true }) || [];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10">
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12 uppercase tracking-wide">
            {t("faq.title")}
          </h2>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="border-t border-gray-300">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-4"
                >
                  <span className="font-bold text-gray-900 text-sm uppercase pr-8">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <MinusIcon className="flex-shrink-0 w-5 h-5 text-gray-900" />
                  ) : (
                    <PlusIcon className="flex-shrink-0 w-5 h-5 text-gray-900" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-4 pb-6 text-gray-700 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
            <div className="border-b border-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
