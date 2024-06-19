import React from 'react'

function Trending() {
  return (
    <div className="p-6 bg-white shadow">
    <form className="bg-white p-4 shadow-md rounded">
      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          id="name"
          name="name"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-2"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          id="message"
          name="message"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Send
      </button>
    </form>
  </div>
  )
}

export default Trending