import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      toast.success("Image added!");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Message sent!");
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="sticky bottom-0 w-full bg-white border-t">
      <div className="max-w-screen-xl mx-auto">
        {/* Image Preview Section */}
        {imagePreview && (
          <div className="p-2 border-b">
            <div className="flex items-start gap-2 overflow-x-auto scrollbar-hide">
              <div className="relative flex-shrink-0 group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shadow-sm 
                    border border-gray-200 transition-transform duration-200 
                    group-hover:scale-105"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-white shadow-md
                    hover:bg-red-50 transition-colors duration-200 group-hover:bg-red-50"
                  type="button"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="p-2 sm:p-3">
          <div className="flex items-end gap-2">
            <div className={`flex-1 bg-gray-50 rounded-2xl transition-shadow duration-200
              ${isFocused ? 'ring-2 ring-blue-100' : 'hover:ring-1 hover:ring-gray-200'}`}>
              
              <div className="flex items-end min-h-[40px] sm:min-h-[48px]">
                {/* Text Input */}
                <input
                  type="text"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent border-none 
                    focus:outline-none placeholder-gray-400 text-gray-800 text-sm sm:text-base"
                  placeholder="Type a message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                
                {/* Action Buttons */}
                <div className="flex items-center px-1 sm:px-2 py-1 sm:py-2 gap-0.5 sm:gap-1">
                  {/* File Upload Button */}
                  <button
                    type="button"
                    className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition-colors 
                      duration-200 text-gray-500 hover:text-gray-700"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                  {/* Emoji Button */}
                  <button
                    type="button"
                    className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition-colors 
                      duration-200 text-gray-500 hover:text-gray-700"
                  >
                    <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className={`p-2 sm:p-3 rounded-xl transition-all duration-200 flex items-center 
                justify-center min-w-[40px] sm:min-w-[48px]
                ${!text.trim() && !imagePreview 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              disabled={!text.trim() && !imagePreview}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </form>
      </div>
    </div>
  );
};

export default MessageInput;