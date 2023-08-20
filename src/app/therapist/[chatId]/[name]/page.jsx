"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
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
  const { chatId, name } = useParams();
  const router = useRouter();

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

  return (
    <div className="flex justify-center w-ful">
      <div className="flex rounded-3xl bg-green-50 shadow-xl p-10 flex-col h-[38rem] w-5/6">
        <div className="flex gap-2 items-center">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => {
              router.push("/dashboard/therapist/requests");
            }}
          />
          Chat with {name.replace(/%20/g, " ")}
        </div>
        <div className="flex-1 mt-3 overflow-y-auto">
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
          className="flex items-center p-4 bg-white  rounded-3xl shadow-lg"
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder=" Type your message here..."
            className="flex-1 p-2 mr-4 bg-light-white-100 rounded-full focus:outline-none focus:bg-white focus:border-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-400 rounded-full hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
