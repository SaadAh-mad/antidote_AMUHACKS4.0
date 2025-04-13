import React from "react";

const LandingPage = () => {
  return (
    <div className="w-full">
      <section className="w-screen h-screen flex flex-col items-center justify-start pt-45 bg-gray-100 text-center p-4">
        <h1 className="text-8xl font-bold text-gray-800">KAAMVALA</h1>
        <p className="text-sm text-gray-600 mt-4 max-w-md">
          A community-driven platform that connects you with trusted local workers — from house help to plumbers, electricians, and more.
        </p>
      </section>

      <section className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">
          How We Work?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <img
              src="/assets/ppl.png"
              alt="Find Service Providers"
              className="mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Find Service Providers</h3>
            <p className="text-sm text-gray-600">
              Search for verified service providers in your area based on your requirements
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <img
              src="/assets/star.png"
              alt="Check Reviews"
              className="mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Check Reviews</h3>
            <p className="text-sm text-gray-600">
              Read reviews and recommendations from other users before making your choice.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
            <img
              src="/assets/tick.png"
              alt="Book Services"
              className="mb-4"
            />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Book Services</h3>
            <p className="text-sm text-gray-600">
              Contact and book the service provider directly through our platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
