import React from "react";
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Tailwind CSS Test</h1>
      <form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name Input (Testing Styles)
          </label>
          <input 
            type="text" 
            id="name"
            className="w-full p-3 border-2 border-red-500 rounded-2xl text-lg focus:outline-none focus:border-blue-500 transition-colors" 
            placeholder="Enter your name" 
          />
          <p className="mt-2 text-sm text-gray-600">If you see red border, rounded corners, and padding, styles are working!</p>
        </div>
        <button 
          type="submit"
          className="w-full py-3 rounded-lg border-2 border-red-400 text-lg font-semibold text-red-400 hover:bg-red-400 hover:text-white transition-colors"
        >
          Submit
        </button>
      </form>
      
      {/* Debug section to test if Tailwind is working */}
      <div className="mt-8 p-4 bg-blue-100 border-2 border-blue-500 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">Debug Section</h2>
        <p className="text-blue-600">If this text is blue and has a blue border, Tailwind is working correctly.</p>
      </div>

      {/* Additional test classes to ensure they get generated */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-red-500 p-4 text-white rounded-lg">Red Box</div>
        <div className="bg-green-500 p-4 text-white rounded-lg">Green Box</div>
        <div className="bg-blue-500 p-4 text-white rounded-lg">Blue Box</div>
      </div>

      {/* Test @reference directive */}
      <div className="mt-8 p-4 @reference bg-yellow-500 text-black rounded-lg">
        Test with @reference directive
      </div>
    </div>
  )
}
