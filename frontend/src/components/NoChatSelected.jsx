import React from 'react'

import { MessageCircleHeart } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-gray-50">
          <div className="max-w-md text-center space-y-6 px-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center animate-bounce">
                <MessageCircleHeart className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Welcome to ChatApp!
            </h2>
            <p className="text-base md:text-lg text-gray-500">
              Select a conversation from the sidebar to start chatting.
            </p>
          </div>
        </div>
      );
};

export default NoChatSelected;
