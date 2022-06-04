import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:7000");
export default function App() {
  const [room, setRoom] = useState("");
  const [mess, setMess] = useState("");
  const [rec, setRec] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message: mess, room: room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room: room });
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setRec(data.message);
    });
  }, [socket]);

  return (
    <div className="h-[100vh] w-full bg-slate-200 flex items-center justify-center">
      <div className="h-[50%] w-[40%] shadow-2xl flex p-[1em] flex-col items-center gap-2">
        <h1 className="text-[1.5em] font-bold ">Messages </h1>
        <div className="h-[20%] w-full flex justify-between flex-row">
          <div className="grid grid-cols-2 justify-evenly w-full h-[100%] gap-5 gap-x-[5em]">
            <input
              type="number"
              placeholder="Choose room number"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button
              className="bg-green-400 text-[1.4em] h-[80%] flex items-center justify-center w-[50%] rounded-lg shadow-lg px-[2em] "
              onClick={joinRoom}
            >
              Join Room
            </button>
            <input
              type="text"
              placeholder="Message...."
              className="text-[1.4em] h-[80%] rounded-md shadow-lg pl-2"
              onChange={(e) => {
                setMess(e.target.value);
              }}
            />
            <button
              className="bg-green-400 text-[1.4em] h-[80%] flex items-center justify-center w-[30%] rounded-lg shadow-lg"
              onClick={sendMessage}
            >
              Send Message
            </button>
          </div>
        </div>
        {rec !== undefined && <div>{rec}</div>}
      </div>
    </div>
  );
}
