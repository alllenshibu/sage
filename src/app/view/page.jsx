import axios from "axios";
export default async function Page() {
  const res = await axios.get("http://localhost:3000/api/users");

  return (
    <div className="relative min-h-[540px]">
      <h1 className="text-3xl text-center font-semibold mb-6">
        Employees Data
      </h1>
      <div className="absolute left-1/2 -translate-x-1/2">
        <div className="flex gap-4 mb-4">
          <div className="w-[100px] pl-1 text-lg font-semibold underline underline-offset-2">
            Name
          </div>
          <div className="w-[300px] pl-1 text-lg font-semibold underline underline-offset-2">
            Email
          </div>
          <div className="text-lg pl-1 font-semibold underline underline-offset-2">
            Role
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {res.data.map((user) => (
            <div className="flex gap-4 border-2 border-blue-500 px-1">
              <div className="w-[100px]">{user.name}</div>
              <div className="w-[300px]">{user.email}</div>
              <div>Employee</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
