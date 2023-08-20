import Card from "@/components/Card";

import AddImage from "@/assets/add_record.jpeg";
import SeeImage from "@/assets/see_all.jpeg";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  if (session.role == "ROLE_MANAGER") {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-[1160px] md:h-[540px] bg-gray-100">
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
        <Card
          title="Add employee"
          desc="Add employee to the database to keep track of their records"
          link="/add"
          img={AddImage}
        />
        <Card
          title="See all employees"
          desc="See all employees in the database and their records in a table"
          link="/view"
          img={SeeImage}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
