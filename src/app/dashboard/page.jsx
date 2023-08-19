import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import GraphCard from "@/components/GraphCard";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");
  if (session.role === "ROLE_EMPLOYEE") return redirect("/dashboard/employee");
  else if (session.role === "ROLE_MANAGER")
    return redirect("/dashboard/manager");
  else if (session.role === "ROLE_PSYCHOLOGIST")
    return redirect("/dashboard/therapist");

  return (
    <div className="h-screen">
      <div className="absolute top-[14%] left-[8%]">
        <h1 className="text-3xl font-semibold">Hello Name</h1>
        <h1 className="text-3xl font-semibold">
          Welcome to your personal healthcare dashboard
        </h1>
        <p>You have not been added to any organization yet.</p>
      </div>
      <GraphCard />

      <div></div>
    </div>
  );
}
