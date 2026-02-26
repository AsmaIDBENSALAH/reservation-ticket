import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const faqs = [
    {
      question:
        "What types of football tickets are available with FootballTix?",
      answer:
        "FootballTix offers tickets for all major football leagues including Premier League, Champions League, La Liga, Serie A, Bundesliga, and Ligue 1. We provide various ticket categories from standard seats to VIP packages and hospitality experiences.",
    },
    {
      question: "Are football tickets purchased through FootballTix official?",
      answer:
        "Yes, all tickets sold on FootballTix are 100% authentic and guaranteed. We work directly with official sources and authorized resellers to ensure you receive genuine tickets for your chosen matches.",
    },
    {
      question: "After purchasing, how do I receive my football tickets?",
      answer:
        "After completing your purchase, you will receive your tickets via email as e-tickets or mobile tickets. For some matches, physical tickets may be sent by secure courier. Delivery method depends on the venue and match requirements.",
    },
    {
      question: "Can I get football cup tickets through FootballTix?",
      answer:
        "Absolutely! We offer tickets for major cup competitions including FA Cup, Copa del Rey, Coppa Italia, DFB-Pokal, and domestic cup matches across all major European leagues.",
    },
    {
      question: "How easy can I purchase a ticket for football matches?",
      answer:
        "Purchasing tickets is simple: browse available matches, select your preferred seats, complete the secure checkout process, and receive instant confirmation. Our platform is designed for a seamless booking experience in just a few clicks.",
    },
    {
      question:
        "Can I cancel my tickets for football matches after purchasing?",
      answer:
        "Cancellation policies vary depending on the match and ticket type. Generally, tickets can be cancelled up to 48-72 hours before the event for a refund. Please review the specific cancellation terms during checkout.",
    },
  ];

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
