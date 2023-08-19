export default function Page() {
  return (
    <div className="h-[540px] px-12 pt-12">
      <h1 className="text-2xl font-semibold mb-4">
        Help Us Serve You Better: Share Your Concerns
      </h1>
      <form className="flex flex-col gap-4" action="">
        <div className="flex flex-col gap-3">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="pl-2 py-1 md:py-2 border-2 border-black rounded-lg outline-none focus:border-2 focus:border-blue-500"
          />
        </div>
        <button></button>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Description</label>
          <textarea
            type="text"
            className="h-36 md:h-auto pl-2 py-1 md:py-2 border-2 border-black rounded-lg outline-none focus:border-2 focus:border-blue-500"
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
