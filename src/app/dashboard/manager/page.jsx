"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="flex items-center justify-between p-4 bg-white shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={handleAddUserClick}
          className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Add User
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {/* TODO: Add dashboard content here */}
      </div>
      <Dialog open={isAddUserModalOpen} onClose={handleAddUserModalClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            value={newUserEmail}
            onChange={handleNewUserEmailChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUserModalClose}>Cancel</Button>
          <Button
            onClick={handleAddUserSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
