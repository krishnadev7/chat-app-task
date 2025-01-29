import React, { useEffect, useState } from 'react';
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Search, Users } from "lucide-react";

const Sidebar = ({ onClose }) => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const [searchQuery, setSearchQuery] = useState('');
    const {onlineUsers} = useAuthStore();
  
    useEffect(() => {
      getUsers();
    }, [getUsers]);
  
    const filteredUsers = users.filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (isUsersLoading) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }
  
    return (
      <aside className="h-full flex flex-col border-r border-gray-200">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="font-semibold text-lg">Contacts</h2>
          </div>
  
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
  
        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  onClose?.();
                }}
                className={`
                  w-full p-3 flex items-center gap-3 rounded-lg
                  transition-colors duration-200
                  ${selectedUser?._id === user._id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-100'
                  }
                `}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>
                
                <div className=" min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            ))}
  
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchQuery 
                  ? "No contacts found" 
                  : "No contacts available"
                }
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  };

export default Sidebar;
