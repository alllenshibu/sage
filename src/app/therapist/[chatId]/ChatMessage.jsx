"use client";

const ChatMessage = ({ message, currentUser }) => {
  const isSentByCurrentUser = message.senderId === currentUser.uid;

  return (
    <div
      className={`flex ${
        isSentByCurrentUser ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-xs rounded-lg ${
          isSentByCurrentUser
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-900"
        } p-2`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
