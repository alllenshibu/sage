import React from "react";
import Card from "./Card";
// import Quiz from "./Quiz";
// import Grievance from "./Grievance";
// import PsychologistChat from "./PsychologistChat";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Quiz" link="/quiz" />
        <Card title="Grievance" link="/grievance" />
        <Card title="Psychologist Chat" link="/psychologist-chat" />
      </div>
    </div>
  );
};

export default Dashboard;
