export default function Page() {
  return (
    <div className="min-h-[540px]">
      <h1 className="text-3xl text-center font-semibold mb-6">
        Employees Data
      </h1>
      <table className="font-medium m-auto text-left">
        <tr>
          <th>Name</th>
          <th className="w-[300px] pl-4">Email</th>
          <th>Role</th>
        </tr>
        <tr>
          <td>Amil</td>
          <td className="pl-4">amilpa2020@gmail.com</td>
          <td>Employee</td>
        </tr>
      </table>
    </div>
  );
}
