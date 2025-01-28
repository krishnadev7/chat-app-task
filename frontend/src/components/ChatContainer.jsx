import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/utils";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) return <div>Loading messages...</div>;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start ${
              message.senderId === authUser._id ? "justify-end" : ""
            }`}
          >
            {/* Profile Picture */}
            <div
              className={`w-10 h-10 rounded-full overflow-hidden border ${
                message.senderId === authUser._id ? "order-2 ml-2" : "mr-2"
              }`}
            >
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] sm:max-w-[60%] px-4 py-2 rounded-lg shadow-md text-sm ${
                message.senderId === authUser._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="rounded-md mb-2 max-w-full"
                />
              )}
              {message.text && <p>{message.text}</p>}
              <div className="text-xs text-gray-500 mt-1 text-right">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-100 border-t">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
