"use client";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    await axios.post("/api/users", {
      email: formData.get("email"),
    });
    router.push("/dashboard");
  }
  return (
    <div className="h-[540px] px-12 pt-12">
      <h1 className="text-2xl font-semibold mb-4">Add Employee</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            className="pl-2 py-1 md:py-2 border-2 border-black rounded-lg outline-none focus:border-2 focus:border-blue-500"
          />
        </div>
        <button></button>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            className="pl-2 py-1 md:py-2 border-2 border-black rounded-lg outline-none focus:border-2 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-max px-4 py-2 bg-blue-500 mt-4 text-white font-semibold rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
