import React from "react";
import { X, MoreVertical, Phone, Video } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-4 py-3 border-b bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with online indicator */}
          <div className="relative flex-shrink-0">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800">
              {selectedUser.fullName}
            </h3>
            <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
              {isOnline ? 'Active now' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Call buttons - these would need handlers added */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 hidden sm:block">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 hidden sm:block">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* More options button */}
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {/* Close chat button */}
          <button 
            onClick={() => setSelectedUser(null)}
            className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200 group"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
          </button>
        </div>
      </div>

      {/* Mobile action buttons */}
      <div className="sm:hidden mt-2 pt-2 border-t border-gray-100">
        <div className="flex justify-center gap-6">
          <button className="flex items-center gap-2 px-4 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Call</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <Video className="w-4 h-4" />
            <span className="text-sm">Video</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;