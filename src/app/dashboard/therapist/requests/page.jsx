"use client";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getRequests = async () => {
      const res = await axios.get("/api/counselling/manage");
      console.log(res.data);
      setRequests(res.data);
    };

    getRequests();
  }, []);

  const accept = async (request) => {
    const res = await axios.post("/api/counselling/manage", {
      counsellingRequestId: request.id,
    });
    console.log(res.data);
    setRequests(res.data);
  };

  const chat = async (request) => {
    router.push("/therapist/" + request.chat_room_id);
  };

  return (
    <div>
      {requests.map((request) => {
        return (
          <div className="flex flex-col gap-3">
            <div className="flex">
              <p>{request.id}</p>
              <p>{request.user_id}</p>
              <p>{request.psychologist_id}</p>
              <p>{request.subject}</p>
              <p>{request.chat_room_id}</p>
              <Button
                onClick={() => {
                  accept(request);
                }}
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  chat(request);
                }}
              >
                Chat
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
