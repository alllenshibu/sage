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
    console.log(requests);
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
    <div className="min-h-[540px] text-center">
      <h1 className="text-3xl font-semibold mt-6">Current chat requests</h1>
      <div className="flex flex-col items-center mt-8">
        {requests.map((request) => {
          return (
            <div className="w-[350px] pl-2 py-2 text-left border-2 border-black rounded-xl">
              <div>
                <p className="my-2 pl-2 font-medium">
                  Subject:
                  <br />
                  {request.subject}
                </p>
              </div>
              <div>
                {request.chat_room_id === null && (
                  <Button
                    onClick={() => {
                      accept(request);
                    }}
                  >
                    Accept
                  </Button>
                )}
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
    </div>
  );
};

export default page;
