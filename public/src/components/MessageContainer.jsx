import React from "react";
import { Messages } from "../context/context";
import { useContext } from "react";
const MessageContainer = () => {
  const messages = useContext(Messages);
  return (
    <div className="h-[75%] overflow-y-auto scrollbar-hide p-2">
      {messages.messages.map((msg,index) => {
        return (
          <div key={index}
            className={
              msg.isSender ? `flex justify-end p-2` : `flex justify-start p-2`
            }
          >
            <div className="p-2 bg-green-500 text-black border border-black w-fit rounded-full">
              {msg.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageContainer;
