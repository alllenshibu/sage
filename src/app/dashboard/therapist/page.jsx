import React from "react";
import Card from "@/components/Card";
// import Quiz from "./Quiz";
// import Grievance from "./Grievance";
// import PsychologistChat from "./PsychologistChat";

import ResponseImage from "@/assets/responses.jpeg";
import ChatApp from "@/assets/chat-app.jpeg";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  if (session.role !== "ROLE_PSYCHOLOGIST") return redirect("/");
  return (
    <div className="flex flex-col items-center justify-center h-[1160px] md:h-[540px] bg-gray-100">
      <div className="w-full max-w-3xl grid grid-cols-1 gap-24 place-items-center md:grid-cols-2">
        <Card title="Responses" link="/quiz" img={ResponseImage} />
        <Card title="Chat requests" link="/grievance" img={ChatApp} />
      </div>
    </div>
  );
};

export default Dashboard;
