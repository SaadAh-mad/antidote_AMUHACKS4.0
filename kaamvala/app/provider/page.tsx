import React from "react";

function provider() {
  return (
    <>
      <div className="text-center p-4">
        <h2 className="text-4xl font-bold text-gray-800">
          Apply as a Service Provider
        </h2>
        <p className="text-gray-500">
          Join our platform and connect with customers in your area
        </p>
      </div>
      <div className="max-w-2xl mx-auto p-12 bg-white rounded-2xl shadow-lg space-y-10">
        <div>
          <h3 className="text-xl font-semibold text-gray-700">
            Personal Information
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Please provide your basic contact information
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  First Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Last Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Service Category
              </label>
              <select className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select a category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="gardening">Gardening</option>
                <option value="carpentary">Carpentary</option>
                <option value="moving">Moving</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className=" block text-sm font-medium text-gray-800 p-2">
                {" "}
                verification
              </label>
            </div>
            <div>
              <label className="block text-md font-medium text-gray-800 mb-1 p-1">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-lg file:border-0
                             file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                           cursor-pointer"  />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition" >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default provider;