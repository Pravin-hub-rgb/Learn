"use client";

import { useState } from "react";

export default function React_Events() {
  const [search, setSearch] = useState("");
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("Button clicked!");
    console.log(event.currentTarget);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    console.log("Input Value: ", event.target.value);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Form submitted')
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    console.log(email, password)
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-500">
        React Events
      </h1>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 block w-full pointer-cursor m-2" onClick={handleClick}>Click Me</button>
        <input
          className="border border-gray-300 rounded-md p-2 m-2"
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={search}
        />
      </div>
      <div>
        <form className="" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
