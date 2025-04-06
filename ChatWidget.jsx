import React, { useState, useEffect } from 'react';

const PopupChatModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    // Emit chat end event
    const chatEndEvent = new Event('chatEnd');
    window.dispatchEvent(chatEndEvent);
  };

  useEffect(() => {
    if (window.chatWidgetScriptLoaded) return;

    window.ChatWidgetConfig = {
      projectId: "67f2491c71ac0681cf1ab15e",
      enableVoice: true, // Enable voice features
      voiceConfig: {
        autoPlay: true, // Auto-play responses
        defaultVoice: true // Enable default voice
      },
      onClose: () => {
        // Emit chat end event when widget closes
        const chatEndEvent = new Event('chatEnd');
        window.dispatchEvent(chatEndEvent);
      }
    };

    const chatWidgetScript = document.createElement("script");
    chatWidgetScript.type = 'text/javascript';
    chatWidgetScript.src = "https://agency-mabrzd.chat-dash.com/widget.js";
    document.body.appendChild(chatWidgetScript);

    window.chatWidgetScriptLoaded = true;

    return () => {
      if (chatWidgetScript.parentNode) {
        chatWidgetScript.parentNode.removeChild(chatWidgetScript);
      }
      window.chatWidgetScriptLoaded = false;
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!showModal && (
        <button 
          onClick={handleOpen}
          className="relative group"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 opacity-75 
                        group-hover:opacity-100 blur-xl transition-opacity duration-300" />
          
          {/* Button content */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                        text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110
                        border border-blue-500/20 backdrop-blur-sm">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" 
              />
            </svg>
          </div>
        </button>
      )}
      
      {showModal && (
        <div className="absolute bottom-0 right-0 w-96">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-800/95 rounded-t-2xl backdrop-blur-xl" />
          
          {/* Content container */}
          <div className="relative w-full h-[600px] rounded-t-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700" />
            
            <button 
              className="absolute top-3 right-3 bg-gray-800/80 hover:bg-gray-700 rounded-full p-2 text-gray-400 
                       hover:text-gray-200 z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm
                       border border-gray-700/50"
              onClick={handleClose}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
            
            <iframe
              src="https://agency-mabrzd.chat-dash.com/prototype/67f2491c71ac0681cf1ab15e?voice=enabled"
              title="Voice Chat"
              className="relative z-10 w-full h-full border-none bg-transparent"
              allow="microphone"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupChatModal;
