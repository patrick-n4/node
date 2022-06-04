import React from "react";
export default function App() {
  return (
    <div className="h-[100vh] w-full bg-red-3001 flex items-center justify-center">
      <div className="h-[50%] w-[40%] bg-cyan-50 shadow-2xl flex p-[1em] flex-col items-center justify-between">
        <h1 className="text-[1.5em] font-bold ">Messages </h1>
        <div className="h-[90%] w-full flex justify-between flex-row">
          <div className="flex  justify-evenly w-full h-[20%]">
            <input
              type="text"
              placeholder="Message...."
              className="w-[50%] text-[1.4em] h-[80%] rounded-md shadow-lg"
            />
            <button className="bg-green-400 text-[1.4em] h-[80%] flex items-center justify-center w-[30%] rounded-lg shadow-lg">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
