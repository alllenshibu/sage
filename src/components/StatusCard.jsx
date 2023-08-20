"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, db } from "@/config/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import axios from "axios";

const StatusCard = ({ title, link, img }) => {
  const messagesRef = collection(db, "messages");
  const [requestData, setRequestData] = useState([]);
  const [approved, setApproved] = useState(true);

  useEffect(() => {
    const getApproved = async () => {
      const res = await axios.get("/api/counselling/request");
      console.log(res.data);
      if (res.data.length === 0) {
        setApproved(true);
      } else {
        setApproved(false);
        setRequestData(res.data);
      }
    };

    getApproved();
  }, []);

  return (
    <div className="transition-all bg-white rounded-xl flex flex-col items-center w-[250px] h-[250px] shadow-lg m-2 hover:border-2 hover:scale-105">
      <Image src={img} className="w-full h-[120px] rounded-t-xl" />
      <div className="mt-4">
        <h2 className="text-lg text-center mb-4 font-medium">{title}</h2>
        {approved ? (
          <Link
            href={link}
            className="transition-all w-max bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium py-2 px-4 "
          >
            Request {title}
          </Link>
        ) : (
          <>
            {requestData[0].psychologist_id === null ? (
              <div>Pending Request....</div>
            ) : (
              <Link
                href={
                  "/therapist/" +
                  requestData[0].chat_room_id +
                  "/" +
                  requestData[0].name.replace(/%20/g, " ")
                }
                className="transition-all w-max bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium py-2 px-4 "
              >
                Chat with Therapist
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
