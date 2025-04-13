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

      <section className="w-screen h-screen flex flex-col items-center justify-start pt-30 bg-white text-center px-4">
        <h2 className="text-5xl font-semibold text-gray-800 mb-8">
          Be a Part of KAAMVALA Community
          </h2>
          <div className="flex flex-col md:flex-row gap-6 max-w-4xl">
            <div className="flex-1 bg-gray-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Receive Services
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  📝 Sign up in just a few clicks to create your account.
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  📍 Allow location access so we can find nearby helpers for you.
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  🔍 Get smart recommendations based on your area and needs.
                </p>
                <p className="text-gray-600 text-sm">
                  📞 Browse profiles and directly call the one that fits best!
                </p>
            </div>

            <div className="flex-1 bg-gray-100 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Provide Services
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                📝Create your account through the sign Up option and register yourself.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                🛠️ Add your personal details like name, phone number and services that you provide.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                📲Get all your service requests through a simple phone call.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                ✨There you go! Work your magic!
              </p>
            </div>
          </div>
      </section>

      <section className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">
          Why You Should Use KAAMVALA?
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
