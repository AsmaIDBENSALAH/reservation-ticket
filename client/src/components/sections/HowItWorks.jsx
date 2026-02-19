import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const HowItWorks = () => {
  const steps = [
    {
      number: "1.",
      title: "Choose your match",
      description: "Attend your favorite football match",
    },
    {
      number: "2.",
      title: "Choose your package",
      description: "Enjoy an incomparable experience with our packages",
    },
    {
      number: "3.",
      title: "Choose your hotel",
      description: "Choose your luxury hotel (optional)",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
            {/* Title on the left */}
            <div className="lg:flex-shrink-0 lg:w-64">
              <h2 className="text-2xl font-bold text-gray-900">
                How does it work?
              </h2>
            </div>

            {/* Steps in a horizontal row */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {step.number} {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-snug">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex self-stretch items-center justify-center">
                      {/* <ArrowRightIcon className="w-10 h-10 text-gray-300" /> */}
                      <ChevronRightIcon className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
