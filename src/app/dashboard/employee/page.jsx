import React from "react";
import Card from "./Card";
// import Quiz from "./Quiz";
// import Grievance from "./Grievance";
// import PsychologistChat from "./PsychologistChat";

import QuizImage from "@/assets/mental-health.png";
import DoctorImage from "@/assets/psychologist.jpeg";
import Grievance from "@/assets/grievance.jpeg";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[1160px] md:h-[540px] bg-gray-100">
      <div className="w-full max-w-3xl grid grid-cols-1 gap-24 place-items-center md:grid-cols-3">
        <Card title="Quiz" link="/quiz" img={QuizImage} />
        <Card title="Grievance" link="/grievance" img={Grievance} />
        <Card
          title="Psychologist Chat"
          link="/psychologist-chat"
          img={DoctorImage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
