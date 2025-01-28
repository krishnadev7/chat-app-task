import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users, Search, X, Menu, ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-100 ">
      <div className="flex h-full pt-16 m-5">
        <div className="w-full max-w-7xl mx-auto px-4 h-[calc(100vh-4rem)]">
          <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
            <div className="flex h-full relative">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden absolute top-1/2 -translate-y-1/2 left-0 z-50 
                  bg-white hover:bg-gray-100 p-2 rounded-r-lg shadow-lg 
                  transition-all duration-300 ease-in-out
                  border border-l-0 border-gray-200"
                style={{
                  transform: `translateX(${
                    isSidebarOpen ? "280px" : "0px"
                  }) translateY(-50%)`,
                }}
              >
                {isSidebarOpen ? (
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Sidebar */}
              <div
                className={`
                    absolute md:relative w-80 md:w-1/3 lg:w-1/4 h-full bg-white
                    transform transition-transform duration-300 ease-in-out z-40
                    ${
                      isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
                  `}
              >
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 bg-gray-50 h-full">
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
