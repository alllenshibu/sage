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
import MentalGym from "@/assets/mentalgym.jpg";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BarChart from "@/components/ChartComponent";
import { Fab } from "@mui/material";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  if (session.role !== "ROLE_EMPLOYEE") return redirect("/");
  return (
    <div className="w-full h-[650px] gap-28 flex flex-row items-center justify-center relative">
      <div className="w-[40rem] h-[35rem] flex flex-col justify-around">
        <div className="font-bold text-3xl">
          Hello {session.user.name},<br />
          Welcome to your personal health dashboard
        </div>
        <BarChart />
      </div>
      <div className="flex items-center justify-center flex-wrap w-[40rem]">
        <Card
          title="FunZone"
          desc="Feeling stressed out?Play some relaxing games to take your mind off things."
          link="/game"
          img={GameImage}
        />
        <Card
          title="A small quiz"
          desc="Take a small quiz to lighten up your mind and let your true feelings out"
          link="/quiz"
          img={QuizImage}
        />
        <Fab
          variant="extended"
          size="small"
          color="primary"
          sx={{
            backgroundColor: "white",
            position: "absolute",
            bottom: "0px",
            right: "2rem",
            width: "150px",
            color: "black",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <a href="http://localhost:3000/grievance">Grievance</a>
        </Fab>
        <Card
          title="Mental Gym"
          desc="Your all-access pass to personalized mental workouts for a stronger and more resilient mind."
          link="/relax"
          img={MentalGym}
        />
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
