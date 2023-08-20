"use client";
import { useState } from "react";
import Card from "@/components/Card";

import AddImage from "@/assets/add_record.jpeg";
import SeeImage from "@/assets/see_all.jpeg";

import axios from "axios";

const DashboardPage = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserModalClose = () => {
    setIsAddUserModalOpen(false);
    setNewUserEmail("");
  };

  const handleNewUserEmailChange = (event) => {
    setNewUserEmail(event.target.value);
  };

  const handleAddUserSubmit = async () => {
    await axios.post("/api/users", {
      email: newUserEmail,
    });
    handleAddUserModalClose();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[1160px] md:h-[540px] bg-gray-100">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
        <Card
          title="Add employee"
          desc="Add employee to the database to keep track of their records"
          link="/game"
          img={AddImage}
        />
        <Card
          title="See all employees"
          desc="See all employees in the database and their records in a table"
          link="/quiz"
          img={SeeImage}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
