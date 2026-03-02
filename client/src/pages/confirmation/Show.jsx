import React from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const Show = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Reservation confirmed
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Your payment was successful and your reservation has been created.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <p className="text-sm text-emerald-900">
                You can view your reservation anytime from <span className="font-semibold">Track your Tickets</span>.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/tickets"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Go to Tickets
              </Link>
              <Link
                to="/matches"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Browse Matches
              </Link>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Show;
