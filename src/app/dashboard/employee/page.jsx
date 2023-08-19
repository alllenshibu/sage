import React from "react";
import Card from "../../../components/Card";
import StatusCard from "@/components/StatusCard";
// import Quiz from "./Quiz";
// import Grievance from "./Grievance";
// import PsychologistChat from "./PsychologistChat";

import QuizImage from "@/assets/mental-health.png";
import DoctorImage from "@/assets/psychologist.jpeg";
import Grievance from "@/assets/grievance.jpeg";
import GameImage from "@/assets/game_img.jpeg";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  if (session.role !== "ROLE_EMPLOYEE") return redirect("/");
  return (
    <div className="flex flex-col items-center justify-center h-[1160px] md:h-[540px] bg-gray-100">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
        <Card title="FunZone" link="/game" img={GameImage} />
        <Card title="CalmCheck" link="/quiz" img={QuizImage} />
        <Card title="Grievance" link="/grievance" img={Grievance} />
        <StatusCard
          title="Therapy"
          link="/request"
          approved={true}
          img={DoctorImage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
