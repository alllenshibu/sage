"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig.js";
import ChatMessage from "./ChatMessage.jsx";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { data: session } = useSession();
  const messagesEndRef = useRef(null);
  const { chatId } = useParams();

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    //Get by chatid
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().chatId !== chatId) return;
        messages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messages);
    });
    return unsubscribe;
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      return;
    }
    const message = {
      text: inputValue,
      senderId: session.uid,
      createdAt: serverTimestamp(),
      chatId: chatId,
    };
    await addDoc(collection(db, "messages"), message);
    setInputValue("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            currentUser={session}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center p-4 bg-white shadow-lg"
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="flex-1 p-2 mr-4 bg-gray-100 rounded-full focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
}
