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
        className={`max-w-xs rounded-tl-xl rounded-tr-xl  ${
          isSentByCurrentUser
            ? "bg-green-100 text-black rounded-bl-xl"
            : "bg-amber-100 text-black rounded-br-xl"
        } p-2`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
